import axios from 'axios';
import { Notification, Message } from 'antd';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

// 跨域设置
//axios.defaults.withCredentials = true;

// 默认超时设置
axios.defaults.timeout = 30000;

// 相对路径设置
axios.defaults.baseURL = 'http://localhost:8090/';
   

//http request 拦截器
axios.interceptors.request.use(
    // config => {
    //     // 获取token
    //     const token = localStorage.getItem('cc_token');
    //     // 设置参数格式
    //     if (!config.headers['Content-Type']) {
    //         config.headers = {
    //             'Content-Type': 'application/json',
    //         };
    //     }
    //     // 添加token到headers
    //     if (token) {
    //         config.headers.token = token
    //     }
    //     // 鉴权参数设置
    //     if (config.method === 'get') {
    //         //get请求下 参数在params中，其他请求在data中

    //         config.params = config.params || {};
    //         let json = JSON.parse(JSON.stringify(config.params));
    //         //console.log(config)
    //         //一些参数处理
    //     } else {
    //         config.data = config.data || {};
    //         //一些参数处理
    //     }
    //     return config;
    // },
    // err => {
    //     return Promise.reject(err);
    // }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        const { data } = response
        console.log(response)
        //服务端操作正常状态码
        if (data.status === 'success') {
            return response;
        } else {
            //强制登录
            // if (data.status === 10) {
            //     return data
            // }
            Message.error(data.errMsg)
            return data;
        }
    },
    err => {
        const response = err.response;
        const errortext = codeMessage[response.status] || response.statusText;
        Notification.error({
            title: `请求错误:${response.config.url}`,
            message: errortext,
            position: 'bottom-right'
        });
        const error = new Error(errortext);
        error.name = response.status;
        error.response = response;
        throw error;
    }
);


function checkStstus(response, resolve) {
    if (response.status >= 200 && response.status < 300) {
        resolve(response.data);
    }
}

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            checkStstus(response, resolve)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            checkStstus(response, resolve)
        }, err => {
            reject(err);
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                checkStstus(response, resolve)
            }, err => {
                reject(err);
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                checkStstus(response, resolve)
            }, err => {
                reject(err);
            })
    })
}

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data)
            .then(response => {
                checkStstus(response, resolve)
            }, err => {
                reject(err);
            })
    })
}

