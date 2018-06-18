import Vue from "vue"
import Vuex from "vuex"
import titletype from "./modules/titletype"
import user from "./modules/user"
import issue from "./modules/issue"
import comment from './modules/comment'
import admin from './admin/admin'

Vue.use(Vuex)

export default new Vuex.Store({
   modules:{
    titletype,
    user,
    issue,
    comment,
    admin
   }
})
