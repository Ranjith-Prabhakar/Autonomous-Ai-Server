import { IGitHubUser } from "../dataBase/model/interfaces";

export interface IResponse {
  status: number;
  message?: string;
  success?: boolean;
  data?: IGitHubUser;
}
