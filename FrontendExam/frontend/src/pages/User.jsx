import React, { useEffect, useState } from 'react'
import { getAllUsers, createUser } from '../services/userService'
import { useNavigate } from 'react-router-dom';
const User = () => {
  const [user, setUser] = useState([]);
  const [error,setError] = useState(null)
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: ""
  })
  const getUsers = async () => {
    const data = await getAllUsers()
    setUser(data.data)
  }

  useEffect(() => {
    getUsers();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!formData.name || !formData.email || !formData.password || !formData.role ){
      const msg = "Please Enter Name , Email, Password, Role Properly. These All are mendetory fields.";
       setError(msg);
       alert(msg);
       return;
    }
    const res = await createUser(formData);
    getUsers();
    // console.log(res)
    setFromData({
      name: "",
      email: "",
      password: "",
      role: "",
      phone: ""
    })
    alert("Data Submitted Successfully!");
    navigate('/users')
  }

  return (
    <div className='container my-4 '>
      <div className='p-4 border rounded-2 mb-2'>
        <div className='m-2'>
        <div className='row'>
        <h4>Add receptionist , doctors and patients.</h4>
        <p>Create user in your clinic.They will sign in with email and password you set (not register require).</p>
        </div>
        <div className='row'>
          <form className="row g-3" onSubmit={(e)=>handleSubmit(e)}>
          <div className='row'>
            <div className="col-3">
              <label htmlFor="inputAddress" className="form-label">Name</label>
              <input type="text" className="form-control" id="inputAddress" value={formData.name} placeholder="Atleast Three Characters." onChange={(e) => setFromData({ ...formData, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" value={formData.email} onChange={(e) => setFromData({ ...formData, email: e.target.value })} />
            </div>
          </div>
          <div className='row'>
            <div className="col-md-3">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" className="form-control" id="inputPassword4" value={formData.password} onChange={(e) => setFromData({ ...formData, password: e.target.value })} />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">State</label>

              <select
                id="inputState"
                className="form-select"
                value={formData.role || ""}
                onChange={(e) =>
                  setFromData({ ...formData, role: e.target.value })
                }
              >
                <option value="">Choose...</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>
            <div class="col-md-3">
              <label htmlFor="inputCity" class="form-label">Phone</label>
              <input type="text" class="form-control" id="inputCity" value={formData.phone} onChange={(e) => setFromData({ ...formData, phone: e.target.value })} />
            </div>
          </div>


          <div class="col-12">
            <button type="submit" class="btn btn-success">Add User</button>
          </div>
        </form>
        </div>
        </div>
      </div>
      <div className='p-4 border rounded-2'>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope='col'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              user.map((elem) => (
                <tr>
                  <th scope="row">{elem.id}</th>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>{elem.role}</td>
                  <td>{elem.phone && elem.phone.length > 0 ? elem.phone : "-"}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User