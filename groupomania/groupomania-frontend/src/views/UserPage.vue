<script>

  import { useAuthStore } from '../stores/AuthStore';
  import axios from 'axios';

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

  export default {
    setup() {
      const userStore = useAuthStore();
      return { userStore }
    },
    name: 'UserPage',
    data() {
      return {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email'),
        profileImage: localStorage.getItem('profileImage'),
        preferences: [],

      }
    },
    methods: {
      splitPreferences() {
        let listOfPreferences = localStorage.getItem('preference').split(',')
        this.preferences = listOfPreferences
      },
      deleteUserAccount() {
        axios.post('http://localhost:3000/api/auth/deleteuser', {
          data: {
            userID: localStorage.getItem('userID')
          }
        }).then(
          (response) => {
            console.log(response.data.message)
            window.localStorage.clear();
            delete this.axios.defaults.headers.common['Authorization']
            delete this.axios.defaults.headers.post['Authorization']
            this.userStore.$reset();
            this.$router.push('/loginpage');

          }
        ).catch(
          (error) => {
            console.log(error)
          }
        )
      }
    },
    computed: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    }, 
    mounted() {
      this.splitPreferences();
    }
  }

</script>

<template>



  <main class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-12 col-xl-4">

        <div class="card border-2 rounded-2 shadow">
          <div class="card-body text-center">
            <div class="mt-3 mb-4">
              <img 
                v-if="profileImage" 
                class="rounded-circle img-fluid" 
                :src="require(`../../../backend/images/${profileImage}`)" 
                width="150"
                :alt="`${fullName} Profile Photo` ">
            </div>
            <h4 class="mb-2">{{ fullName }}</h4>
            <p class="text-muted mb-4">{{ email }} </p>

            <hr class="w-75 mx-auto">   

            <h4 class="mb-3"> Preferences </h4>
            <ul class="list-group list-group-horizontal d-flex justify-content-center">
              <li 
                class="list-group-item text-capitalize fw-bold" 
                v-for="(preference, index) in preferences" 
                v-bind:key="index">
                {{ preference }}
              </li>
            </ul>

            <button 
              type="button" 
              class="btn btn-danger btn-rounded btn-lg mt-5"
              data-bs-toggle="modal"
              data-bs-target="#confirmationModal"
              >
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  </main>



  <!-- Modal -->
  <div class="modal fade" id="confirmationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">WARNING!!!!!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete your account?</p>
          <p>All content related to this account will be permanently exclude!</p>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            data-bs-dismiss="modal">
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-danger"
            data-bs-dismiss="modal"
            @click="deleteUserAccount">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>

</template>