Vue.component("searchComponent", {
  template: `
    <div class='repo'>
      <div>{{repoData.name}}</div>
      <div>Updated on {{update}}</div>
    </div>
  `,
  props: {
    repoData: {
      required: true
    }
  },
  computed:{
    update(){
      let nowTime = new Date()
      let monthEng = {
        1:'Jan',
        2:'Feb',
        3:'Mar',
        4:'Apr',
        5:'May',
        6:'Jun',
        7:'Jul',
        8:'Aug',
        9:'Sep',
        10:'Oct',
        11:'Nov',
        12:'Dec'
      }
      let now = {
        year: nowTime.getFullYear(),
        month: nowTime.getMonth()+1 ,
        date: nowTime.getDate(),
        hour: nowTime.getHours()
      }
      let update = {
        year: parseInt(this.repoData.updated_at.slice(0,4)),
        month: parseInt(this.repoData.updated_at.slice(5,7)),
        date: parseInt(this.repoData.updated_at.slice(8,10)),
        hour: parseInt(this.repoData.updated_at.slice(11,13))
      }
      if(update.year !== now.year){
        return `${update.date} ${monthEng[update.month]} ${update.year}`
      }
      if((now.month-update.month)*30+ (now.date-update.date)>30){
        return `${update.date} ${monthEng[update.month]}`
      }
      if(((now.month-update.month)*30+ (now.date-update.date))*24 + (now.hour-update.hour)>48){
        return `${(now.month-update.month)*30+ (now.date-update.date)} days ago`
      }
      else if(((now.month-update.month)*30+ (now.date-update.date))*24 + (now.hour-update.hour)>24){
        return 'yesterday'
      }
      else{
        return Math.abs(now.hour - update.hour) + 'hours ago'
      }
    },
    updateTime(){
      let update = {
        year: parseInt(this.repoData.updated_at.slice(0,4)),
        month: parseInt(this.repoData.updated_at.slice(5,7)),
        date: parseInt(this.repoData.updated_at.slice(8,10)),
        hour: parseInt(this.repoData.updated_at.slice(11,13))
      }
      return update
    }
  }
});

new Vue({
  el: "#app",
  data: {
    loading: false,
    username: "jackalob",
    userData: [],
    repoData: [],
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
      this.loading = false;
      axios
        .get(`https://api.github.com/users/${this.username}`)
        .then(res => {
          this.addToSearched();
          this.userData = res.data
          console.log(res.data);
          this.getRepos();
        })
        .catch(err => {
          this.userData = [];
          this.repoData = [];
          this.userExistence = false;
          this.loading = true;
        });
    },
    getRepos() {
      axios
        .get(`https://api.github.com/users/${this.username}/repos`)
        .then(res => {
          console.log(res.data);
          this.repoData = res.data;
          this.userExistence = true;
          this.loading = true;
        })
        .catch(err => {
          
        });
    }
  },
  beforeMount() {
    this.getName();
  },
  watch: {
    searched() {},
    userData() {},
    repoData() {}
  }
});
