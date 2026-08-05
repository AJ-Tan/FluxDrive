import type { ResponseType } from "../types/api-types";

export const backendApi = async (
  parameter: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: string | FormData,
  headers: Record<string, string> = { "Content-Type": "application/json" },
) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) headers.authorization = `Bearer ${accessToken}`;

  const res = await fetch(`${import.meta.env.VITE_BACKEND_API}${parameter}`, {
    method,
    headers,
    credentials: "include",
    ...(body && { body }),
  });
  let data = await res.json();

  if (!data.ok && data.name === "TokenExpiredError") {
    const refreshAccess = await auth_refreshAccess();

    if (refreshAccess.ok) {
      localStorage.setItem("accessToken", refreshAccess.data.token);
      data = await backendApi(parameter, method, body, headers);
    }
  }

  return data;
};

const auth_refreshAccess = async (): Promise<
  ResponseType & { data: { token: string } }
> => {
  const data = await backendApi("/protected/refresh", "GET");
  return data;
};
