import { api } from "./api";

export const getAllUsers = async () =>{
    try {
        const response = await api.get('/doctor/queue')
    return response;
    } catch (error) {
        console.log("USer GetALL Error",error);
    } 
}

export const addPrescriptions = async (data,appointmentId) =>{
    try {
        const response = await api.post(`/prescriptions/${appointmentId}`,data)
    return response;
    } catch (error) {
        console.log("Error In Post In prescription :",error);
    } 
}