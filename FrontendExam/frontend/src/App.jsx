import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import { AuthProvider } from './context/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'

import Clinic from './pages/Clinic'
import User from './pages/User'
import MyAppoinments from './pages/MyAppoinments'
import BookApoinment from './pages/BookApoinment'
import PatientDashboard from './pages/PatientDashboard'
import AppoinmentDetails from './pages/AppoinmentDetails'
import Prescription from './pages/prescription'
import DoctorDashboard from './pages/DoctorDashboard'
import ToDayQueue from './pages/ToDayQueue'
import AddApointment from './pages/AddApointment'

function App() {

  return (
    <>
    <AuthProvider>
     <BrowserRouter>
     <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={
        <ProtectedRoute><Layout/></ProtectedRoute>}>
       <Route path="admin-dashboard"  element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard/></ProtectedRoute>}/>
        <Route path="patient-dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><PatientDashboard/></ProtectedRoute>}/>
        <Route path="doctor-dashboard" element={<ProtectedRoute allowedRoles={["doctor"]}><DoctorDashboard/></ProtectedRoute>}/>
       <Route path='clinics' 
       element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <Clinic/>
          </ProtectedRoute>
        }/>
       <Route path='users' element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <User/>
        </ProtectedRoute>
        }/>
       {/* <Route path='rastaurants' element={<Restaurants/>}/> */}
       <Route path='myreport' 
       element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <MyAppoinments/>
          </ProtectedRoute>
        }/>
        <Route path='bookReport' 
       element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <BookApoinment/>
          </ProtectedRoute>
        }/>
        <Route path='showreport/:id' 
       element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <AppoinmentDetails/>
          </ProtectedRoute>
        }/>
        <Route path='prescription' 
       element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <Prescription/>
          </ProtectedRoute>
        }/>
         <Route path='toDayQueue' 
       element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <ToDayQueue/>
          </ProtectedRoute>
        }/>
        <Route path='addApointment' 
       element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <AddApointment/>
          </ProtectedRoute>
        }/>
      </Route>
     </Routes>
     </BrowserRouter>
     </AuthProvider>
    </>
  )
}

export default App
