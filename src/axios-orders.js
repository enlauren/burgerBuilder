import axios from "axios"

const instance = axios.create({
    baseURL: "https://reactburger-dd619.firebaseio.com/"
})

export default instance;