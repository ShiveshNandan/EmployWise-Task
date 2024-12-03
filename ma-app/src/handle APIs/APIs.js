import axios from "axios"

const endpoint = "https://reqres.in";

// const Login = (email,password) => {
const Login = async (email,password) => {
    try {
        const response = await axios.post(`${endpoint}/api/login`,
                {
                    email : email ,
                    password : password
                });
                return response;
    } catch (error) {
        throw error;
    }
}

const UsersList = async (CurrentPage) => {
    try {
        const response = await axios.get(`${endpoint}/api/users?page=${CurrentPage}`);
                return response.data;
    } catch (error) {
        throw error;
    }
}

export {Login , UsersList}