import Main from "./components/main.js";
import TableUser from "./components/tableUser.js";
import Store from "./components/store.js"
import Users from "./components/users.js"
import Movies from"./components/movies.js"
import MovieDetails from "./components/movieDetails.js"
import TableMovies  from "./components/tableMovies.js";
import SearchedMovies from "./components/searchedMovies.js"
import ShowDirectors from "./components/showDirectors.js";
import DirectorMovies from "./components/directorMovies.js";
import AddUserForm from "./components/addUserForm.js";


import Directors from "./components/directors.js"


// axios.interceptors.request.use(config => {
//   let token = localStorage.getItem("token");
//   Object.assign(config.headers, { "Authorization": `Bearer ${token}` });
//   return config;
// });


const router = VueRouter.createRouter({
    
    history: VueRouter.createWebHashHistory(),
    routes: [
       
        {path:"/", component: Main},
        // {path: "/", component: Login},
        // {path: "/logout", component: Logout},
        {path: "/users", component: Users},
        {path: "/movies", component: Movies},
        {path: "/directors", component: Directors},
        {path: "/createAccount", component: Users},
       
       
       
    ],
  })
const app = Vue.createApp(Store);
app.component('table-user', TableUser);
app.component('table-movies', TableMovies);
app.component('searched-movies', SearchedMovies);
app.component('show-directors', ShowDirectors);
app.component('director-movies', DirectorMovies);
app.component('add-user', AddUserForm);



app.component('movie-details', MovieDetails);
// app.component('rezervacija-forma', RezervacijaForma);
app.use(router);
app.mount("#app");