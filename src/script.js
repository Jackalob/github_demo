new Vue({
  el:'#app',
  data:{
    status: true
  }
})


axios.get('https://api.github.com/users/solomonxie')
.then(res=>{
  console.log(res.data)
})
.catch(err=>{
  console.log(err)
})