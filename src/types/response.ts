import { IGitHubUser } from "./userModal";

export interface IResponse {
  status: number;
  message?: string;
  success?: boolean;
  data?: IGitHubUser;
}
