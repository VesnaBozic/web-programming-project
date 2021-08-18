export default {
    props: ["directorMovies"],
    
    
    data() {
        return {

          
            
        }
    },

 

    
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
          <a class="nav-link" href="#/directors" v-on:click="$emit('goBack', 'false')"  >Directors</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Log in</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#/createAccount">Create account</a>
        </li>
         
      
        </ul>
        
      </div>
    </div>
  </nav>
 
  <div class="movie-box" >
    <div class="slider-box" v-for="movie in directorMovies">
    
    <p class="time"> {{movie.genre}}</p>
    <div class="img-box">
     
      <img v-bind:src="movie.poster_src" >
      
       
      
    </div>
    <p  > {{movie.name}} </p>
    <p class="price" > {{movie.price}} $</p>
    <div class="cart">
    <a href="#/createAccount" >Buy </a>
    </div>
    </div> 
  </div>

  
  
  
   <footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
   </footer>

    
`


}