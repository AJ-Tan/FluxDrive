import type { ResponseType } from "../types/api-types";

export const backendApi = async (
  parameter: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: string | FormData,
  headers: Record<string, string> = { "Content-Type": "application/json" },
) => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    const refreshAccess = await auth_refreshAccess();
    if (refreshAccess.ok) accessToken = refreshAccess.data.token;
  }
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
    if (refreshAccess.ok)
      data = await backendApi(parameter, method, body, headers);
  }

  return { status: res.status, ...data };
};

const auth_refreshAccess = async (): Promise<
  ResponseType & { data: { token: string } }
> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API}/protected/refresh`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (data.ok) {
    localStorage.setItem("accessToken", data.data.token);
  }

  return data;
};
