<style scoped>
  body {
    background-color: #eee
  }

  .time {
    font-size: 9px !important
  }

  .socials i {
    margin-right: 14px;
    font-size: 17px;
    color: #d2c8c8;
    cursor: pointer
  }

  .feed-image img {
    width: 100%;
    height: auto
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
 

</style>

<script>
  import { usePostStore } from '../stores/PostStore';

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
    data() {
      return {
        isOwner: false,
        isLiked: true
      }
    },
    methods: {
      userCheck() {
        if (this.post.userID == localStorage.getItem('userID')) {
          this.isOwner = true;
        }
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
          label = toString(difference) + ' Min'
          
        } else if (postDuration >= 3600000 && postDuration < 86400000) {
          difference = Math.round((postDuration / 3600000))
          label = String(difference) + ' Hours'

        } else {
          difference = Math.round((postDuration / 86400000))
          label = String(difference) + ' Days'
        }

        return label    
    
      }
    },
    mounted() {
      this.userCheck();
      
    }
  }

</script>

<template>
  <router-link to="" class="card-link text-decoration-none text-reset">
    <div class="card-container bg-white border mt-4 shadow">

      <div>
        <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">

          <div class="d-flex flex-row align-items-center feed-text px-2">
            <img 
              class="rounded-circle" 
              src="https://i.imgur.com/aoKusnD.jpg" 
              width="45">
            
            <div class="d-flex flex-row flex-wrap ml-2">
              <span class="font-weight-bold px-2 text-capitalize">{{ '/' + post.postCategory }}</span>
              <span class="font-weight-bold">.</span>
              <span class="font-size-custom text-secondary px-2"> 
                {{ 'Posted by ' + post.firstName + ' ' + post.lastName + ' ' + postTenure + ' ago'  }}
              </span>
            </div>
          </div>

          <div>
            
          </div>

          <div v-if="this.isOwner" class="px-3">
            <a
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
                <a
                
                class="dropdown-item"
                href="#">Edit</a>
              </li>
              <li>
                <a
                class="dropdown-item"
                href="#">
                Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-2 px-3">
          <span>

            {{post.postText}}

          </span>
      </div>

      <div class="d-flex justify-content-end socials">
          <span class="py-2">
            <a href="" :class="{ 'text-danger': this.isLiked }">
              <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
            </a>
            
          </span>
          <div class="py-2 px-3">
            <span> {{ postStore.likesCount }} likes</span>
          </div>

          <span class="py-2">
            <a href="" class="text-reset">
              <font-awesome-icon icon="fa-solid fa-comment"/>
            </a>
          </span>
          <div class="py-2 px-3">
            <span> {{ postStore.commentsCount }} comments</span>
          </div>
          
      </div>

    </div>
  </router-link> 
 

</template>