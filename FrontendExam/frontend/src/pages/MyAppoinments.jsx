import React, { useState } from 'react'
import { getAllApoinment } from '../services/patientService';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyAppoinments = () => {
  const[appoinments,setAppoinment] = useState([]);
  const getAppoinments = async () => {
      const data = await getAllApoinment();
      setAppoinment(data.data)
    }
  
    useEffect(() => {
      getAppoinments();
    }, [])
      console.log(appoinments)
  return (
    <div className='container my-3'>
      <div className='text-success'>
       <h2> My Appoinments</h2>
      </div>
     <div className='container p-4 border rounded-2'>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Token</th>
            <th scope='col'>Status</th>
             <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            appoinments.map((elem) => (
              <tr>
                <th scope="row">{elem.id}</th>
                <td>{elem.appointmentDate}</td>
                <td>{elem.timeSlot}</td>
                <td>{elem.queueEntry.tokenNumber}</td>
                <td>{elem.status}</td>
                <td><Link to={`/showreport/${elem.id}`}><button className='btn btn-success'>Midecience or Report</button></Link></td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div></div>
  )
}

export default MyAppoinments