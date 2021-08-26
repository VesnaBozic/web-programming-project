export default {

    data() {
        return {
            loggedUser: [],
            userType: "",
            movie:{},
            movies: [],
            selectedMovie: {},
            isMovieSelected: false,
            movieBuyClicked: false,
            order: {},
            moviesHasOrder: {}
        }
    },
    methods: {

        createOrder(movie){
            	
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
           
            this.order.price = movie.price;
            this.order.purchase_date = date;
            this.order.users_id = this.loggedUser.id;
            console.log(this.movie)
            console.log(this.order)
            
            axios.post("api/orders", this.order).then((response) => {
                });
          
            
            
        },
        
        buyMovie(movie) {
            this.movie = movie;
            console.log(this.movie);
        },

        clickedB(a) {
            this.movieBuyClicked = a;
        },

        clickedBtn(a) {
            this.movieBuyClicked = a;
            window.location.reload();
       },

        logOut() {
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

        refreshData() {
            axios.get("/api/logged").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.loggedUser = response.data;
                }
            });},
        getRole() {
            axios.get("/api/userType").then((response) => {
                if (localStorage.getItem("token") != null) {
                    this.userType = response.data;
                }
            });}},

    created() {

        this.refreshData();
        this.getRole();
        this.refreshDataMovies();

    },
    template: ` 

    
    <div v-if="movieBuyClicked === false && isMovieSelected === false">
     <user-profile v-on:clickedB="clickedB" v v-on:buyMovie="buyMovie" v-on:logOut="logOut" v-on:chooseMovie="setMovie"  v-bind:loggedUser="loggedUser" v-bind:movies="movies" v-bind:userType="userType" v-bind:userIsLogged="userIsLogged"> </user-profile>
     </div>
     <div v-if="isMovieSelected === true && movieBuyClicked === false">
     <movie-details v-bind:selectedMovie="selectedMovie"  v-on:goBack="goBack" > </movie-details>
    </div> 
    <user-cart v-on:createOrder="createOrder" v-if="movieBuyClicked != false" v-bind:loggedUser="loggedUser" v-bind:movie="movie" v-on:clickedBtn="clickedBtn"> </user-cart>
     
     `,
}