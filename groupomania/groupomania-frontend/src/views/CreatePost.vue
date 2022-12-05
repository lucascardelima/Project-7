<style scoped>
 .main-card {
  max-width: 80%;
 }
 #submitButton:hover {
    background-color: green;
    color: white;
 }
 #preview {
  display: flex;
  justify-content: center;
  align-items: center;
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
          postCategory: '',
          url: null
        },
        file: ''
      }
    },
    methods: {
      createPost() {
        const spinner = document.querySelector('#spinner')

        spinner.classList.remove('invisible')
        spinner.classList.add('visible')

        axios.post('http://localhost:3000/api/posts/createpost', {
          data: {
            postTitle: this.postDetails.postTitle,
            postText: this.postDetails.postText,
            postCategory: this.postDetails.postCategory,
            userID: localStorage.getItem('userID')
          }
        }).then(
          (response) => {
            if (this.file) {
              let formData = new FormData();
              const postID = response.data.postID;

              formData.append('file', this.file);         
              formData.append('postID', postID);

              axios.post(
                'http://localhost:3000/api/photos/postphoto',
                formData
                ).then(
                  (response) => {
                    console.log(response.data.message)
                    window.setTimeout(() => {
                      this.$router.push('/')
                    }, 1500);
                  }
                ).catch(
                  (error) => {
                    console.log(error)
                  }
                )
            
            } else {
              console.log(response.data.message)
              this.$router.push('/');
            }
          }).catch(
            (error) => {
              console.log(error)
            })

        
      },
      handleFileUpload( event ) {
        const file = event.target.files[0]
        this.postDetails.url = URL.createObjectURL(file)
        this.file = file
        
      }
    }
  }

</script>

<template>
  <main class="container py-5 ">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="main-card">
        <div class="card bg-white text-black rounded-1 shadow border-4">
          <div class="card-body p-4">
            <form @submit.prevent="createPost">

              <h4 class="fw-bold mb-2 text-center">Create Your Post</h4>
          
              <div class="mb-3">
                <label 
                  for="postTitle" 
                  class="form-label fw-bold">
                  Title
                </label>

                <input 
                  type="text" 
                  class="form-control" 
                  id="postTitle" 
                  v-model.lazy="postDetails.postTitle"
                  required>
              </div>

              <div class="mb-3">
                <label 
                  for="postText" 
                  class="form-label fw-bold">
                  Text
                </label>

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

              <div class="mb-3">
                <label  for="fileInput"
                        class="form-label fw-bold">
                  File
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="fileInput"
                  @change="handleFileUpload( $event )"/>

              </div>

              <div 
                class="my-3"
                id="imagePreview">
                <img 
                  v-if="postDetails.url"
                  :src="postDetails.url"
                  width="200"/> 
              </div>

              <div class="d-flex">
                <button
                  id="submitButton" 
                  class="btn btn-outline-light btn-secondary btn-lg px-5 justify-content-center " 
                  type="submit">
                    Submit
                </button> 

                <div id="spinner" class="invisible">
                  <div class="spinner-border mx-4 d-flex mt-2" role="status">
                    <span></span>
                  </div>
                </div>

              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
