<style> 
  .font-size-custom {
    font-size: 13px;
  }

</style>

<script>
import axios from 'axios';
import CommentsCard from '../components/CommentsCard.vue'
import { useAuthStore } from '../stores/AuthStore'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

export default {
  name: 'PostPage',
  components: {
    CommentsCard
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore}
  },
  data() {
    return {
      postData: {
        postID: this.$route.params['postid'],
        postTitle: '',
        postText: '',
        postCategory: '',
        likes: [],
        views: [],
        firstName: '',
        lastName: '', 
        postCreationDate: '',
        userID: '',
        imageUrl: '',
        profileImage: ''

      },
      commentsData: {
        commentText: '',
        comments: []     
      },
      isOwner: false,
      isLiked: false,
      isViewed: false,
      countsOfLikes: 0,
      countsOfComments: 0
    }
  }, 
  methods: {
    getPost() {
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
          this.postData.firstName = response.data[0].firstName;
          this.postData.lastName = response.data[0].lastName;
          this.postData.postCreationDate = response.data[0].postCreationDate
          this.postData.imageUrl = response.data[0].imageUrl
          this.postData.profileImage = response.data[0].profileImage
          if (response.data[0].userID == localStorage.getItem('userID')) {
            this.isOwner = true;
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    },
    userLikedCheck() {
      let i = 0;

      for (i = 0; i < this.postData.likes[0].length; i++) {
        if (this.postData.likes[0][i].userID == localStorage.getItem('userID')) {
          this.isLiked = true;
        }
      }
    },
    userViewedCheck() {
      if (this.postData.userID == localStorage.getItem('userID')) {
        this.isViewed = true;

      } else {

        let i = 0;

        for (i = 0; i < this.postData.views[0].length; i++) {
          if (this.postData.views[0][i].userID == localStorage.getItem('userID')) {
            this.isViewed = true;
          }
        }
      }
      

    },
    likeButton() {
      if (this.isLiked) {
        axios.post('http://localhost:3000/api/like/dislike', {
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
          userID: localStorage.getItem('userID'),
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
    getComments() {
      axios.post('http://localhost:3000/api/comments/getcomments', {
        data: {
          userID: localStorage.getItem('userID'),
          postID: this.postData.postID
        }
      }).then(
        (response) => {
 
          let comments = response.data[0].map(
            obj => {
              return {...obj, commentCreationDate: new Date(obj.commentCreationDate)}
            }
          )

          let sortedComments = comments.sort(
            (a,b) => a.commentCreationDate - b.commentCreationDate
          )
          
          if (response.data[0].length) {
            this.commentsData.comments = sortedComments
            this.countsOfComments = response.data[1][0]['quantity']
          } else {
            this.commentsData.comments = []
            this.countsOfComments = 0 
          }
        }
      ).catch(
        (error) => {
          console.log(error)
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

          let comments = response.data[0].map(
            obj => {
              return {...obj, commentCreationDate: new Date(obj.commentCreationDate)}
            }
          )

          let sortedComments = comments.sort(
            (a,b) => b.commentCreationDate - a.commentCreationDate
          )

          this.commentsData.commentText = ''
          this.countsOfComments = response.data[1][0]['quantity']
          this.commentsData.comments = sortedComments
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    deleteComment(commentData) { 
      axios.post('http://localhost:3000/api/comments/deletecomment', {
        data: {
          userID: localStorage.getItem('userID'),
          commentID: commentData.commentID,
          postID: this.postData.postID

        }
      }).then(
        (response) => {
          if (response.data.recordsets[0].length) {
            this.commentsData.comments = response.data.recordsets[0]
            this.countsOfComments = response.data.recordsets[1][0]['quantity']
          } else {
            this.commentsData.comments = []
            this.countsOfComments = 0
          }
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    deletePost() {
      axios.post('http://localhost:3000/api/posts/deletepost', {
        data: {
          userID: localStorage.getItem('userID'),
          postID: this.postData.postID
        }
      }).then(
        (response) => {
          console.log(response)

        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    viewPost() {
      if (!this.isViewed) {
        axios.post('http://localhost:3000/api/view/', {
          data: {
            userID : localStorage.getItem('userID'),
            postID: this.postData.postID
          }
        }).then(
          (response) => {
            this.postData.views = response.data.userID
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      } else {
        console.log('post already viewed by this user')
      }
      
    },
    getViews() {
      axios.post('http://localhost:3000/api/view/getviews', {
        data: {
          postID: this.postData.postID
        }
      }).then(
        (response) => {
      
          this.postData.views.push(response.data[0])
          this.userViewedCheck();
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
          if (difference == 0) {
            label = 'Now'
          } else {
            label = String(difference) + ' Min ago'
          }
          
        } else if (postDuration >= 3600000 && postDuration < 86400000) {
          difference = Math.round((postDuration / 3600000))
          if (difference == 1) {
            label = String(difference) + ' Hour ago'
          } else {
            label = String(difference) + ' Hours ago'
          }
        } else {
          difference = Math.round((postDuration / 86400000))
          if (difference == 1) {
            label = String(difference) + ' Day ago'
          } else {
            label = String(difference) + ' Days ago'
          }
        }
        return label    
    
    }
  }, 
  mounted() {
    this.getPost();
    this.getLikes();
    this.getComments();
    this.getViews();
    setTimeout(() => {
      this.viewPost()
    }, 1000)
    
    
    
  }
}

</script>

<template>

  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-center">
      <div class="col-md-8">

        <div class="card-link text-decoration-none text-reset">
          <div class="card-container bg-white border mt-4 shadow rounded-1">

            <div>
              <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">

                <div class="d-flex flex-row align-items-center feed-text px-2">
                  
                  <img 
                    v-if="postData.profileImage" 
                    class="rounded-circle" 
                    :src="require(`../../../backend/images/${postData.profileImage}`)" 
                    width="40"
                    height="40"> 
                  
                  <div class="d-flex flex-row flex-wrap ml-2">
                    <span class="fw-bold px-2 text-capitalize">{{ '/' + postData.postCategory }}</span>
                    <span class="fw-bold">.</span>
                    <span class="font-size-custom align-self-end text-secondary px-2"> 
                      {{ 'Posted by ' + postData.firstName + ' ' + postData.lastName + ' ' + postTenure}}
                    </span>
                  </div>
                </div>

                <div v-if="this.isOwner" >
                  <a class="px-3 text-decoration-none text-reset" 
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
                      <router-link
                        to="/"
                        class="dropdown-item"
                        href="#"
                        @click="deletePost">
                        Delete
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <img v-if="postData.imageUrl" class="w-100" :src="require('../../../backend/images/' + postData.imageUrl)">
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
                  @click.prevent="likeButton">
                  <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
                </a>
                
              </span>
              <div class="py-2 px-3">
                <span> {{ countsOfLikes }} likes</span>
              </div>

              <span class="py-2">
                <span href="" class="text-reset">
                  <font-awesome-icon icon="fa-solid fa-comment"/>
                </span>
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
              <label for="floatingTextarea">Leave a comment here</label>
            </div>
            <div class="d-flex justify-content-end ">
              <button class=" btn btn-secondary btn-sm m-2 mb-3"
                      :disabled="!commentsData.commentText"
                      @click="createComment">Comment</button>
            </div>
          
          </div>

        </div>

        <hr v-if="this.commentsData.comments.length">
        
        <CommentsCard v-for="comment in commentsData.comments"
                      :comment="comment"
                      :key="comment.commentID"
                      @delete-comment="deleteComment"/>
        
      </div>
    </div>
  </div>
  


</template>