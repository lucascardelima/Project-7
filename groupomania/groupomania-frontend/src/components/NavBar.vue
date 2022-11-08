<style scoped>
    .fixed-top {
        position: sticky;
    }
    .offcanvas {
        width: 300px;
    }
    @media (max-width: 800px) {
       .offcanvas {
        max-width: 60%;
       }
    }
</style>

<script>

export default {
    methods: {
        logOut() {
            window.sessionStorage.clear();
        }
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
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Groupomania - Menu</h5>
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
                                to="/loginpage">
                                Login
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
    </nav>
</template>