<style scoped>
  a {
    color: white;
    font-weight: bold;
  }
</style>

<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-secondary text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div>
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your details to login
                </p>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    class="form-control form-control-lg"/>
                </div>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control form-control-lg"/>
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
                
                <button class="btn btn-outline-light btn-lg px-5" type="submit">
                  Login
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
