import axios from "axios";

// const baseURL = "http://laraveladminbagisto.test/api/"
const baseURL = "http://13.212.84.135/api/"
let headers = {
    'Content-Type': 'application/json',//dữ liệu gửi đi dạng json
}
const instance = axios.create({
    baseURL: baseURL,
    headers
});

instance.interceptors.request.use(function (config) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.response.status === 401) {
        if (!error.response.data) {
            localStorage.removeItem('auth');
            window.location.replace("/?visibleLogin=true");// chuyền về login page
        }

        const auth = JSON.parse(localStorage.getItem('auth'));

        if (!auth?.token) {
            window.location.replace("/?visibleLogin=true")
        }
        else {
            //refresh token
            axios({
                url: baseURL + 'auth/refresh',
                method: "post",
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            }).then(res => {

                if (res.status === 200) {
                    const authRe = { ...auth, token: res.data.access_token }
                    localStorage.setItem('auth', JSON.stringify(authRe));
                }

            }).catch(err => {
                // trường hợp vào exception,ko thể refresh
                if (err.response.status === 400) {
                    localStorage.removeItem('auth');
                    window.location.replace("/?visibleLogin=true");
                }

            });
        }
    }
    if (error.response.status === 404) {
        //nếu gõ đường dẫn và enter sẽ dẫn tới trường hợp router.query là undefined
        window.location.replace("/");// chuyền về login page
    }
    if (!error.response) {
        return Promise.reject(error);
    }
});
export default instance