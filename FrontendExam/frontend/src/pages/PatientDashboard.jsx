import React from 'react'
import { Link } from 'react-router-dom'

const PatientDashboard = () => {
  return (
    <div className='container'>
      <div className='row'>
      <h1 className='text-success'>Patient Dashboard</h1>
      </div>
      <div className='row'>
      <div class="card">
  <div class="card-body">
    <h5 class="card-title">Welcome</h5>
    <p class="card-text">Use this menu to book apoinments,view appoinment ,prescriptions,or medical reports.</p>
   <div className='d-flex gap-2 '>
    <Link to='/bookReport'><button className='btn btn-success'>Book Apoinment</button></Link>
     <Link to='/myreport'><button className='btn btn-light'>My Apoinments</button></Link>
    <button className='btn btn-light'>My Prescriptions</button>
    <button className='btn btn-light'>My Reports</button>
   </div>
   </div>
  </div>
</div>
</div>
  )
}

export default PatientDashboard