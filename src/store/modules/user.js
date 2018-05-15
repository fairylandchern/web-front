import * as jsonservices from "../../api/jsonholder"

const state = {
    userlist:[],
    userdetail:[],
};

//getters
const getters={
    alluser:state=>state.userlist,
    userdetail:state=>state.userdetail,
};

