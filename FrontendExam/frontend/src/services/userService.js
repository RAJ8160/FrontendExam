import { api } from "./api";

export const getAllUsers = async () =>{
    try {
        const response = await api.get('/admin/users')
    return response;
    } catch (error) {
        console.log("USer GetALL Error",error);
    } 
}
export const getAllClinicUser = async () =>{
    try {
        const response = await api.get('/admin/clinic')
    return response.data;
    } catch (error) {
        console.log("restaurants getAll Error",error);
    } 
}
export const createUser = async (user)=>{
    try {
        const response = await api.post('/admin/users',user)
        return response;
    } catch (error) {
        console.log("Error in Post User");
    }
}

// export const deleteUser = async (id) =>{
//     try {
//         const response = await api.delete(`//${id}`,{ headers: { Authorization: `Bearer ${authToken}` } })
//         return response;
//     } catch (error) {
//          console.log("Error in Delete User");
//     }
// }
// export const deleteRestarent= async (id) =>{
//     try {
//         const response = await api.delete(`/restaurants/${id}`,{ headers: { Authorization: `Bearer ${authToken}` } })
//         return response;
//     } catch (error) {
//          console.log("Error in Delete User");
//     }
// }
// export const editUser = async (id,user)=>{
//     try{
//         const response = await api.delete(`/users/${id}`,user,{ headers: { Authorization: `Bearer ${authToken}` } })
//         return response;
//     }catch(error){
//          console.log("Error in Delete User");
//     }
// }