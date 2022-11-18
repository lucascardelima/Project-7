<style scoped>

</style>

<script >
  import axios from 'axios';
  import PostCard from '../components/PostCard.vue'
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    
  export default {
    name: 'HomePage',
    components: {
      PostCard
    },
    data() {
      return {
        requestDetails: {
          postCategory: localStorage.getItem('preference'),
          userID: localStorage.getItem('userID'),
          token: localStorage.getItem('token')
        },
        posts: []
      }
    },
    methods: {
      getPosts() {
        axios.post('http://localhost:3000/api/posts/getposts', this.requestDetails).then(
        (response) => {
          this.addPosts(response.data);
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )},
      addPosts(posts) {
        this.posts.push(posts)
      },
      deletePost(deletedPostID) {
        let i = 0;

        for (i = 0; i < this.posts[0].length; i++) {

          if (this.posts[0][i].postID == deletedPostID) {
            this.posts[0].splice(i, 1);
          }
        }
      }      
    },
    mounted() {
      this.getPosts();
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
                    :key="post.postID"
                    @delete-post="deletePost"/>

        </div>
      </div>
    </div>
  </div>

    
</template>

