<style scoped>
  footer {
    border-top: 1px solid #797D7F;
  }
</style>

<script>
  import { useAuthStore} from '../stores/AuthStore'

  export default {
    setup() {
      const authStore = useAuthStore();
      return { authStore }
    }
  }

</script>

<template>
  <div class="container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
      <p class="col-md-4 mb-0 text-muted">&copy; 2022 Groupomania</p>

      <ul class="nav col-md-4 justify-content-end">
        <li
          class="nav-item"
          v-if="this.authStore.isLoggedIn">
          <router-link
          to="/"
          class="nav-link px-2 text-muted">Home</router-link></li>
        <li
          class="nav-item"
          v-if="this.authStore.isLoggedIn">
          <router-link
          to="/createpost"
          class="nav-link px-2 text-muted">Create
          Post</router-link></li>
      </ul>
    </footer>
  </div>
</template>