<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';
import useAuth from '@/composables/useAuth';
import { useAuthStore } from '@/stores/useAuthStore';

import ValidationError from '../../components/auth/ValidationError.vue'
import SpinnerButton from '@/components/auth/SpinnerButton.vue';
const store = useAuthStore();
const errors = computed(() => store.errors)
const { register } = useAuth();

const data = reactive({
    loading: false,
    user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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
            <form class="space-y-6" @submit.prevent="register(data)">

                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                        <input v-model="data.user.name" id="name" type="text"
                            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <validation-error v-if="errors" :errors="errors.name"></validation-error>
                    <!-- <p v-if="errors" class="text-red-400 text-sm">{{ errors.name }}</p> -->
                </div>


                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="data.user.email" id="email" type="email"
                            class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                    <validation-error v-if="errors" :errors="errors.email"></validation-error>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>

                    <div class="mt-2">
                        <input v-model="data.user.password" id="password" type="password"
                            class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>

                    <validation-error v-if="errors" :errors="errors.password"></validation-error>
                </div>
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Confirm
                        password</label>

                    <div class="mt-2">
                        <input v-model="data.user.password_confirmation" id="password_confirmation" type="password"
                            class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div>
                    <spinner-button v-if="data.loading">
                    </spinner-button>
                    <button v-else type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        up</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Have an account?

                <router-link class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    :to="{ name: 'login-page' }">Sing
                    in</router-link>
            </p>
        </div>
    </div>
</template>