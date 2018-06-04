import axios from "axios"

const state={
    items:null,
}

const getters={
    getItems:(state)=>{
        return state.items
    },
   
}

const mutations={
    setItems:(state,items)=>{
        state.items=items
    },
    
}

const actions={
    async getAllItems (context) {
      await  axios.get("http://localhost:9090/v1/titletype/getallmaintype")
          .then(response=>{
              const data=response.data.data
              console.log("the response data is:"+response.data.data)
              context.commit("setItems",  data)
          })
          .catch(error=>{
              console.log(error)
          })
      }
  }


  export default{
      state,
      getters,
      mutations,
      actions
  }