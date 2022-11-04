<style scoped>

</style>

<script>
  import PostCard from '../components/PostCard.vue'
  
  export default {
    name: 'HomePage',
    data() {
      return {

      }
    },
    components: {
      PostCard
    },
    methods: {
      getPosts() {
        axio.get('')
      }
    }
  }
</script>>

<template>

<div class="container mt-4 mb-5">
  <div class="d-flex justify-content-center row">
    <div class="col-md-8">
      <div class="feed p-2">
           
        <PostCard/>

      </div>
    </div>
  </div>
</div>

    
</template>

