import axios, { AxiosError } from "axios";
import IBase, { Create, ErrorMessage, ResponsePaged } from "../types/base.type";
import http from "../http-common";


type FeatherModel<T extends IBase> = Omit<T, "id"> & { _id: string }
export interface ServiceConnector {
    generateError<T extends IBase>(error: any | AxiosError): ErrorMessage<T>;
    convertModel<T extends IBase>(data: any);
}

export class FeatherConnector implements ServiceConnector {
    generateError<T extends IBase>(error: any) : ErrorMessage<T> {
        if (error instanceof AxiosError) {
            console.log(error.response.data)
            const eRecord = error.response.data["errors"]
            const t: ErrorMessage<T> = {
                message: error.response.data["message"],
                model: eRecord
            }
            throw t;
        } else {
            throw {
                message: error,
                model: {}
            } as ErrorMessage<T>
        }
    }
    convertModel<T extends IBase>(data: FeatherModel<T>) {
        return {
            ...data,
            id: data._id
        }
    }
}
export const featherConnector = new FeatherConnector()
export class Service<T extends IBase> {
    url: string;
    connector: ServiceConnector;
    constructor (connector: ServiceConnector) {
        this.connector = connector;
    }
    async getAll() : Promise<ResponsePaged<T>> {
        try {
            const datas = (await http.get<ResponsePaged<T>>(`/${this.url}`)).data;
            return {
                ...datas,
                data: datas.data.map(
                    (m) => this.connector.convertModel(m)
                )
            }
        }
        catch (error: any | AxiosError) {
            throw this.connector.generateError<T>(error);
        }
    }
    get(id: string) {
        return http.get<T>(`/${this.url}/${id}`);
    }
    async create(data: Create<T>) : Promise<T>{
        try {
            const model = (await http.post<T>(`/${this.url}`, data)).data;
            return this.connector.convertModel(model)
        } catch (error: any | AxiosError) {
            throw this.connector.generateError<T>(error);
        }
    }
    async update(data: T, id: string) {
        const updated = http.put(`/${this.url}/${id}`, data);
        return this.connector.convertModel(updated)
    }
    delete(id: string | number) {
        return http.delete<string | number>(`/${this.url}/${id}`);
    }
    deleteAll() {
        return http.delete<T>(`/${this.url}`);
    }
}

// export class FeatherService<T  extends IBase> extends Service<T>  {
//     generateError(error) : ErrorMessage<T>{
//         if (error instanceof AxiosError) {
//             console.log(error.response.data)
//             const eRecord = error.response.data["errors"]
//             const t: ErrorMessage<T> = {
//                 message: error.response.data["message"],
//                 model: eRecord
//             }
//             throw t;
//         } else {
//             throw {
//                 message: error,
//                 model: {}
//             } as ErrorMessage<T>
//         }
//     }
//     async create(data: Create<T>): Promise<T> {
//         try {
//             return await super.create(data);
//         } catch (error: any | AxiosError) {
//             throw this.generateError(error);
//         }
//     }
// }