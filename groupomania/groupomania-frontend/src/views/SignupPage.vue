<style scoped>
 
  #preferencesID {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  #prefenceLimitMessage {
    font-size: 18px;
    font-weight: bold;
    display: none;
  }

  #maxSign {
    color: #FF7373;
  }
  
</style>

<script>
  import axios from 'axios'
  import { useAuthStore } from '../stores/AuthStore'

  export default {
    name: 'UserSignup',
    setup() {
      const authStore = useAuthStore();
      return { authStore }
    },
    data() {
      return {
        userDetails: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          dateOfBirth: '',
          preference: [],
          file: ''
        }
      }
    },
    methods: {
      userSignup() {
        axios.post('http://localhost:3000/api/auth/signup', this.userDetails)
        .then((response) => {
          console.log(response.data.message)
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('userID', response.data.userID);
          window.localStorage.setItem('preference', response.data.preference);
          window.localStorage.setItem('email', response.data.email);
          window.localStorage.setItem('firstName', response.data.firstName);
          window.localStorage.setItem('lastName', response.data.lastName);
          window.localStorage.setItem('isLoggedIn', true);

          this.authStore.isLoggedIn = true;
          this.authStore.firstName = response.data.firstName;
          this.authStore.lastName = response.data.lastName;
          this.authStore.userID = response.data.userID;
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
          axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`

          let formData = new FormData();
          const userID = response.data.userID;

          formData.append('file', this.userDetails.file);
          formData.append('userID', userID);

          axios.post('http://localhost:3000/api/photos/userphoto', formData).then(
            (response) => {
              console.log(response.data.message);

              window.localStorage.setItem('profileImage', response.data.profileImage);

              this.authStore.profileImage = response.data.profileImage;

              window.setTimeout(() => {
                this.$router.push('/')
              }, 1500);
            }
          ).catch(
            (error) => {
              console.log(error)
            }
          )

          this.$router.push('/')

        }).catch(
          (error) => {
            console.log(error);
          })
      },
      handleFileUpload( event ) {
        this.userDetails.file = event.target.files[0]
      },
      prefenceCheckBox() {
         if (this.userDetails.preference.length == 3) {
          document.querySelector('#maxSign').style.color = 'white';
          document.querySelector('#submitButton').disabled = false;
         } else {
          document.querySelector('#maxSign').style.color = '#FF7373';
          document.querySelector('#submitButton').disabled = true;
         }
      }
    }
  }

</script>

<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div
          class="card bg-secondary text-white shadow-lg border-3 rounded-1"
          style="border-radius: 0rem">
          <div class="card-body p-5 text-center">
            <form  @submit.prevent="userSignup()">
              <h2
                class="fw-bold mb-2 text-uppercase">Signup</h2>
              <p class="text-white-50 mb-5">
                Please enter your details
              </p>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="firstName">First
                  Name</label>
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  v-model="userDetails.firstName"
                  required
                />
              </div>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  v-model="userDetails.lastName"
                  required
                />
              </div>
              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="typeEmailX">Email</label>
                <input
                  type="email"
                  id="typeEmailX"
                  class="form-control"
                  v-model="userDetails.email"
                  required
                />
              </div>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="typePasswordX">Password</label>
                <input
                  type="password"
                  id="typePasswordX"
                  class="form-control"
                  v-model="userDetails.password"
                  required
                />
              </div>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="dateOfBirth"
                  >Date
                  of
                  Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  class="form-control"
                  v-model="userDetails.dateOfBirth"
                  required
                /> 
              </div>

              <div
                class="form-outline form-white mb-4"
                id="preferenceBox">
                <hr
                  style="width: 100%; height: 2px">
                <label 
                  class="form-label" 
                  for="preferenceBox" 
                  id="preferencesID">
                  Select <span id="maxSign">
                                3
                          </span> preferences: 
                </label>
                
                <div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox1" 
                      value="family"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox1">
                      Family
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox2" 
                      value="tech"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox2">
                      Tech
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox3" 
                      value="art"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox3">
                      Art
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox4" 
                      value="kids"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox4">
                      Kids
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox5" 
                      value="cooking"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox5">
                      Cooking
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="inlineCheckbox6" 
                      value="traveling"
                      v-model="userDetails.preference"
                      @change="prefenceCheckBox">
                    <label 
                      class="form-check-label" 
                      for="inlineCheckbox6">
                      Traveling
                    </label>
                  </div>

                </div>
              </div>

              <hr style="width: 100%; height: 2px">

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="userPhoto"
                  >Photo</label>
                <input
                  type="file"
                  id="userPhoto"
                  class="form-control"
                  @change="handleFileUpload( $event )"
                  required
                /> 
              </div>     
              
              <button 
                class="btn btn-outline-light btn-lg px-5" 
                id="submitButton" 
                type="submit"
                disabled>
                Signup
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

  
  