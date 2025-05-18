import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalHeader,
  CRow,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import fondo1 from '../../../assets/images/fondo1.jpg'
import "src/scss/login.scss"



const Login = () => {

  const [forgotvisible,Setforgotvisible]=useState(false)

  return (
<>

    <div style={{
      backgroundColor: '#7d4b45',
      backgroundImage: `url(${fondo1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'}} className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard style={{backgroundColor: 'white'}} className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} style={{
                          color: '#b66c47'
                        }} />
                      </CInputGroupText>
                      <CFormInput type="email" placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} style={{
                          color: '#b66c47'
                        }} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="button_login">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton className="button_olvido" onClick={() => Setforgotvisible(true)}>
                          Forgot password?
                        </CButton>
                      </CCol>
                       <CModal visible={forgotvisible} onClose={()=>Setforgotvisible(false)}>
                          <CModalHeader>Forgot password</CModalHeader>
                          <CModalBody>
                            <CForm>
                              <p>Please enter your email and we will send you a code</p>
                              <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} style={{
                          color: '#b66c47'
                        }} />
                      </CInputGroupText>
                      <CFormInput type="email" placeholder="Email" autoComplete="email" />
                        </CInputGroup>
                            </CForm>
                            </CModalBody>
                            <CModalFooter>
                                <CButton className="button_login">
                                Accept
                                </CButton>
                            </CModalFooter>
                              </CModal>
                      <div className='text-center mt-0'>
                        <p className='mb-0'>Create an account</p>
                        <CCol className='text-center mt-3'>
                          <Link to="/register">
                        <CButton className="button_registro" >
                          Register now!
                        </CButton>
                        </Link>
                      </CCol>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  )
}


export default Login
