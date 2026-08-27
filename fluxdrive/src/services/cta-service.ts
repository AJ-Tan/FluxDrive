import { backendApi } from "../configs/backend-api";
import type { FetchCTALandingPageProps } from "../types/cta-types";

export const fetch_ctaLandingPage: FetchCTALandingPageProps = async (
  firstName,
  lastName,
  email,
  contact,
) => {
  const data = await backendApi(
    "/cta/landingpage",
    "POST",
    JSON.stringify({ firstName, lastName, email, contact }),
  );
  return data;
};
