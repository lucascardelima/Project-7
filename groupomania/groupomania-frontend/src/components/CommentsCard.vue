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
    data() {
      return {
        commentData: {
          firstName: this.comment.firstName,
          lastName: this.comment.lastName,
          text: this.comment.commentText,
          creationDate: this.comment.commentCreationDate,
          userID: this.comment.userID
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
          label = String(difference) + ' Min'
          
        } else if (commentDuration >= 3600000 && commentDuration < 86400000) {
          difference = Math.round((commentDuration / 3600000))
          if (difference == 1) {
            label = String(difference) + ' Hour'
          } else {
            label = String(difference) + ' Hours'
          }
        } else {
          difference = Math.round((commentDuration / 86400000))
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

    }
  }

</script>

<template>

  <div class="card my-2 rounded-1">
  <div class="card-header d-flex flex-row">
    <span class="fw-bold d-flex"> {{ '/ ' + commentData.firstName + ' ' + commentData.lastName }}</span>
    <span class="fw-bold d-flex align-self-end px-2">.</span>
    <span class="font-size-custom d-flex align-self-center text-secondary"> {{ commentTenure + ' ago' }} </span>
  </div>
  <div class="card-body">
    <p class="card-text">{{ commentData.text}}</p>
  </div>
  </div>

</template>