import IBase from "./base.type";

export default interface IUser extends IBase{
    email: string,
    password?: string,
}

