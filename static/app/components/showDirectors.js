export default {
    props: ["directors"],
    emits: ["chooseDirector","addD"],
  data() {
        return {
  }
  },
  template: ` 
   
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Home <i class="fas fa-home"></i></router-link>
        </li>
      </ul>
      <button class="btn btn-outline-success"  v-on:click="$emit('addD', 'true')" ><i class="fas fa-user-plus"></i> director</button>
    </div>
  </div>
</nav>
 
<div class="movie-box">
  <div class="slider-box" v-for="director in directors">
    <div class="img-box">
      <img v-bind:src="director.image_src">
    </div>
    <p class="detail"> {{director.name}} {{director.surname}} </p>
    <button class="cart"  v-on:click="$emit('chooseDirector', {...director})">Edit <i class="fas fa-edit"></i> </button>
    
    </div> 
</div>
  
<page-footer></page-footer>
    
`


}