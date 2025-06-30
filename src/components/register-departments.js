import React, { use, useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormTextarea,
  CInputGroup,
  CCardFooter,
  CSpinner,
  CInputGroupText,
  CTableFoot,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilX,
  cilUser,
  cilBookmark,
  cilCommentSquare,
  cilCalendar,
  cilOptions,
  cilClipboard,
  cilAlarm,
  cilXCircle,
  cilPlus,
  cilMinus,
  cilPhone,
  cilMap,
  cilEnvelopeClosed,
} from '@coreui/icons'
import axios from 'axios'
import '../scss/register-dpt.scss'
import { Navigate, useNavigate } from 'react-router-dom'

const register_dpt = () => {
  const Navigate = useNavigate()
  //arreglo que almacena los departamentos
  const [departments, setDepartments] = useState([])
  const [departmentId, setDepartmentId] = useState(null)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [RegisterModalVisible, setRegisterModalVisible] = useState(false)
  const [Registermsg, setRegistermsg] = useState('')

  const InputChangedata = (e) => {
    //e es como un parametro
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  }

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    operational_status: '',
  })

  // al presionar el boton save , este envia o guarda los datos -----------------------------------------------
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:4000/departments', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setDepartments(response.data)
      setRegistermsg(response.data.message)
      setRegisterModalVisible(true)
    } catch (err) {
      console.error('Error al registrar departamento:', err)
      let msg
      if (
        err.response &&
        err.response.data &&
        Array.isArray(err.response.data.errors) &&
        err.response.data.errors.length > 0
      ) {
        msg = err.response.data.errors[0].message
      } else if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error
      }
      setErrorMessage(msg)
      setErrorModalVisible(true)
    }
  }

  return (
    <>
      <CModal visible={RegisterModalVisible} onClose={() => setRegisterModalVisible(false)}>
        <CModalBody>
          <div>{Registermsg}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setRegisterModalVisible(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          <div>{errorMessage}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setErrorModalVisible(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <div className="ccard-box mb-4">
        <CCard>
          <CCardHeader>Add New Department</CCardHeader>
          <CCardBody>
            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Department Name:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Department Name"
                      value={formData.name}
                      onChange={InputChangedata}
                    ></CFormInput>
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Email:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={InputChangedata}
                    ></CFormInput>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Phone</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={InputChangedata}
                    ></CFormInput>
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Operational status:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilOptions} />
                    </CInputGroupText>
                    <CFormSelect
                      id="operational_status"
                      name="operational_status"
                      value={formData.operational_status}
                      onChange={InputChangedata}
                    >
                      <option value="">Select status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </CFormSelect>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-100">
                  <CFormLabel>Address:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilMap} />
                    </CInputGroupText>
                    <CFormTextarea
                      rows={3}
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={InputChangedata}
                    ></CFormTextarea>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>
          </CCardBody>
          <CCardFooter>
            <div className="button-box">
              <CButton
                className="button-register"
                onClick={() => {
                  handleSubmit()
                }}
              >
                Registrar
              </CButton>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </>
  )
}

export default register_dpt
