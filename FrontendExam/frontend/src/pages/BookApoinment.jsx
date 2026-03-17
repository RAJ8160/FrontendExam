import React, { useState } from 'react'
import { createAppoinment } from '../services/patientService';
import { useNavigate } from 'react-router-dom';

const BookApoinment = () => {
  const [formData, setFormData] = useState({appointmentDate: "",
  timeSlot:""})
  const [error,setError] = useState(null);
const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.appointmentDate || !formData.timeSlot) {
    const msg = "Please enter Appointment Date & Time Slot.";
    setError(msg);
    alert(msg);
    return;
  }

  try {
    console.log("Sending:", formData);

    const res = await createAppoinment(formData);
    console.log("Response:", res);

    setFormData({
      appointmentDate: "",
      timeSlot: ""
    });

    alert("Appointment Submitted Successfully!");
    navigate('/myreport');

  } catch (err) {
    console.error("API Error:", err.response || err);
    alert(err.response?.data?.message || "Appointment failed ❌");
  }
};
  return (
    <div className='container p-3'>
      <div className='border rounded-2 p-4'>
       <div className='row'>
      <h1 className='text-success'>Book Apoinment</h1>
      </div>
      <div className='row'>
      <form className="row g-3 " onSubmit={handleSubmit}>
        <div className='row'>
           <div className="col-md-12">
              <label htmlFor="inputPassword4" className="form-label">Date</label>
              <input type="date" className="form-control" id="inputPassword4" value={formData.appointmentDate} onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })} />
            </div>
          <div className="col-md-12">
          <label htmlFor="inputState" className="form-label">Time Slote</label>

          <select
            id="inputState"
            className="form-select"
            value={formData.timeSlot || ""}
            onChange={(e) =>
              setFormData({ ...formData, timeSlot: e.target.value })
            }
          >
            <option value="">Choose...</option>
            <option value="9:00-9:15">9:00-9:15</option>
            <option value="9:15-9:30">9:15-9:30</option>
            <option value="9:30-10:45">9:30-10:45</option>
            <option value="10:45-11:00">10:45-11:00</option>
            <option value="11:00-11:15">11:00-11:15</option>
            <option value="11:15-11:30">11:15-11:30</option>
            <option value="11:30-11:45">11:30-11:45</option>
            <option value="11:45-12:00">11:45-12:00</option>
          </select>
          </div>
          <div className="col-12 mt-2">
            <button type="submit" className="btn btn-success">Book Apoinment</button>
          </div>
        </div>
      </form>
      </div>
      </div>
    </div>
  )
}

export default BookApoinment