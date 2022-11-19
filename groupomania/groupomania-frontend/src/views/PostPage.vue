<script>
import axios from 'axios';

export default {
  name: 'PostPage',
  data() {
    return {
      postData: {
        postID: this.$route.params['postid'],
        postTitle: '',
        postText: '',
        postCategory: '',
        likes: [],
        firstName: '',
        lastName: '', 
        postCreationDate: '',
        userID: ''
      },
      commentsData: {
        commentText: ''      
      },
      isOwner: false,
      isLiked: false,
      countsOfLikes: 0,
      countsOfComments: 0
    }
  }, 
  methods: {
    getPost() {
      axios.post('http://localhost:3000/api/posts/getpost', this.postData).then(
        (response) => {
          this.postData.postTitle = response.data[0].postTitle;
          this.postData.postText = response.data[0].postText;
          this.postData.postCategory = response.data[0].postCategory;
          this.postData.userID = response.data[0].userID,
          this.postData.firstName = response.data[0].firstName,
          this.postData.lastName = response.data[0].lastName,
          this.postData.postCreationDate = response.data[0].postCreationDate
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    },
    userOwnerCheck() {
      if (this.postData.userID == localStorage.getItem('userID')) {
        this.isOwner = true;
      }
    },
    userLikedCheck() {
      let i = 0;

      for (i = 0; i < this.postData.likes[0].length; i++) {
        if (this.postData.likes[0][i].userID == localStorage.getItem('userID')) {
          this.isLiked = true;
        }
      }
    },
    likeButton() {
      if (this.isLiked) {
        axios.delete('http://localhost:3000/api/like/dislike', {
          data: {
            userID: localStorage.getItem('userID'),
            postID: this.postData.postID
          }
        }).then(
          (response) => {
            if (response.data) {
              this.countsOfLikes = response.data['quantity']
            } else {
              this.countsOfLikes = 0
            }
            this.isLiked = false
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      } else {
        axios.post('http://localhost:3000/api/like/', {
          data: {
            userID: localStorage.getItem('userID'),
            postID: this.postData.postID
          }
        }).then(
          (response) => {
            if (response.data) {
              this.countsOfLikes = response.data['quantity']
            } else {
              this.countsOfLikes = 0
            }
            this.isLiked = true
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      }
    },
    getLikes() {
      axios.post('http://localhost:3000/api/like/getlikes', {
        data: {
          postID: this.postData.postID
        }
      }).then(
        (response) => {
          this.postData.likes = []
          this.postData.likes.push(response.data[0])
          if (response.data[1][0]) {
            this.countsOfLikes = response.data[1][0]['quantity']
          } else {
            this.countsOfLikes = 0
          }
          this.userLikedCheck()
        }
      )
    },
    createComment() {
      axios.post('http://localhost:3000/api/comments/createcomment', {
        data: {
          postID: this.postData.postID,
          userID: localStorage.getItem('userID'),
          commentText: this.commentsData.commentText
        }
      }).then(
        (response) => {
          this.commentsData.commentText = ''
          console.log(response.data.success)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }
  },
  computed: {
    postTenure() {
        let postDate = new Date(this.postData.postCreationDate);
        let currentDate = new Date();

        let difference = 0
        let label = ''

        let postDuration = currentDate - postDate; 

   

        if (postDuration < 3600000) {
          difference = Math.round((postDuration / 60000))
          label = String(difference) + ' Min'
          
        } else if (postDuration >= 3600000 && postDuration < 86400000) {
          difference = Math.round((postDuration / 3600000))
          if (difference == 1) {
            label = String(difference) + ' Hour'
          } else {
            label = String(difference) + ' Hours'
          }
        } else {
          difference = Math.round((postDuration / 86400000))
          if (difference == 1) {
            label = String(difference) + ' Day'
          } else {
            label = String(difference) + ' Days'
          }
        }
        return label    
    
    }
  }, 
  mounted() {
    this.getPost()
    this.getLikes()
    this.userOwnerCheck();
    
  }
}

</script>

<template>

  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-center row">
      <div class="col-md-8">

        <div class="card-link text-decoration-none text-reset">
          <div class="card-container bg-white border mt-4 shadow rounded-1">

            <div>
              <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">

                <div class="d-flex flex-row align-items-center feed-text px-2">
                  
                  
                  <div class="d-flex flex-row flex-wrap ml-2">
                    <span class="fw-bold px-2 text-capitalize">{{ '/' + postData.postCategory }}</span>
                    <span class="fw-bold">.</span>
                    <span class="font-size-custom text-secondary px-2"> 
                      {{ 'Posted by ' + postData.firstName + ' ' + postData.lastName + ' ' + postTenure + ' ago'  }}
                    </span>
                  </div>
                </div>

                <div v-if="this.isOwner" >
                  <a class="px-3" 
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
                  </a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1">
                    <li>
                      <router-link
                      :to="`/editpost/${postData.postID}`"
                      class="dropdown-item"
                      >Edit</router-link>
                    </li>
                    <li>
                      <a
                      class="dropdown-item"
                      href="#"
                      >
                      Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-2 px-3 d-flex flex-column">
                <span class="py-2 fs-5 fw-bold">
                  {{ postData.postTitle }}
                </span> 
                <span class="fs-6">
                  {{ postData.postText }}
                </span>
            </div>

            <div class="d-flex justify-content-end socials">
              <span class="py-2" >
                <a
                  href=""
                  :class="{ 'text-danger': this.isLiked, 'text-reset': !this.isLiked }"
                  @click="likeButton">
                  <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
                </a>
                
              </span>
              <div class="py-2 px-3">
                <span> {{ countsOfLikes }} likes</span>
              </div>

              <span class="py-2">
                <a href="" class="text-reset">
                  <font-awesome-icon icon="fa-solid fa-comment"/>
                </a>
              </span>
              <div class="py-2 px-3 d-flex flex-row ">
                <span class="me-2"> {{ countsOfComments}} </span>
                <span> Comments </span>
                  
              </div>
            </div>
          </div>
        </div>

        <div class="container bg-white mt-3 rounded-1 border shadow">
          <div class="d-flex flex-column">
            <div class="form-floating mt-3 mb-2">
              <textarea 
                v-model="commentsData.commentText"
                class="form-control" 
                placeholder="Leave a comment here" 
                id="floatingTextarea"></textarea>
              <label for="floatingTextarea">Comments</label>
            </div>
            <div class="d-flex justify-content-end ">
              <button class=" btn btn-secondary btn-sm m-2 mb-3"
                      :disabled="!commentsData.commentText"
                      @click="createComment">Comment</button>
            </div>
          
          </div>

        </div>
        
        

      </div>
    </div>
  </div>
  


</template>