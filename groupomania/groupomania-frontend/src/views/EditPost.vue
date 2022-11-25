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

export default {
  name: 'postEdit', 
  data() {
    return {
      postData: {
        postID: this.$route.params.postid,
        postTitle: '',
        postText: '',
        postCategory: '',
        userID: ''
      }
    }
  },
  methods: {
    updatePost() {
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
          console.log(response)
          this.$router.push('/')
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
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

              <button
                id="submitButton" 
                class="btn btn-outline-light btn-secondary btn-lg px-5" 
                type="submit">
                  Update
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  

</template>