import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getApoinment } from '../services/patientService';

const AppoinmentDetails = () => {
    const {id} = useParams();
    const [appoinment,setAppoinment] = useState({
        appointmentDate: "",
  timeSlot:""
    })
    const getAppointment = async()=>{
        console.log(id);
    const appoint = await getApoinment(id);
    setAppoinment(appoint.data);
    }
    useEffect(()=>{
        getAppointment();
    },[])
  return (
    <div className='container my-3'>
        <h1>Appointment of id - {appoinment.appointmentDate}</h1>

   <div class="card" >
  <div class="card-body">
    <h5 class="card-title">AppoinmentDate: {appoinment.appointmentDate}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Time Slote : {appoinment.timeSlot}</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <h6 class="card-subtitle mb-2 text-body-secondary">Status :{appoinment.status}</h6>
  </div>
</div></div>
  )
}

export default AppoinmentDetails