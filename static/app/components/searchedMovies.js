export default {
    props: ["searchedMovies"],
    emits: ["chooseMovie","goBackSearched"],
    
    data() {
        return {

           }},

   template: ` 

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <router-link  class="navbar-brand" class="nav-link active" to="/">Home</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/movies" v-on:click="$emit('goBackSearched', 'false')">Movies</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
 
<div class="movie-box" >
  <div class="slider-box" v-for="movie in searchedMovies">
    <p class="time"> {{movie.genre}}</p>
  <div class="img-box">
     <img v-bind:src="movie.poster_src" >
  </div>
  <button class="movie-button"  v-on:click="$emit('chooseMovie', {...movie})"> {{movie.name}} </button>
    <p class="price" > {{movie.price}} $</p>
  <div class="cart">
    <router-link class="buy-btn" to="/createAccount" >Buy <i class="fas fa-shopping-cart"></i> </router-link>
  </div>
  </div> 
  </div>
  <page-footer></page-footer>
`


}