import { api } from "./api";

export const createAppoinment = async (appoinment)=>{
    try {
        const {data} = await api.post('/appointments',appoinment)
        return response;
    } catch (error) {
        console.log("Error in Post Apoinment");
        return error;
    }
}

export const getAllApoinment = async ()=>{
    try {
        const response = await api.get('/appointments/my')
        return response;
    } catch (error) {
        console.log("Error in get Apponiments");
         return error;
    }
}

export const getApoinment = async (id)=>{
    try {
        const response = await api.get(`/appointments/${id}`)
        return response;
    } catch (error) {
        console.log("Error in get Apponiment");
         return error;
    }
}

export const myPrescriptions = async ()=>{
    try {
        const response = await api.get(`/prescriptions/my`)
        return response;
    } catch (error) {
        console.log("Error in get Apponiment");
         return error;
    }
}