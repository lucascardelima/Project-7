<style scoped>
  .font-size-custom {
    font-size: 13px;
  }

</style>

<script>

  export default {
    name: 'CommentsCard',
    props: {
      comment: {
        type: Object,
        required: true
      }
    },
    emits: ['delete-comment'],
    data() {
      return {
        key: this.comment.commentID,
        commentData: {
          firstName: this.comment.firstName,
          lastName: this.comment.lastName,
          text: this.comment.commentText,
          creationDate: this.comment.commentCreationDate,
          userID: this.comment.userID,
          commentID: this.comment.commentID
        },
        isOwner: false
      }
    },
    methods: {
      userOwnerCheck() {
        if (this.commentData.userID == localStorage.getItem('userID')) {
          this.isOwner = true;
        }
      }
    },
    computed: {
      commentTenure() {
        let commentDate = new Date(this.commentData.creationDate);
        let currentDate = new Date();

        let difference = 0
        let label = ''

        let commentDuration = currentDate - commentDate; 
   

        if (commentDuration < 3600000) {
          difference = Math.round((commentDuration / 60000))
          if (difference == 0) {
            label = 'Now'
          } else {
            label = String(difference) + ' Min ago'
          }
          
        } else if (commentDuration >= 3600000 && commentDuration < 86400000) {
          difference = Math.round((commentDuration / 3600000))
          if (difference == 1) {
            label = String(difference) + ' Hour ago'
          } else {
            label = String(difference) + ' Hours ago'
          }
        } else {
          difference = Math.round((commentDuration / 86400000))
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
      this.userOwnerCheck()
    }
  }

</script>

<template>

  <div class="card my-2 rounded-1 border shadow">

    <div class="card-header d-flex flex-row justify-content-between">

      <div class="d-flex flex-row ml-2">

        <span class="fw-bold d-flex"> {{ '/ ' + commentData.firstName + ' ' + commentData.lastName }}</span>
        <span class="fw-bold d-flex align-self-end px-2">.</span>
        <span class="font-size-custom d-flex align-self-center text-secondary"> {{ commentTenure }} </span>

      </div>

      <div v-if="this.isOwner" >
        <a class="px-2 text-decoration-none text-reset" 
          type="button"
          @click.prevent="this.$emit('delete-comment', this.commentData)">
          <font-awesome-icon icon="fa-solid fa-trash-can" />
        </a>
      </div>
      
    </div>

    <div class="card-body">
      <p class="card-text">{{ commentData.text}}</p>
    </div>
  </div>

  

</template>