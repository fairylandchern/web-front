import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        items:[{"name":"chen","id":1},{"name":"yao","id":2},{"name":"hhhh","id":3}]
    },
    getters:{
        getItems:state=>{
            return state.items
        }
    },
    mutations:{

    },
    actions:{

    }
})