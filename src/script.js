Vue.component("searchComponent", {
  template: `
    <div>ddd</div>
  `,
  props: {
    data: {
      required: true
    }
  }
});

new Vue({
  el: "#app",
  data: {
    status: false,
    username: "jackalob",
    data: [],
    searched: [],
    userExistence: null
  },
  methods: {
    addToSearched() {
      let totalCount = 6;
      if (this.searched.indexOf(this.username)) {
        this.searched.unshift(this.username);
      }
      if (this.searched.length > totalCount) {
        this.searched.pop();
      }
    },
    getName() {
      this.status = false;
      axios
        .get(`https://api.github.com/users/${this.username}`)
        .then(res => {
          this.addToSearched();
          console.log(res.data);
          this.getRepos();
        })
        .catch(err => {
          this.status = true
        });
    },
    getRepos() {
      axios
        .get(`https://api.github.com/users/${this.username}/repos`)
        .then(res => {
          console.log(res.data);
          this.data = res.data;
          this.userExistence = true;
          this.status = true
        })
        .catch(err => {
          this.data = [];
          this.userExistence = false;
        });
    }
  },
  beforeMount() {
    this.getName();
  },
  watch: {
    searched() {},
    data() {}
  }
});
