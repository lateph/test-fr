import IUser from "../types/user.type"
import http from "../http-common";
import { featherConnector, Service } from "./base.service";

class UsersService extends Service<IUser> {
  url = "users"
}
export default new UsersService(featherConnector);