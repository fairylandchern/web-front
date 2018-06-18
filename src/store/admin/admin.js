import axios from "axios"

const state={
    admindetail:null,
    adminstatus:null,
    adminstatus:null
}

const getters={
    getadminInfo:(state)=>{
        if(!state.admindetail){
            return  JSON.parse(localStorage.getItem("admininfo"))
        }
        return state.admindetail
    },
    getadminStatus:(state)=>{
        return state.adminstatus
    },
    getadminLoginStatus:(state)=>{
        return state.adminstatus
    }
}

const mutations={
    setAdminInfo:(state,uinfo)=>{
        state.admin=uinfo
        localStorage.setItem("admininfo",JSON.stringify(uinfo))
    },
    setAdminStatus:(state,status)=>{
        state.status=status
    },
    setAdminLoginStatus:(state,status)=>{
        state.adminstatus=status
    },
    clearAdminInfo:(state)=>{
        localStorage.removeItem("admininfo")
        state.adminstatus=false
    }
}


const actions={
    async adminlogin({commit},uinfo){
        var flag=false
        await axios.post("http://localhost:9090/v1/admin/login",uinfo)
            .then(response=>{
                const status=response.data.status
                const retuinfo=response.data.data
                console.log("the response status is:",status,retuinfo)
                if (status===200){
                    flag=true
                }
                console.log("the response flag is:",flag)
                commit("setAdminLoginStatus",flag)
                commit("setAdminInfo",retuinfo)
            })
            .catch(error=>{
                console.log(error)
            })
    },
    adminlogout({commit}){
        commit("clearAdminInfo")
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}

