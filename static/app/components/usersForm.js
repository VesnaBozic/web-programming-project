export default{
    props: ["user", "tekst"],
    emits: ["sacuvaj"],
    data() {
        return {
            noviKorisnik: this.user ? {...this.user} : {}
        }
    },
    watch: {
        user: function(newValue, oldValue) {
            this.noviKorisnik = {...this.user};
        }
    },
    template: `
    <form v-on:submit.prevent="$emit('sacuvaj', {...noviKorisnik})">
        <div>
            <label>Name <input type="text" v-model="noviKorisnik.name" required></label>
        </div>
        <div>
            <label>Username: <input type="text" v-model="noviKorisnik.username" required></label>
        </div>
        <div>
            <label>Surname: <input type="text" v-model="noviKorisnik.surname" required></label>
        </div>
   
        <div>
            <input type="submit" v-bind:value="tekst">
        </div>
    </form>
    `
}