export default {
    template: ` <div>
    
    <login-page> </login-page>
    
  
    </div >`,
    data() {
        return {
            users: [],
            korisnikZaIzmenu: {},
            pageOn:""
     
        }
    },
    methods: {
  
     
        setKorisnikZaIzmenu(user) {
            this.korisnikZaIzmenu = { ...user };
        },
        refreshData() {
            axios.get("api/users").then((response) => {
                this.users = response.data;
            });
        },
  
    
        remove(id) {
            axios.delete(`api/users/${id}`).then((response) => {
            this.refreshData();});
        },


        create(user) {
            axios.post("api/users", user).then((response) => {
            this.refreshData() });
        },


        update(user) {

            axios.put(`/api/users/${user.id}`, user).then((response) => {
                this.refreshData();});
        }
    }, 
    created() {
        this.refreshData();
        
       
    }  
}