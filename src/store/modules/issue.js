import axios from 'axios'

const state={
    issues:[],
    issuestatus:null,
    issueItem:null
}

const getters={
    getissues:(state)=>{
        return state.issues
    },
    getstatus:(state)=>{
        return state.issuestatus
    },
    getitem:(state)=>{
        return state.issueItem
    }
}

const mutations={
    setissues:(state,issues)=>{
        state.issues=issues
    },
    setissuetatus:(state,status)=>{
        state.issuestatus=status
    },
    setissueItem:(state,item)=>{
        state.issueItem=item
    }
}

const actions={
    async pushIssue({commit},issue){
        await axios.post("http://localhost:9090/v1/issue/create",issue)
            .then(response=>{
                if (response.data.status===200){
                   commit("setissuetatus",true)
                }else{
                    commit("setissuetatus",false)
                }
            })
            .catch(error=>{
                console.log(error)
            })
    },
    async getIssues({commit}){
        await axios.get("http://localhost:9090/v1/issue/querybasic")
        .then(response=>{
            var issues;
            if (response.data.status===200){
                issues=response.data.data
                commit("setissues",issues)
                console.log("the isssues response is:",response)
            }else{
                commit("setissuetatus",false)
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },
    async getIssueByIssueId({commit},issueid){
        await axios.post("http://localhost:9090/v1/issue/querydetail",issueid)
        .then(response=>{
            var issue;
            if(response.data.status===200){
                issue=response.data.data
                commit("setissueItem",issue)
                commit("setissuetatus",true)
            }else{
                commit("setissuetatus",false)
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },
    async deleteIssueById({commit},issueid){
        await axios.post("http://localhost:9090/v1/issue/delete",issueid)
            .then(response=>{
                if(response.data.status===200){
                    commit("setissuetatus",true)
                }else{
                    commit("setissuetatus",false)
                }
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}