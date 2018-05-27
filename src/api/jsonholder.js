
import request from '../utils/request'
const urlhead="http://localhost:9090/v1/"
export async function getCompanyList (url,method) {
  return await request(urlhead+url,{
    method:"get"
  })
}

export async function getTalkList (url,method) {
  return await request()
}
