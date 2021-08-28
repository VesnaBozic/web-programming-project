export default{
    props: ["movies","loggedUser", "userType"],
    emits: ["logOut", "buyMovie", "clickedB","chooseMovie"],
    
    data() {
        return {}
            
    },
    template: `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} profile</router-link>
        </li>
        <li class="nav-item"  v-if="userType == 'korisnik'">
          <router-link class="nav-link" to="/myOrders">My orders</router-link>
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
      <button v-on:click="$emit('logOut')" class="btn btn-outline-success" type="submit">Log out</button>
    </div>
  </div>
</nav>
 
<div class="movie-box" >
  <div class="slider-box" v-for="movie in movies">
      <p class="time"> {{movie.genre}}</p>
    <div class="img-box">
      <img v-bind:src="movie.poster_src" >
    </div>
    <button class="movie-button"  v-on:click="$emit('chooseMovie', {...movie})"> {{movie.name}} </button>
    <p class="price" > {{movie.price}} $</p>
    <button v-if="userType == 'korisnik'" class="cart" v-on:click="$emit('clickedB', 'true')" v-on:click="$emit('buyMovie', {...movie})">Buy</button>
    <button v-if="userType == 'administrator'" class="cart">Edit</button>
    </div> 
</div>

<footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
</footer>
    `
}