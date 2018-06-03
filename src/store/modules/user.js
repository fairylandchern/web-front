import axios from "axios"

const state={
    userdetail:null,
    status:null,
    loginstatus:null
}

const getters={
    getUserInfo:(state)=>{
        if(!state.userdetail){
            return  JSON.parse(localStorage.getItem("uinfo"))
        }
        return state.userdetail
    },
    getUserStatus:(state)=>{
        return state.status
    },
    getUserLoginStatus:(state)=>{
        return state.loginstatus
    }
}

const mutations={
    setUserInfo:(state,uinfo)=>{
        state.user=uinfo
        localStorage.setItem("uinfo",JSON.stringify(uinfo))
    },
    setUserStatus:(state,status)=>{
        state.status=status
    },
    setUserLoginStatus:(state,status)=>{
        state.loginstatus=status
    },
    clearUserInfo:(state)=>{
        localStorage.removeItem("uinfo")
        state.loginstatus=false
    }
}


const actions={
    async register({commit},uinfo){
        var flag=false
        await axios.post("http://localhost:9090/v1/user/register",uinfo)
            .then(response=>{
                const status=response.data.status
               
                console.log("the response status is:",status)
                if (status===200){
                    flag=true
                }
                console.log("the response flag is:",flag)
                commit("setUserStatus",flag)
            })
            .catch(error=>{
                console.log(error)
            })
    },
    async login({commit},uinfo){
        var flag=false
        await axios.post("http://localhost:9090/v1/user/login",uinfo)
            .then(response=>{
                const status=response.data.status
                const retuinfo=response.data.data
                console.log("the response status is:",status,retuinfo)
                if (status===200){
                    flag=true
                }
                console.log("the response flag is:",flag)
                commit("setUserLoginStatus",flag)
                commit("setUserInfo",retuinfo)
            })
            .catch(error=>{
                console.log(error)
            })
    },
    logout({commit}){
        commit("clearUserInfo")
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}

