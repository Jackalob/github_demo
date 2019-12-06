Vue.component("userProfile",{
  template:`
    <div class='profile'>
      <div class='profile-pic'>
        <img :src='userData.avatar_url'></img>
      </div>
      <div class='profile-pack'>
        <div class='profile-nameset'>
          <div class='profile-name'>{{userData.name}}</div>
          <div class='profile-username'>{{userData.login}}</div>
        </div>
        <a class='profile-btn' target='_blank' :href='userData.html_url'>Overview</a>
      </div>
      <div class='profile-bio'>{{userData.bio}}</div>
    </div>
  `,
  props:{
    userData:{
      required:true
    }
  }
})
Vue.component("searchComponent", {
  template: `
    <div class='repo'>
      <div class='repo-wrap'>
        <a target='_blank' class='repo-title' :href='repoData.html_url'>{{repoData.name}}</a>
        <div class='repo-description'>{{repoData.description}}</div>
        <div class='repo-detail'>
          <span class='repo-lang' v-if='language'>
            <span class='repo-circle repo-img' :style='{backgroundColor: language}'></span>
            <span class='repo-text'>{{repoData.language}}</span>
          </span>
          <span class='repo-starNfork' v-if='repoData.stargazers_count>0'>
            <div class='repo-img repo-starNfork-img'>
              <svg class='repo-svg' aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
            </div>
            <span class='repo-text'>{{repoData.stargazers_count}}</span>
          </span>
          <span class='repo-starNfork' v-if='repoData.forks_count>0'>
            <div class='repo-img repo-starNfork-img'>
              <svg class='repo-svg' aria-label="fork" viewBox="0 0 10 16" version="1.1" width="10" height="16" role="img"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            </div>
            <span class='repo-text'>{{repoData.forks_count}}</span>
          </span>
          <span class='flex-space'></span>
          <span class='repo-time'>Updated {{update}}</span>
        </div>
      </div>
    </div>
  `,
  props: {
    repoData: {
      required: true
    }
  },
  data(){
    return{
      lang:{
        javascript: '#F1E05A',
        css: '#563D7C',
        html: '#E34C26',
        others: '#89e051'
      }
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
        return `on ${update.date} ${monthEng[update.month]} ${update.year}`
      }
      if((now.month-update.month)*30+ (now.date-update.date)>30){
        return `on ${update.date} ${monthEng[update.month]}`
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
    },
    language(){
      if(!this.repoData.language){
        return false
      }
      if(this.lang[this.repoData.language.toLowerCase()]){
        return this.lang[this.repoData.language.toLowerCase()]
      }
      return this.lang['others']
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
    userExistence: true,
    inputWidth: false,
    nowUserName: '',
    burgerClick: false,
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
          this.nowUserName = this.username
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
          this.nowUserName = this.username
        })
        .catch(err => {
          
        });
    },
  },
  beforeMount() {
    this.getName();
  },
  watch: {
    searched() {},
    userData() {},
    repoData() {},
    inputWidth(){}
  }
});
