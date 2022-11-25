<style scoped>
    .fixed-top {
        position: sticky;
    }
    .offcanvas {
        width: 300px;
    }
    @media (max-width: 1000px) {
       .offcanvas {
        max-width: 60%;
       }
       #navbarMenuInline {
        display: none;
       }
    }
    @media (min-width: 1000px) {
        #navbarMenuOffcanvas {
            display: none;
        }
        #navbarMenuInline {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: space-between;
        }
        li {
            padding: 0px 15px;
            text-decoration: none;
        }
        ul {
            padding: 0 0 0 0;
            margin: 0 0 0 0;
            list-style: none;
        }
        .navbar-link {
            text-decoration: none;
            color: white;
        }
        .list-item {
            color: white;
        }
    }
    #signInButton {
        text-decoration: none;
        color: white;
    }
    #signInButton:hover {
        text-decoration: underline;
    }
    .vl{
        border-left: 2px solid white;
        padding: 10px
    } 

</style>

<script>
import { useAuthStore } from '../stores/AuthStore'

export default {
    
    setup() {
        const authStore = useAuthStore();
        return { authStore }
    },
    methods: {
        logOut() {
            if (window.localStorage.getItem('checked') === 'checked') {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('userID');
                window.localStorage.removeItem('preference');
                window.localStorage.removeItem('firstName');
                window.localStorage.removeItem('lastName');
                window.localStorage.removeItem('isLoggedIn');
                delete this.axios.defaults.headers.common['Authorization']
                delete this.axios.defaults.headers.post['Authorization']
                this.authStore.$reset();
                this.$router.push('/loginpage');
                
            } else {
                window.localStorage.clear();
                delete this.axios.defaults.headers.common['Authorization']
                delete this.axios.defaults.headers.post['Authorization']
                this.authStore.$reset();
                this.$router.push('/loginpage');

            }
        }
    },
    data() {
        return {
            userDetails: {
                firstName: window.localStorage.getItem('firstName'),
                lastName: window.localStorage.getItem('lastName'),
                userID: window.localStorage.getItem('userID')
            },
            isLogged: true
        }
    },
    computed: {
        userSalutation() {
            return 'Hi, ' + this.authStore.firstName;
        }
    }
}

</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top shadow-lg">
        <div class="container-fluid">
            <router-link 
                class="navbar-brand" 
                to="/">
                Groupomania
            </router-link>

            <div class="navbar-menu-inline">
                <ul id="navbarMenuInline">
                    <li class="list-item"
                        v-if="!this.authStore.isLoggedIn"
                        > Hi, 
                            <router-link 
                                id="signInButton"
                                to="/loginpage">
                                sign in
                            </router-link>
                    </li>
                    <li class="list-item"
                        v-if="this.authStore.isLoggedIn"
                        >
                        {{ userSalutation }}
                    </li>

                    <li class="vl"
                        v-if="this.authStore.isLoggedIn"></li>

                    <li class="list-item"
                        v-if="this.authStore.isLoggedIn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Homepage">
                        <router-link 
                            class="navbar-link" 
                            to="/">
                            <font-awesome-icon icon="fa-solid fa-house" />
                        </router-link>
                    </li>

                    <li class="list-item"
                        v-if="this.authStore.isLoggedIn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Create a post">
                        <router-link 
                            class="navbar-link"
                            to="/createpost">
                            <font-awesome-icon icon="fa-solid fa-plus" />
                        </router-link>
                    </li>
                    <li class="list-item"
                        v-if="this.authStore.isLoggedIn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Account">
                        <router-link 
                            class="navbar-link"
                            to="/">
                            <font-awesome-icon icon="fa-solid fa-user" />
                        </router-link>
                    </li>

                    <li class="list-item"
                        v-if="this.authStore.isLoggedIn"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Logout">
                        <router-link 
                            class="navbar-link"
                            to="/"
                            @click="logOut">
                            <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                        </router-link>
                    </li>
                </ul>
            </div>

            <div id="navbarMenuOffcanvas">
                
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasDarkNavbar"
                  aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  class="offcanvas offcanvas-end text-bg-dark"
                  tabindex="-1"
                  id="offcanvasDarkNavbar"
                  aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" 
                            id="offcanvasDarkNavbarLabel"
                            v-if="!this.authStore.isLoggedIn"
                            data-bs-dismiss="offcanvas"> Hi, 
                            <router-link 
                                id="signInButton"
                                to="/loginpage">
                                sign in
                            </router-link>
                        </h5>
                        <h5 class="offcanvas-title" 
                            id="offcanvasDarkNavbarLabel"
                            v-if="this.authStore.isLoggedIn">
                            {{ userSalutation }}
                        </h5>
                       <button
                          type="button"
                          class="btn-close btn-close-white"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item"
                                data-bs-dismiss="offcanvas"
                                v-if="this.authStore.isLoggedIn">
                                <router-link 
                                    class="nav-link active" 
                                    aria-current="page"
                                    to="/"
                                    >
                                    Home
                                </router-link>
                            </li>

                            <li class="nav-item"
                                data-bs-dismiss="offcanvas"
                                v-if="this.authStore.isLoggedIn">
                                <router-link 
                                    class="nav-link"
                                    to="/createpost">
                                    Create Post
                                </router-link>
                            </li>

                            <li v-if="this.authStore.isLoggedIn">
                                <hr style="width: 100%; height: 2px">
                            </li>

                            <li class="nav-item"
                                data-bs-dismiss="offcanvas"
                                v-if="this.authStore.isLoggedIn">
                                <router-link 
                                    class="nav-link"
                                    to="/"
                                    @click="logOut">
                                    Logout
                                </router-link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>