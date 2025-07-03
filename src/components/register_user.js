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
import 'src/scss/edit.scss'
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

//-----------------------------------------------------------------------------------------------------

const Users = () => {
  const Navigate = useNavigate()

  const [mvisible, setMvisible] = useState(false)
  const [Users, setUsers] = useState([])
  const [editmodalVisible, seteditModalVisible] = useState(false)
  const [codigoEditar, setCodigoEditar] = useState(null)
  const [deleteUser, SetdeleteUser] = useState(null)

  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMensaje, setErrorMensaje] = useState('')

  const [mensajeEdit, setmensajeEdit] = useState('')
  const [mensajeDelete, setmensajeDelete] = useState('')
  const [mensajeDeleteModal, setmensajeDeleteModal] = useState(false)
  const [mensajeEditModal, setmensajeEditModal] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    phone: '',
    address: '',
    rol: '',
    status: ''
  })

  const InputChangedata = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  }

  //--------------------------------------------------------------------------------------------
  /*
  let filteredDepartment = [] //let para que pueda cambiar los valores , aqui inicializo un vector vacio

  if (search === '') {
    filteredDepartment = departments //si no hay nada en el buscador , o mejor dicho en el vector, muestra todos los dpt
  } else {
    filteredDepartment = departments.filter(
      (
        dpt, //y si si lo hay , filtro , por categorias , o etiquetas
      ) =>
        dpt.name.toLowerCase().includes(search.toLowerCase()) ||
        dpt.address.toLowerCase().includes(search.toLowerCase()) || //reviso si el nombre , esta incluido en el vector search , osea si dpt manolito es igual a dpt manolito pero en el vector search
        dpt.phone.toLowerCase().includes(search.toLowerCase()) ||
        dpt.email.toLowerCase().includes(search.toLowerCase()) ||
        dpt.operational_status.toLowerCase().includes(search.toLowerCase()),
    )
  }
*/

  //get users
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error al obtener datos', error))
  }, [])

  //get users funcion
  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios
        .get('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUsers(response.data))
    } catch {
      console.error('Error al obtener datos', error)
    }
  }

  //delete users

  const Delete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:4000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      getUsers()
      setMvisible(false)
      setmensajeDeleteModal(true)
      setmensajeDelete(response.data.message)
    } catch (err) {
      console.log('Error al eliminar el User:', err)
    }
  }

  //put users

  const putUsers = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:4000/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      getUsers()
      seteditModalVisible(false)
      setmensajeEditModal(true)
      setmensajeEdit(response.data.message)
    } catch (err) {
      setErrorMensaje(err.response.data.error)
      setErrorModalVisible(true)
      seteditModalVisible(false)
    }
  }

  return (
    <>
        <div className="ccard-box mb-4">
                  <CCard>
                    <CCardHeader>Add New User</CCardHeader>
                    <CCardBody>
                      <CInputGroup className="mb-3">
                        <div className="d-flex  w-100 gap-3">
                          <div className="w-50">
                            <CFormLabel>First name:</CFormLabel>
                            <CInputGroup>
                              <CInputGroupText>
                                <CIcon icon={cilPencil} />
                              </CInputGroupText>
                              <CFormInput
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={InputChangedata}
                              ></CFormInput>
                            </CInputGroup>
                          </div>
                          <div className="w-50">
                            <CFormLabel>Last name:</CFormLabel>
                            <CInputGroup>
                              <CInputGroupText>
                                <CIcon icon={cilEnvelopeClosed} />
                              </CInputGroupText>
                              <CFormInput
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Last name"
                                value={formData.last_name}
                                onChange={InputChangedata}
                              ></CFormInput>
                            </CInputGroup>
                          </div>
                          <div className="w-50">
                            <CFormLabel>User name:</CFormLabel>
                            <CInputGroup>
                              <CInputGroupText>
                                <CIcon icon={cilEnvelopeClosed} />
                              </CInputGroupText>
                              <CFormInput
                                type="text"
                                id="user_name"
                                name="user_name"
                                placeholder="User name"
                                value={formData.user_name}
                                onChange={InputChangedata}
                              ></CFormInput>
                            </CInputGroup>
                          </div>
                        </div>
                      </CInputGroup>
        
                      <CInputGroup className="mb-3">
                        <div className="d-flex  w-100 gap-3">
                          <div className="w-50">
                            <CFormLabel>Email:</CFormLabel>
                            <CInputGroup>
                              <CInputGroupText>
                                <CIcon icon={cilPhone} />
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
                          <div className="w-50">
                            <CFormLabel>Status:</CFormLabel>
                            <CInputGroup>
                              <CInputGroupText>
                                <CIcon icon={cilOptions} />
                              </CInputGroupText>
                              <CFormSelect
                                id="status"
                                name="status"
                                value={formData.status}
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
                    </CCardBody>
                    <CCardFooter>
                        <div className="button-box">
                            <CButton className="button-register" onClick={() => seteditModalVisible(false)}>
                                Register
                            </CButton>
                        </div>
                    </CCardFooter>
                  </CCard>
                </div>
    </>
  )
}

export default Users;