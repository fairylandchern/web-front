import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        items:[]
    },
    getters:{
        getItems:(state)=>{
            return state.items
        }
    },
    mutations:{
        setItems:(state,items)=>{
            state.items=items
        }
    },
    actions:{
      async getAllItems (context) {
        await  axios.get("http://localhost:9090/v1/titletype/getallmaintype")
            .then(response=>{
                const data=response.data.data
                console.log("the response data is:"+response.data.data)
                context.commit("setItems",  data)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
})