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
      axios.put('http://localhost:3000/api/posts/updatepost', this.postData).then(
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
    axios.post('http://localhost:3000/api/posts/getpost', this.postData).then(
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
        <div class="card bg-secondary text-white" style="border-radius: 0rem">
          <div class="card-body p-4">
            <form @submit.prevent="updatePost()">
              <div class="m-3">
                <label 
                  for="postTitle"
                  class="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="postTitle"
                  v-model="postData.postTitle"
                  required>
                <hr>

                <label 
                  for="postText"
                  class="col-form-label">
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

                <label
                  for="postCategory"
                  class="col-form-label">
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
                class="btn btn-outline-light btn-lg px-5" 
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