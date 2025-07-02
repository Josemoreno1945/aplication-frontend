/*import React, { useState,useEffect} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
    CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody, CTableDataCell} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus, cibDropbox, cilSearch, cilPencil, cilX} from '@coreui/icons'
import "src/scss/edit.scss"
import axios from 'axios';



const Users = () => {

    

    const [isEditing,setIsEditing] = useState(false)
    const [userid, setuserid] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const[updateuser, setupdateuser] = useState(null)
    
    const [users, setusers] = useState([ ])

    useEffect(() => {
        axios.get("http://localhost:5000/users")
        .then(response => setusers(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }, []);




    
        const [search, setSearch] = useState("");

        let filtroUsuario =[]

        if(search === ""){
            filtroUsuario=users
        }else{
            filtroUsuario=users.filter((user) =>
                user.first_name.toLowerCase().includes(search.toLowerCase())||
                user.last_name.toLowerCase().includes(search.toLowerCase())||
                user.username.toLowerCase().includes(search.toLowerCase())||
                user.rol.toLowerCase().includes(search.toLowerCase())||
                user.email.toLowerCase().includes(search.toLowerCase())||
                user.phone.toLowerCase().includes(search.toLowerCase())||
                user.address.toLowerCase().includes(search.toLowerCase())||
                user.department.toLowerCase().includes(search.toLowerCase())||
                user.status.toLowerCase().includes(search.toLowerCase())
        );
        }
    

      const Editregister = (index) => {
        setupdateuser(users[index]) //accedo al user elegido 
        setIsEditing(true) //cambio el estado a true para editar
        setuserid(index) //guarda el id del user
        setModalVisible(true) //muestra el modal o mejor dicho el formulario
      }

      const handleSave = () => {
        if (userid !== null) {
          const updatedUsers = [...users]
          updatedUsers[userid] = updateuser // actualiza el user en la posicion correspondiente
          setusers(updatedUsers) // actualiza el estado con el nuevo arreglo
          setModalVisible(false) // cierra el modal
          setIsEditing(false) // cambia la bandera de edición
          setuserid(null) // limpia el id del user
        }
      }

    const [mVisible, setMlVisible]=useState(false)

    const [deleteUserid, setdeleteUserid]=useState("")

    const handleDelete = (id) => {
        const updateduser = users.filter((u) => u.id !== id) //busca el user que eliminamos
        setusers(updateduser)  //actualiza el arreglo de user
        setMlVisible(false)
        axios.delete(`https://localhost:5000/users/${id}`)
        .then(() => console.log(`User con Id ${id} eliminado`))
        .catch(error => console.error("Error al eliminar usuario:", error))
      }



    return (
        <>

 
        <CModal visible={mVisible} onClose={() => setMlVisible(false)}>
            <CModalHeader className='Modal-header'>Delete User</CModalHeader>
            <CFormLabel className='label-delete'>Are you sure you want to delete?</CFormLabel>
            <CModalBody>
                <div className='box-buttom-accept'>
                    <CButton className='buttom-accept'
                    onClick={() => setMlVisible(false)}>
                    No
                    </CButton>
                    <CButton className='buttom-accept'
                    onClick={() => handleDelete(deleteUserid)}>
                    Yes
                    </CButton>
                </div>
            </CModalBody>
        </CModal>


        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader className="header_edit">Editing</CModalHeader>
                        <CModalBody>
                    <CFormLabel>id</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.id || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, id: e.target.value})
                    }
                    />
                        <CFormLabel>First Name</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.first_name || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, first_name: e.target.value})
                    }
                    />
                        <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.last_name || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, last_name: e.target.value})
                    }
                    />
                    <CFormLabel>Username</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.username || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, username: e.target.value})
                    }
                    />
                    <CFormLabel>Rol</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.rol || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, rol: e.target.value})
                    }
                    />
                    <CFormLabel>Email</CFormLabel>
                <CFormInput
                    type="email"
                    value={updateuser?.email || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, email: e.target.value})
                    }
                    />
                    <CFormLabel>Phone</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.phone || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, phone: e.target.value})
                    }
                    />
                    <CFormLabel>Address</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.address || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, Address: e.target.value})
                    }
                    />
                    <CFormLabel>Department</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.department || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, department: e.target.value})
                    }
                    />
                    <CFormLabel>Status</CFormLabel>
                <CFormInput
                    type="text"
                    value={updateuser?.status || ''}
                    onChange={(e) => 
                        setupdateuser({ ...updateuser, status: e.target.value})
                    }
                    />
                        </CModalBody>
                    <CModalFooter className="footer_edit">
                         <CButton className="button_edit" onClick={handleSave}>
                            Accept
                        </CButton>
                    </CModalFooter>

        </CModal>


        <div className="buscador">
            <CForm className="d-flex">
                <CFormInput className="input-buttom-search"
                    type="text"
                    placeholder="Search for a user"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                ></CFormInput>
                <CButton className="search-buttom"><CIcon className="icon-search" icon={cilSearch}></CIcon></CButton>
            </CForm>
        </div>

        <div className='table-responsive'>
        <CTable>
            <CTableHead>
          
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>First name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Rol</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Department</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                </CTableRow>
                
            </CTableHead>
            <CTableBody>
                {filtroUsuario.map((user, index) => (
                    <CTableRow key={index}>
                        
                        <CTableDataCell>{user.id}</CTableDataCell>
                        <CTableDataCell>{user.first_name}</CTableDataCell>
                        <CTableDataCell>{user.last_name}</CTableDataCell>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.rol}</CTableDataCell>
                        <CTableDataCell>{user.email}</CTableDataCell>
                        <CTableDataCell>{user.phone}</CTableDataCell>
                        <CTableDataCell>{user.address}</CTableDataCell>
                        <CTableDataCell>{user.department}</CTableDataCell>
                        <CTableDataCell>{user.status}</CTableDataCell>
                        <CTableDataCell>
                            <CButton onClick={() => Editregister(index)}>
                                <CIcon icon={cilPencil} />
                            </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                            <CButton onClick={() =>{ 
                                setdeleteUserid(user.id)
                                setMlVisible(true)
                             }}>
                                <CIcon icon={cilX} />
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
        </div>
        </>
    )
}

export default Users;
*/

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
  const [errorMessage, setErrorMessage] = useState('')

  const [messageEdit, setmessageEdit] = useState('')
  const [messageDelete, setmessageDelete] = useState('')
  const [msgDeleteModal, setmsgDeleteModal] = useState(false)
  const [msgEditModal, setmsgEditModal] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    phone: '',
    address: '',
    department: '',
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

  //GET PARA DEPARTAMENTOS --------------------------------------------------------------------------------
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

  //GET DE DEPARTAMENTOS COMO FUNCION ----------------------------------------------------------------------
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

  //DELETE DE DEPARTAMENTOS -----------------------------------------------------------------------------------

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
      setmsgDeleteModal(true)
      setmessageDelete(response.data.message)
    } catch (err) {
      console.log('Error al eliminar el User:', err)
    }
  }

  //PUT DE DEPARTAMENTOS --------------------------------------------------------------------------------

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
        <CModalHeader className="Modal-header">Delete User</CModalHeader>
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
                    <CFormLabel>Phone:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
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
                    <CFormLabel>Department:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="department"
                        name="departmet"
                        placeholder="Department"
                        value={formData.department}
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
                    putUsers(codigoEditar)
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
            <div>Management Users</div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilListNumbered} />{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell>First name</CTableHeaderCell>
                    <CTableHeaderCell>Last name</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Department</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Edit</CTableHeaderCell>
                    <CTableHeaderCell>Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Users.map((users, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{users.first_name}</CTableDataCell>
                      <CTableDataCell>{users.las_name}</CTableDataCell>
                      <CTableDataCell>{users.user_name}</CTableDataCell>
                      <CTableDataCell>{users.email}</CTableDataCell>
                      <CTableDataCell>{users.phone}</CTableDataCell>
                      <CTableDataCell>{users.department}</CTableDataCell>
                      <CTableDataCell>{users.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="box-icon"
                          onClick={() =>
                            Navigate(
                              `/management/users${users.id_users}`,
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
                            setCodigoEditar(users.id_users)
                            setFormData({
                              first_name: users.first_name,
                              last_name: users.last_name,
                              user_name: users.user_name,
                              email: users.email,
                              phone: users.phone,
                              department: users.department,
                              status: users.status,
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
                            SetdeleteDptid(users.id_users)
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

export default Users;