<style scoped>
  body {
    background-color: #eee
  }

  .socials i {
    margin-right: 14px;
    font-size: 17px;
    color: #d2c8c8;
    cursor: pointer
  }

  .font-size-custom {
    font-size: 13px;
    display: flex;
    align-items: flex-end;
  }

  .card-link:hover .card-container {
    border-color: blue;
  }

  .card-container {
    border-color: blue;
  }

  a {
    color: none;
  }

  #socialContainer {
    z-index: 10;
    position: relative;
  }

  #cardLink {
    z-index: 1;
 
  }


 

</style>

<script>
  import { usePostStore } from '../stores/PostStore'; 
  import axios from 'axios';
  
  export default {
    setup() {
      const postStore = usePostStore();
      return { postStore }
    },
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    emits: ['delete-post'],
    data() {
      return {
        postData: {
          postID: this.post.postID,
          title: this.post.postTitle,
          text: this.post.postText,
          category: this.post.postCategory,
          likes: []
        },
        isOwner: false,
        isLiked: false,
        countsOfLikes: 0,
        countsOfComments: 0
      }
    },
    methods: {
      userOwnerCheck() {
        if (this.post.userID == localStorage.getItem('userID')) {
          this.isOwner = true;
        }
      },
      userLikedCheck() {
        let i = 0;

        for (i = 0; i < this.postData.likes[0].length; i++) {
          if (this.postData.likes[0][i].userID == localStorage.getItem('userID')) {
            this.isLiked = true
          }
        }
      },
      deletePost(post) {

        axios.delete('http://localhost:3000/api/posts/deletepost', { 
          data: {
            userID: localStorage.getItem('userID'),
            postID: post.postID
          }
        }).then(
          (response) => {
            console.log(response.data.success);
            this.$emit('delete-post', post.postID);
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      },
      likeButton(post) {
        if (this.isLiked) {
          
          axios.delete('http://localhost:3000/api/like/dislike', {
            data: {
              userID: localStorage.getItem('userID'),
              postID: post.postID
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
              postID: post.postID
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
            postID: this.post.postID
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
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      },
      getComments() {
        axios.post('http://localhost:3000/api/comments/getcomments', {
          postID: this.postData.postID
        }).then(
          (response) => {
            if (response.data[1][0]) {
              this.countsOfComments = response.data[1][0]['quantity']
            } else {
              this.countsOfComments = 0
            }
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
        let postDate = new Date(this.post.postCreationDate);
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
      this.getLikes();
      this.getComments();
      this.userOwnerCheck();
      
    }
  }

</script>

<template>
  
  <router-link  :to="`/postpage/${post.postID}`" 
                class="card-link text-decoration-none text-reset"
                id="cardLink">
    <div class="card-container bg-white border mt-4 shadow rounded-1">

      <div>
        <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">

          <div class="d-flex flex-row align-items-center feed-text px-2">
            
            <div class="d-flex flex-row flex-wrap ml-2">
              <span class="fw-bold px-2 text-capitalize">{{ '/' + post.postCategory }}</span>
              <span class="fw-bold">.</span>
              <span class="font-size-custom text-secondary px-2"> 
                {{ 'Posted by ' + post.firstName + ' ' + post.lastName + ' ' + postTenure + ' ago'  }}
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
                :to="`/editpost/${post.postID}`"
                class="dropdown-item"
                >Edit</router-link>
              </li>
              <li>
                <a
                class="dropdown-item"
                href="#"
                @click.prevent="deletePost(post)">
                Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-2 px-3 d-flex flex-column">
          <span class="py-2 fs-5 fw-bold">
            {{ post.postTitle }}
          </span> 
          <span class="fs-6">
            {{ post.postText }}
          </span>
      </div>

      <div  class="d-flex justify-content-end socials"
            id="socialContainer">
          <span class="py-2"
                @click.prevent="likeButton(post)" >
            <a
              href=""
              :class="{ 'text-danger': this.isLiked, 'text-reset': !this.isLiked }"
              >
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
            <span class="me-2"> {{ countsOfComments }} </span>
            
              <router-link
                :to="`/postpage/${post.postID}`"
                class="text-reset text-decoration-none"
                >Comments
              </router-link> 
              
          </div>
          
      </div>

    </div>
  </router-link>

</template>