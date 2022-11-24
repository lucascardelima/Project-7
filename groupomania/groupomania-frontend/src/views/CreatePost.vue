<style scoped>
 .main-card {
  max-width: 80%;
 }
 #submitButton:hover {
    background-color: green;
    color: white;
 }
</style>

<script>
  import axios from 'axios'

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

  export default {
    name: 'CreatePost',
    data() {
      return {
        postDetails: {
          postTitle:'',
          postText: '',
          postCategory: ''
        }
      }
    },
    methods: {
      createPost() {
        this.postDetails.userID = localStorage.getItem('userID');
        axios.post('http://localhost:3000/api/posts/createpost', {
          data: {
            postTitle: this.postDetails.postTitle,
            postText: this.postDetails.postText,
            postCategory: this.postDetails.postCategory,
            userID: localStorage.getItem('userID')
          }
        }).then(
          response => console.log(response.data)
          ).catch(
            error => console.log(error)
          )

        this.postDetails.postTitle = '';
        this.postDetails.postText = '';
        this.postDetails.postCategory = '';
        this.$router.push('/')
      }
    }
  }

</script>

<template>
  <div class="container py-5 ">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="main-card">
        <div class="card bg-white text-black rounded-1 shadow border-4">
          <div class="card-body p-4">
            <form @submit.prevent="createPost">

              <h4 class="fw-bold mb-2 text-center">Create Your Post</h4>
          
              <div class="mb-3">
                <label for="postTitle" class="form-label fw-bold">Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="postTitle" 
                  v-model.lazy="postDetails.postTitle"
                  required>
              </div>

              <div class="mb-3">
                <label for="postText" class="form-label fw-bold">Text</label>
                <textarea 
                  class="form-control" 
                  id="postText" 
                  rows="5" 
                  placeholder="Write your post text..."
                  v-model.lazy="postDetails.postText"
                  required>
                </textarea>
              </div>

              <div class="mb-3">
                <label 
                  for="postCategory" 
                  class="form-label fw-bold">
                  Category
                </label>
                <select 
                  class="form-select" 
                  id="postCategory" 
                  aria-label="Default select example"
                  v-model.lazy="postDetails.postCategory"
                  required>

                  <option value="" disabled selected>Select the category of your post</option>
                  <option value="family">Family</option>
                  <option value="tech">Tech</option>
                  <option value="art">Art</option>
                  <option value="kids">Kids</option>
                  <option value="cooking">Cooking</option>
                  <option value="traveling">Traveling</option>
                </select>
              </div>
              
              <button
                id="submitButton" 
                class="btn btn-outline-light btn-secondary btn-lg px-5" 
                type="submit">
                  Submit
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>