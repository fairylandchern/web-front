import axios from "axios"

const state={
    userdetail:[],
    status:null
}

const getters={
    getUserInfo:(state)=>{
        if(!state.userdetail){
            return localStorage.getItem("uinfo")
        }
        return state.userdetail
    },
    getUserStatus:(state)=>{
        return state.status
    }
}

const mutations={
    setuserInfo:(state,uinfo)=>{
        state.user=uinfo
        localStorage.setItem("uinfo",JSON.stringify(uinfo))
    },
    setUserStatus:(state,status)=>{
        state.status=status
    }
}


const actions={
    async register({commit},uinfo){
        var flag=false
        
        await axios.post("http://localhost:9090/v1/user/register",{
            phone:uinfo.phone,
            nickname:uinfo.name,
            password:uinfo.passwd
        })
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
        return flag
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}

