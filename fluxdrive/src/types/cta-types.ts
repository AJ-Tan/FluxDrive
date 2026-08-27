import type { ResponseType } from "./api-types";

export type FetchCTALandingPageProps = (
  firstName: string,
  lastName: string,
  email: string,
  contact: string,
) => Promise<ResponseType>;
