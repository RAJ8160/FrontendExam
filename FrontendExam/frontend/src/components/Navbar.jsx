import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Navbar = () => {
    const navigate = useNavigate();
    const { isDoctor,
        isPatient,
        isReceptionist,
        isAdmin, user,logoutAuth } = useAuth()
    // console.log(isAdmin);
    // console.log("User ", user);

    const handleLogOut = () => {
    logoutAuth();          // clear auth
    navigate("/login");    // redirect
  };

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAdmin && <li class="nav-item">
                            <Link to='/clinics'>MyClinic</Link>
                            {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                        </li>}
                        {isAdmin && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/users'>Users</Link>
                        </li>}
                        {isAdmin && <li class="nav-item">
                            <Link to="/admin-dashboard">Dashboard</Link>
                        </li>}
                        {isPatient && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/patient-dashboard'>Dashboard</Link>
                        </li>}
                         {isPatient && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/myreport'>My Apoinments</Link>
                        </li>}
                        {isPatient && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/bookReport'>Book Apoinment</Link>
                        </li>}
                        {isPatient && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/prescription'>My Prescriptions</Link>
                        </li>}
                        {isDoctor && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/toDayQueue'>To Day Queue</Link>
                        </li>}
                        {isDoctor && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/addApointment'>Add Persciption on Apoinment</Link>
                        </li>}
                        {isDoctor && <li class="nav-item">
                            {/* <a class="nav-link" href="#">Link</a> */}
                            <Link to='/doctor-dashboard'>Dashboard</Link>
                        </li>}
                        <li class="nav-item">
                            <button className='btn btn-danger' onClick={handleLogOut}>
                                LogOut
                            </button>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar