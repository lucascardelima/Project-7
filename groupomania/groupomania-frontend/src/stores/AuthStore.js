import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        isLoggedIn: window.localStorage.getItem('isLoggedIn'),
        firstName: window.localStorage.getItem('firstName'),
        lastName: window.localStorage.getItem('lastName'),
        userID: window.localStorage.getItem('userID'),
        email: window.localStorage.getItem('email')
    })
})