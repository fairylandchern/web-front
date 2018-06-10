import axios from 'axios'

const state={
    issues:null,
    issuestatus:null,
    issueItem:{
        issue_title: null,
        type_id: null,
        issue_content: null,
        user_id:null
       },
    filterissues:null,
}

const getters={
    getissues:(state)=>{
        return state.issues
    },
    getissuestatus:(state)=>{
        return state.issuestatus
    },
    getissueitem:(state)=>{
        // if(issueItem ===null){
        //     const form=
        // console.log("issue item is 自定义")
        //        return form;
        // }
        // console.log("issue item is:未定义")
        return state.issueItem
    },
    getUserIssues:(state)=>{
        var user_id=JSON.parse(localStorage.getItem("uinfo")).id;
        console.log("user id is:",user_id)
        console.log("issue is",state.issues)
        var temps=state.issues.filter(issueitem=>{
            return issueitem.user_id===user_id
        })
        console.log("临时数据为:",temps)
        return temps
    }
}

const mutations={
    setissues:(state,issues)=>{
        state.issues=issues
        state.filterissues=issues
    },
    setissuetatus:(state,status)=>{
        state.issuestatus=status
    },
    setissueItem:(state,item)=>{
        state.issueItem=item
    },
    filterissues:(state,type_id)=>{
        console.log("type id is:",type_id)
        if (type_id===0) {
            state.issues=state.filterissues
            console.log("state issue is:",state.issues)
        }else{
            state.issues=state.filterissues.filter(issueitem=>{
                return issueitem.type_id===type_id
            })
        }
    },
    clearissueItem:(state)=>{
        state.issueItem= {
            issue_title: null,
            type_id: null,
            issue_content: null,
            user_id:null
           }
    }
}

const actions={
    async pushIssue({commit},issue){
        await axios.post("http://localhost:9090/v1/issue/create",issue)
            .then(response=>{
                console.log(response.data)
                if (response.data.status===200){
                   commit("setissuetatus",true)
                   console.log("设置状态",true)
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
            console.log(response.data)
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
            console.log(response.data)
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
                console.log(response.data)
                if(response.data.status===200){
                    commit("setissuetatus",true)
                }else{
                    commit("setissuetatus",false)
                }
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}