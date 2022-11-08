<style>
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

</style>

<script>
  export default {
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isOwner: false
      }
    },
    methods: {
      userCheck() {
        if (this.post.userID == sessionStorage.getItem('userID')) {
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
   
  <div class="bg-white border mt-2">

    <div>
      <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">

        <div class="d-flex flex-row align-items-center feed-text px-2">
          <img 
            class="rounded-circle" 
            src="https://i.imgur.com/aoKusnD.jpg" 
            width="45">
          
          <div class="d-flex flex-column flex-wrap ml-2">
            <span class="font-weight-bold px-2"> {{ post.firstName + ' ' + post.lastName }}</span>
            <span class="text-black-50 time px-2"
                  > {{ postTenure }}</span>
          </div>
        </div>

        <div>
          <span class="font-weight-bold px-2 text-capitalize">{{ post.postCategory }}</span>
        </div>

        <!-- <div class="feed-icon px-2">
          <i class="fa fa-ellipsis-v text-black-50"></i>
        </div> -->

      </div>
    </div>

    <div class="p-2 px-3">
        <span>

          {{post.postText}}

        </span>
    </div>

    <div class="d-flex justify-content-end socials p-2 py-3">
        <i class="fa-solid fa-thumbs-up"></i>
        <i class="fa-solid fa-comment"></i>
    </div>

  </div>

</template>