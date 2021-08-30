export default{
    props: ["movies","loggedUser", "userType"],
    emits: ["logOut", "buyMovie", "clickedB","chooseMovie", "getDirector"],
    
    data() {
        return {}
            
    },
    template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} <i class="fas fa-user"></router-link>
        </li>
        <li class="nav-item"  v-if="userType == 'korisnik'">
          <router-link class="nav-link" to="/myOrders">My orders <i class="fas fa-shopping-cart"></i></router-link>
        </li>
        <li class="nav-item"  v-if="userType == 'administrator'">
          <router-link class="nav-link" to="/addAdministrator">Add new administrator</router-link>
        </li>
        <li class="nav-item"  v-if="userType == 'administrator'">
          <router-link class="nav-link" to="/addMovie">Add new movie</router-link>
        </li>
        <li class="nav-item"  v-if="userType == 'administrator'">
          <router-link class="nav-link" to="/directors">Directors</router-link>
        </li>
      </ul>
      <button v-on:click="$emit('logOut')" class="btn btn-outline-success" type="submit">Log out <i class="fas fa-sign-out-alt"></i></button>
    </div>
  </div>
</nav>
 
<div class="movie-box" >
  <div class="slider-box" v-for="movie in movies">
      <p class="time"> {{movie.genre}}</p>
    <div class="img-box">
      <img v-bind:src="movie.poster_src" >
    </div>
    <button class="movie-button"  v-on:click="$emit('getDirector',movie.directors_id)"  v-on:click="$emit('chooseMovie', {...movie})"> {{movie.name}} </button>
    <p class="price" > {{movie.price}} $</p>
    <button v-if="userType == 'korisnik'" class="cart" v-on:click="$emit('clickedB', 'true')" v-on:click="$emit('buyMovie', {...movie})">Buy <i class="fas fa-shopping-cart"></i></button>
    <button v-if="userType == 'administrator'" class="cart" v-on:click="$emit('clickedE', 'true')" v-on:click="$emit('buyMovie', {...movie})">Edit <i class="fas fa-edit"></i></button>
    </div> 
</div>

<page-footer></page-footer>
    `
}