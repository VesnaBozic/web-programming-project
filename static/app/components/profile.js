export default {
    template: ` 
     <user-profile v-on:logOut="logOut" v-on:chooseMovie="setMovie" v-if="isMovieSelected === false" v-bind:loggedUser="loggedUser" v-bind:movies="movies" v-bind:userType="userType" v-bind:userIsLogged="userIsLogged"> </user-profile>
     <movie-details v-if="isMovieSelected == true" v-bind:selectedMovie="selectedMovie"  v-on:goBack="goBack"> </movie-details>
     `,
    data() {
      return {
        loggedUser: [],
        userType:"",
        
        movies: [],
        selectedMovie: {},
        isMovieSelected: false,
 
        
  
      }
    },
    methods: {
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/");
         },
        setMovie(movie) {
            this.selectedMovie = { ...movie };
            this.isMovieSelected = true;
            console.log(this.selectedMovie);

        },
        goBack(a) {
            this.isMovieSelected = a;
            this.$router.go();
        },
        refreshDataMovies() {
            axios.get("api/movies").then((response) => {
                this.movies = response.data;
               
            });
        },

     refreshData(){
        axios.get("/api/logged").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.loggedUser = response.data;
            
                
              
                
            }else{
               
            }
        });




     },
     getRole(){
        axios.get("/api/userType").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.userType = response.data;
               
                
            }else{
               
            }
        });
    }

    
    },
    created() {
     
   this.refreshData();
   this.getRole();
   this.refreshDataMovies();
  
    }
}