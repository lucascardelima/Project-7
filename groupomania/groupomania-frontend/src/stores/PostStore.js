import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        commentsCount: 0,
        comments: [],
        likesCount: 0,
        likes: []
    })
})