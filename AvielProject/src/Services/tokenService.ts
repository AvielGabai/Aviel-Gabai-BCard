import { jwtDecode } from "jwt-decode";
import { TDecodedToken } from "../Types/TDecodeedToken";

export const decode = (token: string) => {
  return jwtDecode(token) as TDecodedToken;
};
