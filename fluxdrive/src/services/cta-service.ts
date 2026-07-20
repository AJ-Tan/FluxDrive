import { backendApi } from "../configs/backend-api";
import type { CTALandingPageProps } from "../types/cta-types";

export const ctaLandingPage: CTALandingPageProps = async (
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
