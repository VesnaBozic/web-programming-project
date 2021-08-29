export default{
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} <i class="fas fa-user"></i></router-link>
                    </li>
                   <li class="nav-item">
                        <router-link class="nav-link" to="/profile">Home</router-link>
                   </li>
                </ul>
                <button v-on:click.prevent="logOut()" class="btn btn-outline-success" type="submit">Log out <i class="fas fa-sign-out-alt"></i></button>
            </div>
        </div>
    </nav>
    
    <div class="profile">
        <form class="mt-3">
            <div class="card p-3 text-center">
                <div class="d-flex flex-row justify-content-center mb-3">
       
                </div>
                <h4>Add movie <i class="fas fa-film"></i></h4>
                <div class="row">
                    <div class="col-md-6">
                        <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="newMovie.name" required> </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Image link</label> <input class="form-control" type="text" v-model="newMovie.poster_src" required > </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Genre</label> <input class="form-control" type="text" v-model="newMovie.genre" required > </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Year</label> <input class="form-control" type="number" min="1901" max="2099" step="1" value="2021"  v-model="newMovie.year" required > </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Price</label> <input class="form-control" type="number" step="0.01" v-model="newMovie.price" required > </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Director </label> 
                            <select class="form-select" class="ta" aria-label=".form-select-lg example" class="form-control" v-model="newMovie.directors_id" required>
                                <option  v-for="director in directors" v-bind:value="director.id">{{director.name}}  {{director.surname}}</option>
                            </select>
                    </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputs"> <label>Description</label> <textarea class="ta" class="form-control" v-model="newMovie.decription" required></textarea> </div>
                    </div>
                    <div v-if="created === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
                    You successfully added new movie!
                </div>
            </div>
            <div class="mt-3 gap-2 d-flex"> <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click.prevent="goBack()">Go back</button> 
            <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="create(newMovie)">Save</button> 
            
            </div>
        </form>
    </div>
`
    ,
    data() {
      return {
        directors:[],
        loggedUser: {},
        userType:"",
        messageType:"",
        newMovie: {},
        created : false
        }
    },
    methods: {
        goBack(a) {
        
            this.$router.push("/profile");
        },

        create(movie) {
            axios.post("api/movies", movie).then((response) => {
                this.created = true;
                } 
            );},

        
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/");
         },

         refreshDataDirectors() {
            axios.get("api/directors").then((response) => {
              this.directors = response.data;});
          },

        refreshData(){
            axios.get("/api/logged").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.loggedUser = response.data;}});
        },
        
    },
    
    created() {
     
        this.refreshData();
        this.refreshDataDirectors();
   
   }
}