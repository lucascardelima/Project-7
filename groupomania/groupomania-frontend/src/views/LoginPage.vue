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
  export default {
    name: 'UserLogin',
    data() {
      return {
        userDetails: {
          email:'',
          password: ''
        },
        userSession: {
          userID: '',
          userToken: ''
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
          window.sessionStorage.setItem('token', response.data.token);
          window.sessionStorage.setItem('userID', response.data.userID);
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
          console.log(error.response.data.error);
          
        })
      },
      clearErrorHandling() {
        document.querySelector(".error-handling").style.display = 'none';
        document.querySelector("#email").style.border = "1px solid #ced4da";
        document.querySelector("#password").style.border = "1px solid #ced4da";
      }
    }
  }

</script>

<template>
  <div class="container py-5">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-secondary text-white" style="border-radius: 0rem">
          <div class="card-body p-5 text-center">
            <form @submit.prevent="userLogin">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">
                Please enter your details to login
              </p>

              <div class="form-outline form-white mb-4">
                <label class="form-label" for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control form-control-lg"
                  v-model.lazy="userDetails.email"
                  @click="clearErrorHandling"
                  required>
              </div>

              <div class="form-outline form-white mb-4">
                <label class="form-label" for="password">Password</label>
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
                  <input class="form-check-input" type="checkbox" id="rememberMe" value="rememberme">
                  <label class="form-check-label" for="rememberMe">Remember Me</label>
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
