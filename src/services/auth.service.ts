import IUser from "../types/user.type"
import http from "../http-common";
import { ILogin, ILoginResponse } from "../types/auth.type";
import { Create } from "../types/base.type";
import { featherConnector, Service } from "./base.service";

const url = "authentication"
class AuthService extends Service<ILogin> {
    url = url
    async login (data: Create<ILogin>) : Promise<ILoginResponse>{
        return (await http.post<ILoginResponse>(`/${this.url}`, {
            ...data,
            strategy: 'local'
        })).data
    }
    async getUser (accessToken: string) : Promise<IUser> {
        const user = (await http.post<ILoginResponse>(`/${url}`, {
            accessToken,
            strategy: 'jwt'
        })).data.user
        return this.connector.convertModel(user)
    } 
}
export default new AuthService(featherConnector);