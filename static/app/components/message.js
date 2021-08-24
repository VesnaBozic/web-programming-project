export default {
    props: ["messageType"],
 
    
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
          <router-link to="/directors"class="nav-link active" aria-current="page" >Directors</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/login">Log in</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" v-on:click="$emit('goBack', 'false')" href="#/createAccount">Create account</a>
        </li>
         
      
        </ul>
  
      </div>
    </div>
  </nav>
   
       <div class="form">
        <div v-if="messageType == 'accountCreated'" class="alert alert-info" role="alert">
        
        Account created! You can log in!
        <a class="nav-link" href="#/login">Login</a>
        </div>

        <div v-if="messageType ==  'failed'" class="alert alert-warning" role="alert">
           That username already exist! Try again!
           <a class="nav-link" href="#/createAccount" v-on:click="$emit('goBack', 'false')">Create account</a>
        </div>

    </div>

  
  
  
   <footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
   </footer>

    
`


}