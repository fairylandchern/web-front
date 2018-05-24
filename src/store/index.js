import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)
var types=[{"name":"chen","id":1},{"name":"yao","id":2},{"name":"hhhh","id":3}]
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
       getAllItems (context) {
        //   axios.get("http://localhost:9090/v1/titletype/getallmaintype")
        //     .then(response=>{
        //         commit("setItems",  response)
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
        context.commit('setItems',types)
        }
    }
})