<style>
body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #EEE;
  height: 100vh;
}

</style>

<script>
  import NavBar from './components/NavBar.vue';
  import FooterBar from './components/FooterBar.vue';


  export default {
    components: {
      NavBar,
      FooterBar
    }
  }
</script>

<template>
  <body>
    <NavBar/>
    <router-view></router-view>
    <FooterBar/>
  </body>
</template>