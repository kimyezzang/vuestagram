import axios from 'axios';
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name : 'kim',
      age : 20,
      likes : 30,
      likeState: false,
      more : {},
    }
  },
  mutations :{
    setMore(state, data){
      state.more = data
    },
    like(state){
      if(state.likeState == false){
        state.likes++;
        state.likeState = true;
      } else{
        state.likes--;
        state.likeState = false;
      }
    
    },
    changeName(state) {
      state.name = 'park'
    },
    plusAge(state){
      state.age++;
    },
  },
  actions : {
    getData(context){
      axios.get('https://codingapple1.github.io/vue/more0.json')
      .then((a)=>{
        console.log(a.data)
        context.commit('setMore', a.data)
      })
    },
  },
})

export default store