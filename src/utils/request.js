import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // TODO: 添加token
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
})

instance.interceptors.response.use(response => {
  const res = response.data
  
  // error handler
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 3 * 1000
    })

    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 50008 || res.code === 500012 || res.code === 50014) {
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or login in again', 
      'Confirm logout', {
        confirmButtonText: 'Re-login',
        cancelButtonText: 'Cancel',
        type: 'waring',
      }).then(() => {
        // TODO: redirect to login page
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, error => {
  console.log('Response error', error)
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
})

export default instance