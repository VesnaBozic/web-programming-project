export default{
template: `

<nav v-if="message === false" class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <router-link  class="navbar-brand" class="nav-link active" to="/movies">Movies</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <router-link  class="navbar-brand" class="nav-link active" to="/createAccount">Create account</router-link>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>

<div v-if="message === false" class="form">
  <div class="loginbox2">
  <h1>Sign in</h1>
    <form v-on:submit.prevent="login()">
      <p>Username: </p>
        <input id="user-name" type="text" name="" placeholder="Enter your username" v-model="user.username" required >
      <p>Password: </p>
        <input id="user-password" type="password" name="" placeholder="Enter Password" v-model="user.lozinka" required>
        <input type="submit" name="" id="form-button" value="Sign in">
      <router-link to="/createAccount"><a>Don't have an account? Go and create!</a></router-link>
    </form>
  </div>
</div>
<footer v-if="message === false" id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
</footer>

<message-page v-on:goBack="goBack" v-if="message === true" v-bind:messageType="messageType"> </message-page>
`,

    data() {
      return {
          user:{
              "username":"",
              "lozinka": ""}, 
          messageType: '',
          message: false
      }
  },
  methods: {
    goBack(a) {
      this.message = a;
      this.$router.go();
  },
     login(){
        axios.post(`api/login`, this.user).then((response)=> {
            
            localStorage.setItem("token",response.data);
            
            this.$router.push("/profile");
        }, _ =>{
            this.messageType = "failedLogin";
            this.message = true;
        }) 
     }
  }, 
  created() {

  }  
}