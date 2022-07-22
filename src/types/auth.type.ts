import IBase from "./base.type";
import IUser from "./user.type";

export type Strategy = 'local' | 'jwt'
export interface ILogin extends IBase{
    email: string,
    password: string,
    strategy: Strategy
}

export interface ILoginResponse{
    accessToken: string,
    user: IUser
}




