export default {
    template: ` <div>
    <add-user v-on:save="create"></add-user>
  
    </div>`,
    data() {
        return {
            users: [],
            korisnikZaIzmenu: {},
     
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