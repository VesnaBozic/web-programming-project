export default {
    template:`

    <nav  class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
  
      <router-link  class="navbar-brand" class="nav-link active" to="/movies">Movies</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
           <router-link to="/directors"class="nav-link active" aria-current="page" >Directors</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Log in</a>
          </li>
         
      
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>

  <div id="showcase"> 
  <div class="container">
      <div class="showcase-content">
          <h1><span class="span-text">Your</span> MOVIES</h1>
          <p class="lead">Welcome to your favorite movie site</p>
         <router-link to="/movies"> <a class="btn" href="#">Check our movies</a> </router-link>
         
      </div>
  </div>

</div>

<footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
</footer>
 
    `,
    data() {
        return {

        }
    },
    methods: {
       
    }, 
    created() {
  
    }  
}