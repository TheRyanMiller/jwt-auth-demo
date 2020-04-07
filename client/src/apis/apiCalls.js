import axios from 'axios';


let restApi = axios.create({
    baseURL: "http://localhost:3600",//process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: { Authorization: `Bearer ${token}` }
});
   
restApi.interceptors.request.use(config => {
    console.log("REQUEST SENT");
    let token = localStorage.getItem("jwt-access-token");
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config
})

restApi.interceptors.response.use((response) => {
    return response
}, 
(error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return axios.post('/auth/token',
            {
              "refresh_token": localStorage.getItem("jwt-refresh-token")
            })
            .then(res => {
                if (res.status === 201) {
                    // 1) put token to LocalStorage
                    localStorageService.setToken(res.data);
 
                    // 2) Change Authorization header
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
 
                    // 3) return originalRequest object with Axios.
                    return axios(originalRequest);
                }
            })
    }


export { restApi };