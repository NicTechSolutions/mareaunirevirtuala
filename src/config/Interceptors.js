import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// add token on request
axios.interceptors.request.use(
    req => {

        req.headers.authorization = "Bearer " + cookies.get("token");
        return req;
    },
    error => Promise.reject(error));