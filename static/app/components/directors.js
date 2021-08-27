export default {
  template: ` 

    <show-directors v-if="isDirectorSelected == false" v-bind:directors="directors" v-on:chooseDirector="setDirector"> </show-directors>
    <director-movies v-if="isDirectorSelected == true" v-bind:directorMovies="directorMovies" v-on:goBack="goBack"> </director-movies>
  `,
  data() {
    return {
      directors: [],
      director: {},
      movies: [],
      isDirectorSelected: false,
      directorMovies: []

    }
  },
  methods: {
    goBack(a) {
      this.isDirectorSelected = a;
      this.$router.go();
    },

    refreshDataMovies() {
      axios.get("api/movies").then((response) => {
        this.movies = response.data;});
    },

    setDirector(director) {
      this.director = { ...director };
      for (let i = 0; i < this.movies.length; i++) {
        if (this.movies[i].directors_id == this.director.id) {
          this.directorMovies.push(this.movies[i]);
        }}
      this.isDirectorSelected = true;},
    
    refreshData() {
      axios.get("api/directors").then((response) => {
        this.directors = response.data;});
    },
    
    remove(id) {
      axios.delete(`api/directors/${id}`).then((response) => {
        this.refreshData();});
    },

    create(director) {
      axios.post("api/directors", director).then((response) => {
        this.refreshData()});
    },

    update(director) {
      axios.put(`/api/directors/${director.id}`, director).then((response) => {
        this.refreshData();});
    }
  },
  created() {
    this.refreshData();
    this.refreshDataMovies();}
}