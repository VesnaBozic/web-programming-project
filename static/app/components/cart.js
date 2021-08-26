export default{
    props: ["loggedUser","movie"],
    emits: ["clickedBtn", "createOrder"],
    
    data() {
        return {}
            
    },
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
    <div class="container-fluid">
  
     

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
          <li class="nav-item">
            <a class="nav-link" href="#/myProfile">{{loggedUser.name}} profile</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#/myOrders">My orders</a>
        </li>
         
      
        </ul>
        
      </div>
    </div>
  </nav>

    <div class="container-cart padding-bottom-3x mb-1">
    

    <!-- Shopping Cart-->
    <div class="table-responsive shopping-cart">
        <table class="table">
            <thead>
                <tr>
                    <th>Movie</th>
                   
                    <th class="text-center">Price</th>
                   
               
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="product-item">
                            <a class="product-thumb" href="#"><img v-bind:src="movie.poster_src" alt="Product"></a>
                            <div class="product-info">
                                <h4 class="product-title"><a href="#">{{movie.name}}</a></h4><span><em>Genre: </em>{{movie.genre}}</span>
                            </div>
                        </div>
                    </td>
       
                    <td class="text-center text-lg text-medium">{{movie.price}}</td>
                    
                    
                </tr>
               
            </tbody>
        </table>
    </div>
    <div class="shopping-cart-footer">

        <div class="column text-lg">Price to pay: <span class="text-medium">{{movie.price}}</span></div>
    </div>
    <div class="shopping-cart-footer">                                                                                                    
        <div  class="column"><button  class="btn"  v-on:click="$emit('clickedBtn', 'false')">Cancel</button></div>
        <div class="column"><button v-on:click="$emit('createOrder', {...movie})" class="btn btn-success" href="#">Confirm purchase</button></div>
    </div>
</div>
    `
}