import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        canSeeEmailVerifyPage: localStorage.getItem('CanSeeEmailVerifyPage') ?? false,
        canSeeResetPassPage: localStorage.getItem('CanSeeResetPassPage') ?? false,



        user: null,
        access_token: JSON.parse(localStorage.getItem('currentToken')) ?? null,
        errors: null
    }),



    getters: {
        getUser() {
            return this.user
        }
    },



    actions: {
        setUser(user) {
            this.user = user
        },
        setToken(token) {
            localStorage.setItem('currentToken', JSON.stringify(token))
            this.access_token = token
        },



        // start
        setCanSeeEmailVerifyPage(value) {
            localStorage.setItem('CanSeeEmailVerifyPage', value)
            this.canSeeEmailVerifyPage = value
        },

        setCanSeeResetPassPage(value) {
            localStorage.setItem('CanSeeResetPassPage', value)
            this.canSeeResetPassPage = value
        },

        setClearResetPassPageSeeLogic() {

            localStorage.removeItem('CanSeeEmailVerifyPage');
            localStorage.removeItem('CanSeeResetPassPage');

        },
        // end

        // setCanUserResetPassPermission(value) {
        //     localStorage.setItem('canUserResetPass', value)
        //     this.canResetPass = value
        // },




        clearStoredData() {
            localStorage.removeItem('currentToken')
            this.access_token = null
            this.user = null
        },
        setErrors(errors) {
            this.errors = errors
        },
        clearErrors() {
            this.errors = null
        }
    },
});