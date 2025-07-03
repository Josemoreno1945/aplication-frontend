import React, { useEffect, useState } from 'react'
import {
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
  CInputGroupText,
} from '@coreui/react'
import 'src/scss/departments.scss'
import CIcon from '@coreui/icons-react'
import {
  cilListNumbered,
  cilPlus,
  cilX,
  cilPencil,
  cibDropbox,
  cilSearch,
  cilXCircle,
  cilEnvelopeClosed,
  cilPhone,
  cilOptions,
  cilMap,
} from '@coreui/icons'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PDFDownloadLink } from '@react-pdf/renderer'

import DptPDF from '../../../components/Departments.PDF.js'

//-----------------------------------------------------------------------------------------------------

const Departments = () => {
  const Navigate = useNavigate()

  const [mvisible, setMvisible] = useState(false)
  const [departments, setDepartments] = useState([])
  const [editmodalVisible, seteditModalVisible] = useState(false)
  const [codigoEditar, setCodigoEditar] = useState(null)
  const [deleteDptid, SetdeleteDptid] = useState(null)

  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [messageEdit, setmessageEdit] = useState('')
  const [messageDelete, setmessageDelete] = useState('')
  const [msgDeleteModal, setmsgDeleteModal] = useState(false)
  const [msgEditModal, setmsgEditModal] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    operational_status: '',
  })

  const InputChangedata = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  }

  //GET PARA DEPARTAMENTOS --------------------------------------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:4000/departments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error al obtener datos', error))
  }, [])

  //GET DE DEPARTAMENTOS COMO FUNCION ----------------------------------------------------------------------
  const getDepartments = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios
        .get('http://localhost:4000/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setDepartments(response.data))
    } catch {
      console.error('Error al obtener datos', error)
    }
  }

  //DELETE DE DEPARTAMENTOS -----------------------------------------------------------------------------------

  const Delete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:4000/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      getDepartments()
      setMvisible(false)
      setmsgDeleteModal(true)
      setmessageDelete(response.data.message)
    } catch (err) {
      console.log('Error al eliminar departamento:', err)
    }
  }

  //PUT DE DEPARTAMENTOS --------------------------------------------------------------------------------

  const putDepartments = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:4000/departments/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      getDepartments()
      seteditModalVisible(false)
      setmsgEditModal(true)
      setmessageEdit(response.data.message)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setErrorModalVisible(true)
      seteditModalVisible(false)
    }
  }

  return (
    <>
      <CModal visible={msgDeleteModal} onClose={() => setmsgDeleteModal(false)}>
        <CModalBody>
          <div>{String(messageDelete)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setmsgDeleteModal(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal visible={msgEditModal} onClose={() => setmsgEditModal(false)}>
        <CModalBody>
          <div>{String(messageEdit)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setmsgEditModal(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          <div>{String(errorMessage)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setErrorModalVisible(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      {/*------------------------------------------------------------------------------------- */}
      <div className="buscador">
        <CForm className="d-flex">
          <CFormInput className="input-buttom-search" type="text" placeholder="Search"></CFormInput>
          <CButton className="search-buttom">
            <CIcon className="icon-search" icon={cilSearch} />
          </CButton>
        </CForm>
      </div>

      {/*------------------------------------------------------------------------------------- */}

      <CModal visible={mvisible} onClose={() => setMvisible(false)}>
        <CModalHeader className="Modal-header">Delete department</CModalHeader>
        <CFormLabel className="label-delete">Are you sure you want to delete?</CFormLabel>
        <CModalBody>
          <div className="box-buttom-accept">
            <CButton className="buttom-accept" onClick={() => setMvisible(false)}>
              No
            </CButton>
            <CButton className="buttom-accept" onClick={() => Delete(deleteDptid)}>
              Yes
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      {/* ----------------------------------------------------------------------------------------------------*/}

      <CModal
        visible={editmodalVisible}
        onClose={() => {
          seteditModalVisible(false)
        }}
      >
        <div className="ccard-box mb-4">
          <CCard>
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
                    putDepartments(codigoEditar)
                  }}
                >
                  Editar
                </CButton>
                <CButton className="button-register" onClick={() => seteditModalVisible(false)}>
                  Cerrar
                </CButton>
              </div>
            </CCardFooter>
          </CCard>
        </div>
      </CModal>

      {/*------------------------------------------------------------------------------------- */}
      <div className="conteiner mb-4">
        <CCard className="c_list">
          <CCardHeader className="card-header">
            <div>Management Departments</div>
            <div>
              <PDFDownloadLink
                document={<DptPDF departments={departments} />}
                fileName="department_report.pdf"
              >
                <CButton className="pdfgenerate">Generate pdf</CButton>
              </PDFDownloadLink>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilListNumbered} />{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>inventory</CTableHeaderCell>
                    <CTableHeaderCell>Edit</CTableHeaderCell>
                    <CTableHeaderCell>Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {departments.map((department, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{department.name}</CTableDataCell>
                      <CTableDataCell>{department.address}</CTableDataCell>
                      <CTableDataCell>{department.phone}</CTableDataCell>
                      <CTableDataCell>{department.email}</CTableDataCell>
                      <CTableDataCell>{department.operational_status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="box-icon"
                          onClick={() =>
                            Navigate(
                              `/management/Departments/inventory/${department.id_departments}`,
                            )
                          }
                        >
                          <CIcon icon={cibDropbox} className="text-success" />{' '}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="box-icon"
                          onClick={() => {
                            setCodigoEditar(department.id_departments)
                            setFormData({
                              name: department.name,
                              address: department.address,
                              phone: department.phone,
                              email: department.email,
                              operational_status: department.operational_status,
                            })
                            seteditModalVisible(true)
                          }}
                        >
                          <CIcon icon={cilPencil} className="text-info" />{' '}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className=" box-icon"
                          onClick={() => {
                            setMvisible(true)
                            SetdeleteDptid(department.id_departments)
                          }}
                        >
                          <CIcon icon={cilXCircle} className="text-danger" />{' '}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Departments
