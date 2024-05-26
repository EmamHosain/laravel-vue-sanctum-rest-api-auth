<script setup>
import { reactive, computed } from 'vue';
import { RouterLink } from 'vue-router';
import useAuth from '@/composables/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';
import ValidationError from '@/components/auth/ValidationError.vue';
import SpinnerButton from '@/components/auth/SpinnerButton.vue';

const { login } = useAuth();
const store = useAuthStore();
const errors = computed(() => store.errors)

const data = reactive({
    loading: false,
    user: {
        email: '',
        password: '',
    }

})



</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="login(data)">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="data.user.email" id="email" name="email" type="email" placeholder="john@doe.com"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset px-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <!-- <p v-if="errors" class="text-red-400 text-sm">{{ errors.email[0] }}</p> -->
                    <validation-error v-if="errors" :errors="errors.email"></validation-error>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="text-sm">

                            <router-link class="font-semibold text-indigo-600 hover:text-indigo-500"
                                :to="{ name: 'forget-password-page' }">Forgot password?</router-link>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model="data.user.password" id="password" name="password" type="password"
                            placeholder="password"
                            class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <validation-error v-if="errors" :errors="errors.password"></validation-error>
                </div>

                <div>

                    <spinner-button v-if="data.loading"></spinner-button>
                    <button v-else type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Haven't an account?

                <router-link class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    :to="{ name: 'register-page' }">Sing up</router-link>
            </p>
        </div>
    </div>
</template>