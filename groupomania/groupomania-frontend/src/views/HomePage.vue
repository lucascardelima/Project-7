<style scoped>

</style>

<script >
  import axios from 'axios';
  import PostCard from '../components/PostCard.vue'
  axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
  axios.defaults.headers.post['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    
  export default {
    name: 'HomePage',
    data() {
      return {
        requestDetails: {
          postCategory: sessionStorage.getItem('preference'),
          userID: sessionStorage.getItem('userID'),
          token: sessionStorage.getItem('token')
        },
        posts: []
      }
    },
    mounted() {
      axios.post('http://localhost:3000/api/posts/getposts', this.requestDetails).then(
        (response) => {
          this.addPosts(response.data);
        }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    },
    components: {
      PostCard
    },
    methods: {
      getPosts() {
        axios.get('http://localhost:3000/api/posts/getposts', this.requestDetails, {
          headers: {
            'Authorization': 'Bearer ' + this.token 
          }
        })
      },
      addPosts(posts) {
        this.posts.push(posts)
      }
    }
  }
</script>>

<template>

<div class="container mt-4 mb-5">
  <div class="d-flex justify-content-center row">
    <div class="col-md-8">
      <div class="feed p-2">
           
        <PostCard v-for="post in posts[0]"
                  :post="post"
                  :key="post.postID"/>

      </div>
    </div>
  </div>
</div>

    
</template>

