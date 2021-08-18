export default{
    
   
    data() {
        return {
          
        }
    },

    template: `

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
         </div>
       </div>
    </div>
  </nav>

<div class="form">


<div class="loginbox">

<h1>Create new account</h1>
<form>
    <p>Name</p>
    <input id="user-name" type="text" name="" placeholder="Enter your name">
    <p>Surname</p>
    <input  type="text" name="" placeholder="Enter your surname">
    <p>Username</p>
    <input id="user-username" type="text" name="" placeholder="Enter  Username">
    <p>Password</p>
    <input id="user-password" type="password" name="" placeholder="Enter Password">
    <button type="button" name="" id="form-button">Register</button>
    <a href="#">Already have an account?</a>
</form>
</div>

</div>

<footer id="main-footer">
    <p>Your MOVIES &copy; 2021, All Rights reserved</p>    
</footer>


    `
}