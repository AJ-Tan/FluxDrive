import type { ResponseType } from "./api-types";

export type CTALandingPageProps = (
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
) => Promise<ResponseType>;
