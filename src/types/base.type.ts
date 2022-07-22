export default interface IBase {
    id: string,
    createdAt: string,
    updatedAt: string,
}

export type Create<Type extends IBase> = {
    [Property in keyof Type as Exclude<Property, keyof IBase>]: Type[Property]
} & Partial<IBase>;

export type ErrorMessage<Type extends IBase> = {
    message: string,
    model: Partial<Type>
}

export type ResponsePaged<Type extends IBase> = {
    data: Type[],
    limit: number,
    skip: 0,
    total: 0
}