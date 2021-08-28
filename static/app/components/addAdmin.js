export default {
    template: ` 

<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/myProfile">{{loggedUser.name}} profile</router-link>
                </li>
               <li class="nav-item">
                    <router-link class="nav-link" to="/profile">Home</router-link>
               </li>
            </ul>
            <button v-on:click.prevent="logOut()" class="btn btn-outline-success" type="submit">Log out</button>
        </div>
    </div>
</nav>

<div class="profile">
    <form class="mt-3">
        <div class="card p-3 text-center">
            <div class="d-flex flex-row justify-content-center mb-3">
   
            </div>
        <h4>Add new administrator</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="newAdministrator.name" > </div>
            </div>
            <div class="col-md-6">
            <div class="inputs"> <label>Surname</label> <input class="form-control" type="text" v-model="newAdministrator.surname"  > </div>
        </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Username</label> <input class="form-control" type="text" v-model="newAdministrator.username"  > </div>
            </div>
           <div class="col-md-6">
                <div class="inputs"> <label>Password</label> <input class="form-control" type="text" v-model="newAdministrator.lozinka" > </div>
            </div>
            <div v-if="created === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
                You successfully added new administrator!
            </div>
            <div v-if="failed === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
                That username already exist! Try again!
            </div>
        </div>
        <div class="mt-3 gap-2 d-flex"> <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click.prevent="goBack()">Go back</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="create(newAdministrator)">Save</button> 
        
        </div>
    </form>
</div>



`,
    data() {
      return {
        loggedUser: {},
        userType:"",
        messageType:"",
        newAdministrator: {},
        failed: false,
        created : false
        }
    },
    methods: {
        goBack(a) {
        
            this.$router.push("/profile");
        },

        create(user) {
            axios.post("api/administrator", user).then((response) => {
                this.created = true;
                this.failed = false;
                
                } ,_ =>{
                 this.failed =true; }
            );},

        
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/");
         },

        refreshData(){
            axios.get("/api/logged").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.loggedUser = response.data;}});
        },
        
    },
    
    created() {
     
        this.refreshData();
   
   }
}