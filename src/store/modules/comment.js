import axios from 'axios'

const state={
    commentstatus:null,
    commentItem:null,
    commentitems:[]
}

const getters={

}

const mutations={
    setcommentStatus:(state,status)=>{
        state.commentstatus=status
    },
    setcommentItems:(state,items)=>{
        state.commentitems=items
    },
    setcommentitem:(state,item)=>{
        state.commentItem=item
    }
}

const actions={
    async createComment({commit},comment){
        await axios.post("http://localhost:9090/v1/issue_comment/create",comment)
            .then(Response=>{
                if(Response.data.status===200){
                    commit("setcommentStatus",true)
                }else{
                    commit("setcommentStatus",false)
                }
            })
            .catch(error=>{
                console.log("error is",error)
            })
            
    },
    async updatecomment({commit},comment){
        await axios.post("http://localhost:9090/v1/issue_comment/update",comment)
        .then(Response=>{
            if(Response.data.status===200){
                commit("setcommentStatus",true)
                commit("setcommentitem",Response.data.data)
            }else{
                commit("setcommentStatus",false)
            }
        })
        .catch(error=>{
            console.log("error is",error)
        })
    },
    async queryallbyid({commit},id){
        await axios.get("http://localhost:9090/v1/issue_comment/querybyissue/",id)
        .then(Response=>{
            if(Response.data.status===200){
                commit("setcommentStatus",true)
                commit("setcommentItems",Response.data.data)
            }else{
                commit("setcommentStatus",false)
            }
        })
        .catch(error=>{
            console.log("error is",error)
        })
    },
    async deletecomment({commit},comment_id){
        await axios.post("http://localhost:9090/v1/issue_comment/delete",comment_id)
        .then(Response=>{
            if(Response.data.status===200){
                commit("setcommentStatus",true)
            }else{
                commit("setcommentStatus",false)
            }
        })
        .catch(error=>{
            console.log("error is",error)
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}