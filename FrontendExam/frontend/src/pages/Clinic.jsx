import React, { useEffect, useState } from 'react'
import { getAllClinicUser } from '../services/userService';

const Clinic = () => {
  const [clinicUser, setClinicUser] = useState([]);

  const fetchClinicUser = async () => {
    const clinicData = await getAllClinicUser();
    setClinicUser([...clinicUser,clinicData])
  }

  useEffect(() => {
    fetchClinicUser();
  }, [])

  return (
    <div>
      <div className='container my-3'>
        <div className='text-success'>
          <h1>My Clinic</h1>
        </div>
        <div>
      {
        clinicUser.map((elem) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{elem.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Clinic Code : {elem.code}</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
              <div><span><strong>Users : {elem.userCount}</strong></span>    <span><strong>Apoinments : {elem.appointmentCount}</strong></span></div>
            </div>
          </div>
        ))
      }
      </div>
      </div>
    </div>
  )
}

export default Clinic