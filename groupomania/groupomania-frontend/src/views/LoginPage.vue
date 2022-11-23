<style scoped>
  a {
    color: white;
    font-weight: bold;
  }
  .error-handling {
    color: red;
    background-color: white;
    font-weight: bold;
    border-radius: 0.5rem;
    text-transform: uppercase;
  }
</style>

<script>
  import axios from 'axios'
  import { useAuthStore } from '../stores/AuthStore'

  export default {
    setup() {
      const authStore = useAuthStore();
      return { authStore }
    },
    name: 'UserLogin',
    data() {
      return {
        userDetails: {
          email:'',
          password: ''
        },
        userSession: {
          userID: '',
          userToken: '',
          checkBox: window.localStorage.getItem('checked'),
          email: window.localStorage.getItem('email')
        },
        errorHandling: {
          errorMessage: ''
        }
      }
    },
    methods: {
      userLogin() {
        axios.post('http://localhost:3000/api/auth/login', this.userDetails)
        .then((response) => {
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('userID', response.data.userID);
          window.localStorage.setItem('preference', response.data.preference);
          window.localStorage.setItem('email', response.data.email);
          window.localStorage.setItem('firstName', response.data.firstName);
          window.localStorage.setItem('lastName', response.data.lastName);
          window.localStorage.setItem('isLoggedIn', true);
          this.authStore.firstName = response.data.firstName;
          this.authStore.isLoggedIn = true;
          this.$router.push('/')

          }
        ).catch(error => {
          document.querySelector(".error-handling").style.display = 'block';
          this.errorHandling.errorMessage = error.response.data.error;
          if (error.response.data.value === 'email') {
            document.querySelector("#email").style.border = "1px solid #FF0000";
          } else if (error.response.data.value === 'password') {
            document.querySelector("#password").style.border = "1px solid #FF0000";
          }
        })
      },
      rememberMe() {
        const rememberMeChecked = document.querySelector('#rememberMe');

        if (rememberMeChecked.checked) {
          window.localStorage.setItem('email', this.userDetails.email);
          window.localStorage.setItem('checked', rememberMeChecked.value);
        } else {
          window.localStorage.clear();
        }
      },
      clearErrorHandling() {
        document.querySelector(".error-handling").style.display = 'none';
        document.querySelector("#email").style.border = "1px solid #ced4da";
        document.querySelector("#password").style.border = "1px solid #ced4da";
      }
    },
    mounted() {
      this.userDetails.email = window.localStorage.getItem('email');
    }
  }

</script>

<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-secondary text-white shadow-lg border-3 rounded-1">
          <div class="card-body p-5 text-center">
            <form @submit.prevent="userLogin">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">
                Please enter your details to login
              </p>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control form-control-lg"
                  v-model="userDetails.email"
                  @click="clearErrorHandling"
                  required>
              </div>

              <div class="form-outline form-white mb-4">
                <label
                  class="form-label"
                  for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control form-control-lg"
                  v-model.lazy="userDetails.password"
                  @click="clearErrorHandling"
                  required>
              </div>

              <div class="form-outline form-white mb-4">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    value="checked"
                    :checked="userSession.checkBox">
                  <label
                    class="form-check-label"
                    for="rememberMe">Remember
                    Me</label>
                </div>
              </div>

              <p class="text-white-50 mb-5">
                Not a member yet? <router-link 
                                    to="/signuppage">
                                    Signup here
                                  </router-link>
              </p>

              <p
                class="error-handling mb-5"
              >
                {{ errorHandling.errorMessage }}

              </p>
              
              <button 
                class="btn btn-outline-light btn-lg px-5" 
                type="submit"
                @click="rememberMe()"
                >
                  Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
