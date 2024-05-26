import axios from "axios";
import { ref } from "vue";
import { getHeaderConfig } from "@/helpers/headerConfig";
import { useAuthStore } from "@/stores/useAuthStore";
import useTost from "./useToast";
import router from "@/router";


export default function useAuth() {

    const store = useAuthStore();
    const { success, error } = useTost();


    const getCsrfCookie = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie');
            const res = await axios.get('/api/users', getHeaderConfig(store.access_token));
            if (res.data.success === true) {
                // console.log(res.data.access_token)
                store.setToken(res.data.access_token);
                store.setUser(res.data.user)
                // console.log(store.user)
            }
            // console.log(res)
        } catch (error) {
            store.clearStoredData();
            router.push({ name: 'login-page' })
            console.log(error)
        }
    }



    const login = async (data) => {
        data.loading = true;
        store.errors = null;

        try {
            await getCsrfCookie();
            const res = await axios.post('/api/login', data.user);
            data.loading = false;

            if (res.data.success === true) {
                store.setToken(res.data.access_token)
                router.push({ name: 'home-page' })
                // console.log(res.data.access_token)
                success(res.data.message);
            }


        } catch (error) {
            data.loading = false;
            console.log(error)
            if (error.response.status === 422) {
                store.setErrors(error.response.data.errors);
            }

        }
    };




    const logout = async () => {

        try {
            const res = await axios.post('/api/logout', '', getHeaderConfig(store.access_token));
            if (res.data.success === true) {
                store.clearStoredData();
                router.push({ name: 'login-page' })
                console.log(true)
                success(res.data.message);
            }


        } catch (error) {
            console.error('Logout failed:', error);
        }
    };








    const register = async (data) => {
        data.loading = true;
        store.clearErrors();

        try {
            await getCsrfCookie();
            const res = await axios.post(`/api/register`, data.user);
            data.loading = false;

            if (res.data.success === true) {
                success(res.data.message);
                console.log(true)
            }
        } catch (error) {
            data.loading = false;
            console.log(error)
            if (error.response.status === 422) {
                store.setErrors(error.response.data.errors);
            }

        }


    }



    const forgetPassword = async (data) => {
        data.loading = true;
        store.clearErrors();

        try {
            await getCsrfCookie();
            const res = await axios.put(`/api/forget-password`, {
                email: data.user.email
            });
            data.loading = false;

            if (res.data.success === true) {
                success(res.data.message);
                store.setCanSeeEmailVerifyPage(true);
                router.push({ name: 'otp-verify-page' })

            }
        } catch (error) {
            data.loading = false;
            console.log(error)
            if (error.response.status === 422) {
                store.setErrors(error.response.data.errors);
            }

        }


    }

    const verifyEmailByOTP = async (data) => {
        data.loading = true;
        store.clearErrors();

        console.log(data)
        try {
            await getCsrfCookie();
            const res = await axios.post(`/api/email-verify`, {
                otp: data.user.otp
            });
            data.loading = false;

            if (res.data.success === true) {
                success(res.data.message);
                store.setCanSeeEmailVerifyPage(false);
                store.setCanSeeResetPassPage(true);
                router.push({ name: 'reset-password-page' })

            }
            if (res.data.success === false) {
                // success(res.data.message);
                // router.push({ name: 'reset-password-page' })
                const errorArray = ['Invalid credentials'];
                store.setErrors(errorArray);
            }

        } catch (error) {
            data.loading = false;
            if (error.response.status === 422) {
                store.setErrors(error.response.data.errors);
            }

        }


    }

    const resetPassword = async (data) => {
        data.loading = true;
        store.clearErrors();

        // console.log(data)
        try {
            await getCsrfCookie();
            const res = await axios.post(`/api/reset-password`, {
                password: data.user.password
            });
            data.loading = false;

            if (res.data.success === true) {
                success(res.data.message);
                store.setCanSeeResetPassPage(false);
                store.setCanSeeEmailVerifyPage(false)
                router.push({ name: 'login-page' })
            }
        } catch (error) {
            data.loading = false;
            console.log(error)
            if (error.response.status === 422) {
                store.setErrors(error.response.data.errors);
            }

        }


    }






    return {
        login,
        logout,
        register,
        forgetPassword,
        verifyEmailByOTP,
        resetPassword,
        getUser
    };
}