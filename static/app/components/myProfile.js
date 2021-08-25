export default {
    template: ` 


    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
  
     

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
          <li class="nav-item">
            <a class="nav-link" href="#/myProfile">{{loggedUser.name}} profile</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#/createAccount">My cart</a>
        </li>
         
      
        </ul>
        <button v-on:click="$emit('logOut')" class="btn btn-outline-success" type="submit">Log out</button>
      </div>
    </div>
  </nav>


  <div class="profile">
    <form class="mt-3">
    <div class="card p-3 text-center">
        <div class="d-flex flex-row justify-content-center mb-3">
           
            <div class="d-flex flex-column ms-3 user-details">
                <h4 class="mb-0">{{loggedUser.name}} {{loggedUser.surname}}</h4>
              
            </div>
        </div>
        <h4>Edit Profile</h4>
        <div class="row">
            <div class="col-md-6">
                <div class="inputs"> <label>Name</label> <input class="form-control" type="text" v-model="loggedUser.name" > </div>
            </div>
            <div class="col-md-6">
            <div class="inputs"> <label>Surname</label> <input class="form-control" type="text" v-model="loggedUser.surname"  > </div>
        </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Username</label> <input class="form-control" type="text" v-model="loggedUser.username"  > </div>
            </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Balance</label> <input class="form-control" type="text" v-model="loggedUser.balance"  > </div>
            </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Password</label> <input class="form-control" type="text" v-model="loggedUser.lozinka" > </div>
            </div>
        </div>
  
        <div class="mt-3 gap-2 d-flex justify-content-end"> <button class="px-3 btn btn-sm btn-outline-primary"  v-on:click.prevent="goBack()">Cancel</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="update(loggedUser)">Save</button> 
        <button class="px-3 btn btn-sm btn-primary" v-on:click.prevent="remove(loggedUser.id)" >Delete profile</button> </div></div>
    </div>
</form>
</div>


     `,
    data() {
      return {
        loggedUser: [],
        userType:"",
         }
    },
    methods: {
        goBack(a) {
            this.$router.push("/profile");
        },
        update(user) {

            axios.put(`/api/users/${user.id}`, user).then((response) => {
                this.refreshData();});
        },

        remove(id) {
            axios.delete(`api/users/${id}`).then((response) => {
            this.refreshData();});
        },
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/");
         },


     refreshData(){
        axios.get("/api/logged").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.loggedUser = response.data;
            }
        });},
     getRole(){
        axios.get("/api/userType").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.userType = response.data;
                }
        });
    }

    
    },
    created() {
     
   this.refreshData();
   this.getRole();
   
  
    }
}