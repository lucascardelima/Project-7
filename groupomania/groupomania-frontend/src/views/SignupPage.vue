<style scoped>
  gradient-custom {
    background-color: blue;
  }
</style>

<template>
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-secondary text-white" style="border-radius: 1rem">
              <div class="card-body p-5 text-center">
                <div >
                  <h2 class="fw-bold mb-2 text-uppercase">Signup</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your details
                  </p>
  
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      class="form-control form-control-lg"
                    />
                    
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      class="form-control form-control-lg"
                    />
                    
                  </div>
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typeEmailX">Email</label>
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                    
                  </div>
  
                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="typePasswordX">Password</label>
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                    
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="dateOfBirth" >Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      class="form-control form-control-lg"
                    />
                    
                  </div>

                  <div class="form-outline form-white mb-4" id="preferenceBox">
                    <div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="family">
                        <label class="form-check-label" for="inlineCheckbox1">Family</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="tech">
                        <label class="form-check-label" for="inlineCheckbox2">Tech</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="art">
                        <label class="form-check-label" for="inlineCheckbox3">Art</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="kids">
                        <label class="form-check-label" for="inlineCheckbox3">Kids</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="cooking">
                        <label class="form-check-label" for="inlineCheckbox3">Cooking</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="traveling">
                        <label class="form-check-label" for="inlineCheckbox3">Traveling</label>
                      </div>
                    </div>
                    <label class="form-label" for="preferenceBox">Preferences</label>
                  </div>
                 


                  <button class="btn btn-outline-light btn-lg px-5" type="submit">
                    Signup
                  </button>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  
  