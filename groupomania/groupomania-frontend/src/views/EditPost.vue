<style scoped>
  .main-card {
    max-width : 80%;
  }
  #submitButton:hover {
    background-color: green;
    color: white;
  }

</style>

<script>
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default {
  name: 'postEdit', 
  data() {
    return {
      postData: {
        postID: this.$route.params.postid,
        postTitle: '',
        postText: '',
        postCategory: '',
        userID: '',
        url: null,
        imageUrl: '',
        formerUrl: ''
      },
      file: ''
    }
  },
  methods: {
    updatePost() {
      const spinner = document.querySelector('#spinner')

      spinner.classList.remove('invisible')
      spinner.classList.add('visible')

      axios.put('http://localhost:3000/api/posts/updatepost', {
        data: {
          postID: this.postData.postID,
          userID: localStorage.getItem('userID'),
          postTitle: this.postData.postTitle,
          postText: this.postData.postText,
          postCategory: this.postData.postCategory
        }
      }).then(
        (response) => {
          
          if (this.file) {
            let formData = new FormData();

            formData.append('file', this.file);
            formData.append('postID', this.postData.postID);
            formData.append('formerUrl', this.postData.formerUrl)

            axios.post('http://localhost:3000/api/photos/postphoto', formData).then(
              (response) => {
                console.log(response.data.message)
                window.setTimeout(() => {
                  this.$router.push('/postpage/' + this.postData.postID)
                }, 1500)
              }
            ).catch(
              (error) => {
                console.log(error)
              }
            )
          } else {
            console.log(response.data.message)
            this.$router.push('/postpage/' + this.postData.postID)
          }  

        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    handleFileUpload( event ) {
      const file = event.target.files[0]
      this.postData.url = URL.createObjectURL(file)
      this.file = file
      this.postData.imageUrl = ''
    }
  },
  mounted() {
    axios.post('http://localhost:3000/api/posts/getpost', {
      data: {
        postID: this.postData.postID,
        userID: localStorage.getItem('userID')
      }
    }).then(
      (response) => {
        this.postData.postTitle = response.data[0].postTitle;
        this.postData.postText = response.data[0].postText;
        this.postData.postCategory = response.data[0].postCategory;
        this.postData.userID = response.data[0].userID;
        this.postData.imageUrl = response.data[0].imageUrl;
        this.postData.formerUrl = response.data[0].imageUrl;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

}

</script>


<template>

<div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="main-card">
        <div class="card bg-white text-black rounded-1 shadow border-4">
          <div class="card-body p-4">
            <form @submit.prevent="updatePost">

              <h4 class="fw-bold mb-2 text-center">Update Your Post</h4>

              <div class="mb-3">

                <label 
                  for="postTitle"
                  class="form-label fw-bold">
                  Title:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="postTitle"
                  v-model="postData.postTitle"
                  required>
              </div>

              <div class="mb-3">

                <label 
                  for="postText"
                  class="form-label fw-bold">
                  Text:
                </label>

                <textarea
                  type="text"
                  class="form-control"
                  id="postText"
                  v-model="postData.postText"
                  rows="5"
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
                  v-model="postData.postCategory"
                  required>

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
                  v-if="postData.url"
                  :src="postData.url"
                  width="200"/> 
                <img
                  v-if="postData.imageUrl"
                  :src="require(`../../../backend/images/${postData.imageUrl}`)"
                  width="200"/>

              </div>

              <div class="d-flex">

                <button
                  id="submitButton" 
                  class="btn btn-outline-light btn-secondary btn-lg px-5" 
                  type="submit">
                    Update
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
  </div>

  

</template>