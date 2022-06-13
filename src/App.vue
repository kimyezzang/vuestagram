<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step==1" @click="step++;">Next</li>
      <li v-if="step==2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <!-- <p>{{name}} {{age}} {{likes}}</p>


  <h4>안녕 {{ $store.state.name}}</h4>
  <h4>나이 {{ $store.state.age}}</h4>  
  
  <button @click="$store.commit('changeName')">버튼</button>
  <button @click="$store.commit('plusAge')">나이 증가 버튼</button> -->

  <!-- <p>{{ $store.state.more}}</p>

  <button @click="$store.dispatch('getData')">더보기버튼</button> -->

  <Container @write="writeText=$event" :Data="Data" :step="step" :a="a" @stepOg="step=0;"/>

  <div v-if="step == 0">
   <button @click="more" style="margin-right:10px;">더보기</button>

   <button @click="searchBtn">검색</button>

  </div>
   
  

  <!-- <p>{{now()}}  {{counter}}</p>
  <button @click="counter++">버튼</button> -->



  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  

</template>

<script>
import Container from './components/Container.vue'
import data from './components/data.js'
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'

export default {
  name: "App",
  data(){
    return{
      writeText: '',
      step: 0 ,
      Data : data,
      add : 0,
      a : 'a',
      selectedFilter : '',
      counter: 0,
    }
  },
  mounted(){
    this.emitter.on('filter',(a)=>{
      this.emitter.emit('filter2',a);
    });
    this.emitter.on('boxClick',(a)=>{
      this.selectedFilter = a
      console.log('App.vue : ' + this.selectedFilter)
    });
  },
  components: {
    Container: Container,
  },

  computed: {
    name(){
      return this.$store.state.name
    },
    ...mapState(['name','age','likes']),
    ...mapState({ 작명 : 'name'})
  },

  methods:{
    ...mapMutations(['setMore', '좋아요','']),

    
    now(){
      return new Date()
    },
    publish(){
      var myContent = {
          name: "Kim Hyun",
          userImage: "https://placeimg.com/100/100/arch",
          postImage: this.a,
          likes: 36,
          date: "May 15",
          liked: false,
          content: this.writeText,
          filter: this.selectedFilter
      };
      this.Data.unshift(myContent);
      this.step = 0;
    },
    more(){
      axios.get(`https://codingapple1.github.io/vue/more${this.add}.json`)
      .then(result =>{ // result는 작명임 data 등 다르게 써도됨
          console.log(result.data);
          this.Data.push(result.data);
          this.add++;
      }) // 성공하면
    },
    upload(e){  // event를 뜻함
      let a =  e.target.files;
      console.log(a[0].type);
      this.a = URL.createObjectURL(a[0]);
      this.step++;
    },
    searchBtn() {
      this.step = 3;
    },

  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
