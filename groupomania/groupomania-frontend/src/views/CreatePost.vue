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
  export default {
    name: 'CreatePost',
    data() {
      return {
        post: {
          postTitle:'',
          postText: '',
          postCategory: '',
          userID: '',
          token: ''
        }
      }
    },
    methods: {
      createPost() {
        this.post.userID = sessionStorage.getItem('userID');
        this.post.token = sessionStorage.getItem('token');
        axios.post('http://localhost:3000/api/posts/createpost', this.post)
          .then(response => console.log(response.data))
          .catch(error => console.log(error))
      }
    }
  }

</script>

<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="main-card">
        <div class="card bg-secondary text-white" style="border-radius: 0rem">
          <div class="card-body p-4">
            <form @submit.prevent="createPost">

              <h4 class="fw-bold mb-2 text-uppercase text-center">Create your Post</h4>
          
              <div class="mb-3">
                <label for="postTitle" class="form-label">Title</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="postTitle" 
                  v-model.lazy="post.postTitle"
                  required>
              </div>

              <div class="mb-3">
                <label for="postText" class="form-label">Text</label>
                <textarea 
                  class="form-control" 
                  id="postText" 
                  rows="5" 
                  placeholder="Write your post text..."
                  v-model.lazy="post.postText"
                  required>
                </textarea>
              </div>

              <div class="mb-3">
                <label 
                  for="postCategory" 
                  class="form-label">
                  Category
                </label>
                <select 
                  class="form-select" 
                  id="postCategory" 
                  aria-label="Default select example"
                  v-model.lazy="post.postCategory"
                  required>

                  <option selected value="placeholder">Select the category of your post</option>
                  <option value="Family">Family</option>
                  <option value="Tech">Tech</option>
                  <option value="Art">Art</option>
                  <option value="Kids">Kids</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Traveling">Traveling</option>
                </select>
              </div>
              
              <button
                id="submitButton" 
                class="btn btn-outline-light btn-lg px-5" 
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