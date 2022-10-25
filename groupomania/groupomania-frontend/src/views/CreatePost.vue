<style scoped>
 .main-card {
  max-width: 80%;
 }
 #submitButton:hover {
    background-color: green;
    color: white;
 }
</style>

<template>

<div class="container py-5 h-100">
  <div class="row d-flex justify-content-center align-items-center">
    <div class="main-card">
      <div class="card bg-secondary text-white" style="border-radius: 1rem">
        <div class="card-body p-4">
          <div>
            <h4 class="fw-bold mb-2 text-uppercase text-center">Create your Post</h4>
        
            <div class="mb-3">
              <label for="postTitle" class="form-label">Title</label>
              <input type="email" class="form-control" id="postTitle">
            </div>
            <div class="mb-3">
              <label for="postText" class="form-label">Text</label>
              <textarea class="form-control" id="postText" rows="5"></textarea>
            </div>
            <div class="mb-3">
              <label for="postCategory" class="form-label">Category</label>
              <select class="form-select" id="postCategory" aria-label="Default select example">
                <option selected>Select the category of your post</option>
                <option value="Family">Family</option>
                <option value="Tech">Tech</option>
                <option value="Art">Art</option>
                <option value="Kids">Kids</option>
                <option value="Cooking">Cooking</option>
                <option value="Traveling">Traveling</option>
              </select>
            </div>
            
            <button
              id="submitButton" 
              class="btn btn-outline-light btn-lg px-5" 
              type="submit">
                  Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>