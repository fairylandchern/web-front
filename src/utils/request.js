import axios from 'axios'
import Promise from 'es6-promise'

if (!window.promise) {
  window.promise = Promise
}

function checkStatus (response) {
  if (response.status >= 200 & response.status < 300) {
    return response
  }
  const err = new Error(response.statusText)
  err.response = response
  throw err
}

export default function request (url, options) {
  let headers = {}
  if (options && options.method !== 'GET') {
    headers = {
      'content-type': 'application/json',
    }
  }
  return axios(url, {...options, headers, withCredentials: true})
    .then(checkStatus)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
