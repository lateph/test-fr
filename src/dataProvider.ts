
import http from './http-common'
type ResponsList = {
    limit: number,
    skip: number,
    total: number,
    data: any[]
}
const convertFileToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

const dataProvider= {
    create: async (resource: any, params: any) =>{
        let paramsToPost = {}
        console.log("jancok ", params)
        for (const [i, value] of Object.entries(params.data)) {
            if (value && value.rawFile instanceof File) {
               const base64 = await convertFileToBase64(value)
               paramsToPost = {
                    ...paramsToPost,
                    [i]: base64
                }
            } else {
                paramsToPost = {
                    ...paramsToPost,
                    [i]: value
                }
            }
        }

        return http.post(`${resource}`, paramsToPost)
    },
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };

        const response = await http.get<ResponsList>(resource, {
            params: {
                [`$sort[${field}]`]: order == 'ASC' ? 1 : -1,
                [`$skip`]: (page - 1) * perPage,
                [`$limit`]: perPage
            }
        })
        return {
            data: response.data.data,
            total: response.data.total
        }
    },

    getOne: (resource, params) => {
        return http.get<ResponsList>(`${resource}/${params.id}`)
    },


    getMany: async (resource, params) => {
        const query = {
            ids: params.ids.join(",")
        };
        const data = await http.get<ResponsList>(`${resource}`, {
            params: query
        })
        return data.data
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) => {
        let paramsToPost = {}
        console.log("jancok ", params)
        for (const [i, value] of Object.entries(params.data)) {
            if (value && value.rawFile instanceof File) {
               const base64 = await convertFileToBase64(value)
               paramsToPost = {
                    ...paramsToPost,
                    [i]: base64
                }
            } else {
                paramsToPost = {
                    ...paramsToPost,
                    [i]: value
                }
            }
        }
        return http.patch(`${resource}/${params.id}`, paramsToPost)
    },
    updateMany: (resource, params) => {
        console.log(params)
        return http.post(`${resource}`, params.data)
    },


    delete: (resource, params) =>{
        console.log(params)
        return http.delete(`${resource}/${params.id}`)
    },
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};

export default dataProvider;