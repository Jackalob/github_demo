Vue.component("searchComponent", {
  template: `
    <div>ddd</div>
  `,
  props:{
    data:{
      required: true
    }
  }
});

new Vue({
  el: "#app",
  data: {
    status: false,
    username: 'jackalob',
    data: [],
    searched:[],
    userExistence: null,
  },
  methods: {
    addToSearched(){
      if(this.searched.indexOf(this.username) == -1) this.searched.unshift(this.username)
    },
    getName(){

    },
    getRepos() {
      axios
        .get(`https://api.github.com/users/${this.username}/repos`)
        .then(res => {
          console.log(res.data);
          this.data = res.data
          this.userExistence = true
          this.addToSearched()
        })
        .catch(err => {
          this.data = []
          this.userExistence = false
        });
      
    }
  },
  beforeMount() {
    this.getRepos()
  },
  watch:{
    searched(){},
    data(){}
  }
});
