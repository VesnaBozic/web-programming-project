export default {
    template: ` <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
  
      <router-link  class="navbar-brand" class="nav-link active" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
          <router-link to="/movies"class="nav-link active" aria-current="page" >Movies</router-link>
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
 
  <div class="movie-box">
    <div class="slider-box" v-for="director in directors">
    
    <div class="img-box">
      <a href="#">
      <img v-bind:src="director.image_src">
      
       </a>
    </div>
    <p class="detail"> {{director.name}} {{director.surname}} </p>
   
    
    <div class="cart">
    <a href="#">My movies </a>
    </div>
    </div> 
  </div>
  
  
   <footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
   </footer>
  `,
    data() {
        return {
            directors: [],
            directorZaIzmenu: {},

        }
    },
    methods: {


        setDirectorZaIzmenu(director) {

            this.directorZaIzmenu = { ...director };

        },
        refreshData() {
            axios.get("api/directors").then((response) => {
                this.directors = response.data;
            });
        },


        remove(id) {

            axios.delete(`api/directors/${id}`).then((response) => {
                this.refreshData();
            });
        },


        create(director) {
            axios.post("api/directors", director).then((response) => {
                this.refreshData()
            });
        },


        update(director) {director

            axios.put(`/api/directors/${director.id}`, director).then((response) => {
                this.refreshData();
            });
        }
    },
    created() {
        this.refreshData();


    }
}