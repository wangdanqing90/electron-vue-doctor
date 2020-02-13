//封装axios

import axios from 'axios'; // 引入axios
import router from '@/router'
import { MessageBox, Message } from 'element-ui'

// 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'http://testapi.gvrbox.com';} 
// else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = 'http://testapi.gvrbox.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'http://testapi.gvrbox.com';
// }

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


import store from '@/store';

// 请求拦截器
axios.interceptors.request.use(    
    config => {        
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;        
        token && (config.headers.Authorization = 'Bearer '+token);       
        return config;    
    },    
    error => {        
        return Promise.error(error);    
})



// 响应拦截器
axios.interceptors.response.use(    
    response => {   
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据 ,否则的话抛出错误
        if (response.status === 200) {            
            return Promise.resolve(response);        
        } else {            
            return Promise.reject(response);        
        }    
    },    
    // 服务器状态码不是2开头的的情况 这里可以跟你们的后台开发人员协商好统一的错误状态码,然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    error => {            
        if (error.response.status) {            
            switch (error.response.status) {                
                // 401未登录或者token过期,清空vuex中token对象 跳转登录页面                
                case 401:
                    alert('未登录或者登录过期，请重新登录')                
                    // 清除token
                    store.commit('clearToken')
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            // query: { 
                            //     redirect: router.currentRoute.fullPath 
                            // }                        
                        });                    
                    }, 1000);                    
                    break; 

                // 404请求不存在
                case 404:
                    alert('网络请求不存在')
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    if(error.response.data.message){alert(error.response.data.message)}
                     
                     else{
                        alert("网络请求不存在")
                     }
            }
            return Promise.reject(error.response);
        } 
});

//get方法：get函数有两个参数，第一个参数表示我们要请求的url地址，第二个参数是我们要携带的请求参数。get函数返回一个promise对象，当axios其请求成功时resolve服务器返回 值，请求失败时reject错误值。最后通过export抛出get函数。
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){  
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) { 
    return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(
            err =>{
            reject(err.data)
        })
    });
}

/** 
 * put方法，对应put请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function put(url, params) { 
    return new Promise((resolve, reject) => {
         axios.put(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(
            err =>{
            reject(err.data)
        })
    });
}

/** 
 * delete方法，对应delete请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function deletefun(url, params) { 
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            data: params,})
        .then(res => {
            resolve(res.data);
        })
        .catch(
            err =>{
            reject(err.data)
        })
    });
}

