<script>

  import { userAuthStore } from '../stores/AuthStore';
  import axios from 'axios';

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

  export default {
    setup() {
      const userStore = userAuthStore();
      return { userStore }
    },
    name: 'UserPage',
    data() {
      return {

      }
    },
    methods: {
      
    }
  }

</script>

<template>

  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-4">

        <div class="card border" style="border-radius: 15px;">
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img src="../images/user_placeholder.jpg"
                class="rounded-circle img-fluid" style="width: 100px;" />
            </div>
            <h4 class="mb-2">Julie L. Arsenault</h4>
            <p class="text-muted mb-4">@Programmer <span class="mx-2">|</span> <a
                href="#!">mdbootstrap.com</a></p>
            <div class="mb-4 pb-2">
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-facebook-f fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-twitter fa-lg"></i>
              </button>
              <button type="button" class="btn btn-outline-primary btn-floating">
                <i class="fab fa-skype fa-lg"></i>
              </button>
            </div>
            <button 
              type="button" 
              class="btn btn-danger btn-rounded btn-lg">
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>