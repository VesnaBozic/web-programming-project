export default {
  template: ` 

    <show-directors v-if="addDirector == false && isDirectorSelected == false" v-on:addD="addD" v-bind:directors="directors" v-on:chooseDirector="setDirector"> </show-directors>
    <edit-director  v-bind:removeFail="removeFail" v-bind:removed="removed" v-on:goBack="goBack" v-on:remove="remove" v-on:save="update" v-if="isDirectorSelected == true" v-bind:updated="updated" v-bind:director="director"> </edit-director>
    <add-director v-if="addDirector != false" v-bind:created="created" v-on:goBack="goBack" v-on:save="create" v-bind:newDirector="newDirector"> </add-director>
  `,
  data() {
    return {
      directors: [],
      director: {},
      isDirectorSelected: false,
      updated : false,
      removed : false,
      removeFail: false,
      addDirector: false,
      created: false,
      add: true,
      newDirector: {},
     
 
   }
  },
  methods: {

    addD(a){
      this.addDirector = a;
      console.log(this.addDirector)
    },
    goBack(a) {
      this.isDirectorSelected = a;
      this.$router.go();
    },

    setDirector(director) {
      this.director = { ...director };
      this.isDirectorSelected = true;
      },
    
    refreshData() {
      axios.get("api/directors").then((response) => {
        this.directors = response.data;});
    },
    
    remove(id) {
      axios.delete(`api/directors/${id}`).then((response) => {
        this.refreshData();
        this.updated = false;
        this.removed = true;},_ =>{
          this.updated = false;
          this.removeFail =true;
          return;}
        );
      
    },

    create(director) {
      axios.post("api/directors", director).then((response) => {
        this.refreshData()});
        this.created = true;
        
    },

    update(director) {
      axios.put(`/api/directors/${director.id}`, director).then((response) => {
        this.refreshData();});
        this.updated = true;
    }
  },
  created() {
    this.refreshData();
   }
}