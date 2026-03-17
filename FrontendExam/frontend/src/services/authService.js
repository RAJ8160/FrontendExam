import { api } from "./api.js";

export const loginService = async (data) => {
    const response = await api.post("/auth/login", data);

    console.log("Axios response:", response);
    // console.log("Response data:", response.data);
    // console.log("Token : ", response.data.data.token);

    // Destructure payload : and get information about user data use for token generate : 
    if (!response.data.error) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        // localStorage.setItem("token", response.data.data.token);
        // console.log("userData in authService = ", userData);

        // atob : ascii to binary : 
        // convert json data to string for store inside the local storage : 
        // localStorage.setItem("user", JSON.stringify(atob(response.data.data.token.split(".")[1])));

        // Decode JWT payload properly
        const payload = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("user", JSON.stringify(payload));
        
    }
    return response.data;
};

export const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("user");
}


export const getUserData = () => {
    // when we get data from the local storage then convert string to json : 
    return JSON.parse(localStorage.getItem("user"));
}

export const getToken = () => {
    return localStorage.getItem("token");
}