import React,{useEffect,useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import fondo1 from '../../../assets/images/fondo2.jpg'
import 'src/scss/register.scss'
import axios from 'axios'; 
import { href } from 'react-router-dom'

const Register = () => {

const [formData, setFormData]=useState(
  {
    first_name:"",
    last_name:"",
    username:"",
    password:"",
    email:"",
    phone:"",
    department:"",
  }
)

const ImputChangeData = (e) => {
  const {name, value} = e.target
  setFormData({ ...formData, [name]: value})
}

const savebutton=() => {
  axios.post("http://localhost:5000/users", formData)
}

  return (
    <div
      style={{
        backgroundColor: '#7d4b45',
        backgroundImage: `url(${fondo1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={12}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon
                        icon={cilUser}
                        style={{
                          color: '#b66c47',
                        }}
                      />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Fist Name"
                      value={formData.first_name}
                      name='first_name'
                      onChange={ImputChangeData}
                    />
                    <CFormInput
                      type="text"
                      placeholder="Last Name"
                      value={formData.last_name}
                      name='last_name'
                      onChange={ImputChangeData}
                    />
                    <CFormInput placeholder="Username" autoComplete="username" 
                     value={formData.username}
                     name='username'
                    onChange={ImputChangeData}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText
                      style={{
                        color: '#b66c47',
                      }}
                    >
                      @
                    </CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"
                      value={formData.email}
                      name='email'
                      onChange={ImputChangeData} />
                    <CFormInput
                    type="number"
                    placeholder="Phone" autoComplete="phone"
                      value={formData.phone}
                      name='phone'
                      onChange={ImputChangeData} />
                      <CFormInput
                      type="text"
                      placeholder="Department"
                      value={formData.department}
                      name='department'
                      onChange={ImputChangeData}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon
                        icon={cilLockLocked}
                        style={{
                          color: '#b66c47',
                        }}
                      />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={formData.password}
                      name='password'
                      onChange={ImputChangeData}
                    />
                  </CInputGroup>
                  <div className="button_create">
                    <CButton
                    onClick={()=>{
                      savebutton()
                      window.location.href="#"
                    }}
                    >Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
