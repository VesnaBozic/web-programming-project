export default {
    template: ` 

<div  v-if="message === false">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" to="/profile">Home <i class="fas fa-home"></i></router-link>
                </li>
                <li class="nav-item" v-if="userType == 'korisnik'">
                    <router-link class="nav-link" to="/myOrders">My orders  <i class="fas fa-shopping-cart"></i></router-link>
                </li>
                <li class="nav-item" v-if="userType == 'administrator'">
                    <router-link class="nav-link" to="/addAdministrator">Add new administrator</router-link>
                </li>
                <li class="nav-item" v-if="userType == 'administrator'">
                    <router-link class="nav-link" to="/addMovie">Add new movie</router-link>
                </li>
                <li class="nav-item" v-if="userType == 'administrator'">
                    <router-link class="nav-link" to="/directors">Directors</router-link>
                </li>
            </ul>
            <button v-on:click.prevent="logOut()" class="btn btn-outline-success" type="submit">Log out <i class="fas fa-sign-out-alt"></i></button>
        </div>
    </div>
</nav>

<div class="profile">
    <form class="mt-3">
        <div class="card p-3 text-center">
            <div>
                <div class="user-details">
                    <h4 class="mb-0">{{loggedUser.name}} {{loggedUser.surname}}</h4>
                </div>
            </div>
        <h4><i class="fas fa-user-edit"></i></h4>
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
            <div class="col-md-6" v-if="userType == 'korisnik'">
                <div class="inputs"> <label>Balance</label> <input class="form-control" type="text" v-model="loggedUser.balance"  > </div>
            </div>
            <div class="col-md-6">
                <div class="inputs"> <label>Password</label> <input class="form-control" type="text" v-model="loggedUser.lozinka" > </div>
            </div>
            <div v-if="updated === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
                You successfully updated your profile!
            </div>
            <div v-if="failedUpdate === true" class="col-md-6" class="alert-success" id="profile-alert" role="alert">
                That username already exist!
            </div>
        </div>
        <div class="mt-3 gap-2 d-flex "> 
        <button class="px-3 btn  btn-outline-primary"  v-on:click.prevent="goBack()">Go back</button> 
        <button class="px-3 btn btn-primary" v-on:click.prevent="update(loggedUser)">Save</button> 
        <button class="px-3 btn btn-primary" v-on:click.prevent="remove(loggedUser.id)" >Delete profile</button> </div></div>
        </div>
    </form>
</div>

<message-page v-on:goBack="goBack" v-if="message === true" v-bind:messageType="messageType"> </message-page>

`,
    data() {
      return {
        loggedUser: {},
        userType:"",
        updated: false,
        condition: false,
        failedUpdate : false,
        message: false,
        messageType:""
        }
    },
    methods: {
        goBack(a) {
            console.log(this.userType);
            this.$router.push("/profile");
        },

        update(user) {
            this.condition = false;
            this.updated = false;
            this.failedUpdate = false;
            axios.put(`/api/users/${user.id}`, user).then((response) => {
                this.refreshData();
                this.updated = true;
                this.condition = true;
                this.failedUpdate = false;});
            if (this.condition == false){
                this.failedUpdate = true;
              }
            },

        remove(id) {
            axios.delete(`api/users/${id}`).then((response) => {
            this.refreshData();});
            this.messageType = "accountDeleted";
            this.message = true;
            },
        
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/");
         },

        refreshData(){
            axios.get("/api/logged").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.loggedUser = response.data;}});
        },
        
        getRole(){
             axios.get("/api/userType").then((response) => {
            if (localStorage.getItem("token") != null) {
                this.userType = response.data;
                }});
            }},
    
    created() {
     
        this.refreshData();
        this.getRole();
   }
}