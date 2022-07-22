import http from "./http-common";
import { ILoginResponse } from "./types/auth.type";

type LoginProps = {
    username: string,
    password: string,
}
const authProvider = {
    // called when the user attempts to log in
    login: async (props: LoginProps) => {
        try {
            const resp = await http.post<ILoginResponse>(`authentication`, {
                email: props.username,
                password: props.password,
                strategy: 'local'
            });
            localStorage.setItem('jwt', resp.data.accessToken)
            localStorage.setItem('username', resp.data.user.email)
        } catch (error: any) {
            throw error.message;
        }
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('jwt');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('jwt');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('jwt')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default authProvider;