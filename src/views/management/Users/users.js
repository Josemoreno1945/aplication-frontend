import React, { useEffect} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModl,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
    CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from '@coreui/react'
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
        axios.get("http://localhost:500/users")
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
    
    const handleDelte = (index) => {
        const updateduser = users.filter((_, i) => i !== index) //busca el user que eliminamos
        setusers(updateduser)  //actualiza el arreglo de user
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



    return (
        <>


        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader className="header_edit">Editing</CModalHeader>
                        <CModalBody>
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


        <CCard className="mb-4">
            <CCardHeader>
                <CFormInput
                    type="text"
                    placeholder="Search for a user"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                ></CFormInput>
            </CCardHeader>
        </CCard>
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
                            <CButton onClick={() => handleDelete(index)}>
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

export default Users
