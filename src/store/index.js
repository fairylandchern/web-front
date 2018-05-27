import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import titletype from "./modules/titletype"
import user from "./modules/user"

Vue.use(Vuex)

export default new Vuex.Store({
   modules:{
    titletype,
    user
   }
})
