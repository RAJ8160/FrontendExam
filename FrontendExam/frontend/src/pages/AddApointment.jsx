import React, { useState } from 'react'
import { addPrescriptions } from '../services/doctorService';
import { useNavigate, useParams } from 'react-router-dom';

const AddApointment = () => {

  const { appointmentId } = useParams(); // ✅ dynamic ID
  const navigate = useNavigate();

  const [data, setData] = useState({
    medicines: [{ name: "", dosage: "", duration: "" }],
    notes: ""
  });

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...data.medicines];
    updated[index][field] = value;

    setData({ ...data, medicines: updated });
  };

  // Add medicine
  const addMedicine = () => {
    setData({
      ...data,
      medicines: [...data.medicines, { name: "", dosage: "", duration: "" }]
    });
  };

  // Remove medicine
  const removeMedicine = (index) => {
    const updated = data.medicines.filter((_, i) => i !== index);
    setData({ ...data, medicines: updated });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("DATA:", data);
    console.log("ID:", appointmentId);

    //  Check ID
    if (!appointmentId) {
      alert("Invalid Appointment ID ");
      return;
    }

    //  Validation
    for (let med of data.medicines) {
      if (!med.name || !med.dosage || !med.duration) {
        alert("Please fill all medicine fields ");
        return;
      }
    }

    try {
      const res = await addPrescriptions(data, appointmentId);

      if (!res) {
        alert("Failed to add prescription ");
        return;
      }

      alert("Prescription Added Successfully ");

      setData({
        medicines: [{ name: "", dosage: "", duration: "" }],
        notes: ""
      });

      navigate('/doctor-dashboard');

    } catch (err) {
      console.error(err);
      alert("Something went wrong ");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h3 className="mb-4 text-success">Add Prescription</h3>

        <form onSubmit={handleSubmit}>

          {data.medicines.map((med, index) => (
            <div className="row mb-3 align-items-end" key={index}>

              <div className="col-md-3">
                <label className="form-label">Medicine</label>
                <input
                  type="text"
                  className="form-control"
                  value={med.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Dosage</label>
                <input
                  type="text"
                  className="form-control"
                  value={med.dosage}
                  onChange={(e) =>
                    handleChange(index, "dosage", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  value={med.duration}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-danger mt-4"
                  onClick={() => removeMedicine(index)}
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            onClick={addMedicine}
          >
            + Add Medicine
          </button>

          <div className="mb-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              value={data.notes}
              onChange={(e) =>
                setData({ ...data, notes: e.target.value })
              }
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddApointment;