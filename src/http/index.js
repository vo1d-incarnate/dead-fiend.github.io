import axios from "axios";
const base_url = process.env.REACT_APP_API_URL
//const base_url = `http://${process.env.HOST}:${process.env.PORT}/`
//const base_url = `https://frstshop.herokuapp.com/`
const $host = axios.create({
    baseURL: base_url
})

const $authHost = axios.create({
    baseURL: base_url
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}