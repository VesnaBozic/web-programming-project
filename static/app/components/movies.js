export default {
    template: ` 

    <table-movies v-if="isMovieSelected === false && isMovieSearched === false" v-bind:movies="movies" v-on:chooseMovie="setMovie" v-on:searchMovies="searchMovies"> </table-movies>
    <searched-movies v-on:goBackSearched="goBackSearched" v-if="isMovieSelected === false && isMovieSearched === true" v-bind:searchedMovies="searchedMovies" v-on:chooseMovie="setMovie"> </searched-movies>
    <movie-details v-if="isMovieSelected == true" v-bind:selectedMovie="selectedMovie"  v-on:goBack="goBack"> </movie-details>
     `,
    
    data() {
        return {
            movies: [],
            selectedMovie: {},
            isMovieSelected: false,
            searchedMovies: [],
            isMovieSearched: false,
            }
    },
    methods: {

        searchMovies(movieName) {
            for (let i = 0; i < this.movies.length; i++) {
                if (this.movies[i].name.includes(movieName)) {
                    this.searchedMovies.push(this.movies[i]);
                    this.isMovieSearched = true; }
            }
        },
        goBack(a) {
            this.isMovieSelected = a;
            this.$router.go();
        },

        goBackSearched(a) {
            this.isMovieSearched = a;
            this.$router.go();
        },

        setMovie(movie) {
            this.selectedMovie = { ...movie };
            this.isMovieSelected = true;
        },
        refreshData() {
            axios.get("api/movies").then((response) => {
                this.movies = response.data;});
        },
        remove(id) {
            axios.delete(`api/movies/${id}`).then((response) => {
                this.refreshData();});
        },
        create(movie) {
            axios.post("api/movies", movie).then((response) => {
                this.refreshData()});
        },
        update(movie) {
            axios.put(`/api/movies/${movie.id}`, movie).then((response) => {
                this.refreshData();});
        }
        },
    created() {
        this.refreshData();
    }
}