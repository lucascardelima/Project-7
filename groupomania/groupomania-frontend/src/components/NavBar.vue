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
            padding: 0px 20px;
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
</style>

<script>

export default {
    methods: {
        logOut() {
            window.sessionStorage.clear();
            this.isLoggedIn();
        },
        isLoggedIn() {
            if (window.sessionStorage.getItem('userID')) {
                this.isLogged = true
            } else {
                this.isLogged = false
            }
        }
    },
    data() {
        return {
            userDetails: {
                firstName: window.sessionStorage.getItem('firstName'),
                lastName: window.sessionStorage.getItem('lastName'),
                userID: window.sessionStorage.getItem('userID')
            },
            isLogged: window.sessionStorage.getItem('isLoggedIn')
        }
    },
    computed: {
        userSalutation() {
            return 'Hi, ' + this.userDetails.firstName;
        }
    },
    mounted() {
        this.isLoggedIn();
    },
    updated() {
        this.isLoggedIn();
    }
}

</script>

<template>
    <nav class="navbar navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <router-link 
                class="navbar-brand" 
                to="/">
                Groupomania
            </router-link>

            <div class="navbar-menu-inline">
                <ul id="navbarMenuInline">
                    <li class="list-item"
                        v-if="!isLogged"
                        > Hi, 
                            <router-link 
                                id="signInButton"
                                to="/loginpage">
                                sign in
                            </router-link>
                    </li>
                    <li class="list-item"
                        v-if="isLogged"
                        >
                        {{ userSalutation }}
                    </li>

                    <li>
                        <router-link 
                            class="navbar-link" 
                            to="/">
                            Home
                        </router-link>
                    </li>

                    <li>
                        <router-link 
                            class="navbar-link"
                            to="/createpost">
                            Create Post
                        </router-link>
                    </li>

                    <li>
                        <router-link 
                            class="navbar-link"
                            to="/"
                            v-if="isLogged"
                            @click="logOut">
                            Logout
                        </router-link>
                    </li>
                </ul>
            </div>

            <div id="navbarMenuOffcanvas">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" 
                            id="offcanvasDarkNavbarLabel"
                            v-if="!isLogged"
                            data-bs-dismiss="offcanvas"> Hi, 
                            <router-link 
                                id="signInButton"
                                to="/loginpage">
                                sign in
                            </router-link>
                        </h5>
                        <h5 class="offcanvas-title" 
                            id="offcanvasDarkNavbarLabel"
                            v-if="isLogged">
                            {{ userSalutation }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item"
                                data-bs-dismiss="offcanvas">
                                <router-link 
                                    class="nav-link active" 
                                    aria-current="page"
                                    to="/"
                                    >
                                    Home
                                </router-link>
                            </li>

                            <li class="nav-item"
                                data-bs-dismiss="offcanvas">
                                <router-link 
                                    class="nav-link"
                                    to="/createpost">
                                    Create Post
                                </router-link>
                            </li>

                            <li><hr style="width: 100%; height: 2px"></li>

                            <li class="nav-item"
                                data-bs-dismiss="offcanvas">
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