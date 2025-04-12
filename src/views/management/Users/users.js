import React, {useState} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
    CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilX} from '@coreui/icons'
import "src/scss/edit.scss"


const Users = () => {

    const [isEditing,setIsEditing] = useState(false)
    const [userid, setuserid] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const[updateuser, setupdateuser] = useState(null)


    const [users, setusers] = useState([
        

        {                
                        id: 1,
                        first_name: "Jose",
                        last_name: "Moreno",
                        username: "JM1301",
                        rol: "Asset Manager",
                        email: "josemoreno123@gmail.com",
                        phone: "123456789",
                        address: "Av. Los Agustinos",
                        department: "Administration",
                        status: "Active",
                    },
                    {
                        id: 2,
                        first_name: "Maria",
                        last_name: "Sierra",
                        username: "majo123",
                        rol: "Department Head",
                        email: "majosierra2004@gmail.com",
                        phone: "987654321",
                        address: "Caneyes, Vereda 6",
                        department: "Study Control",
                        status: "Active",
                    },
                    {
                        id: 3,
                        first_name: "Pedro",
                        last_name: "Perez",
                        username: "pedrito988",
                        rol: "Department Head",
                        email: "perezpedro1@gmail.com",
                        phone: "123123123",
                        address: "Barrio Obrero",
                        department: "Subdirection",
                        status: "Inactive",
                    },
    ])



    

    const handleDelete = (index) => {
        const updateduser = users.filter((_, i) => i !== index) //busca el dpt q eliminamos
        setusers(updateduser)  //actualiza el arreglo de dpts
      }

  

      const Editregister = (index) => {
        setupdateuser(users[index]) //accedo al departamento elegido 
        setIsEditing(true) //cambio el estado a true para editar
        setuserid(index) //guarda el id del dpt
        setModalVisible(true) //muestra el modal o mejor dicho el formulario
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
                         <CButton className="button_edit">
                            Accept
                        </CButton>
                    </CModalFooter>

        </CModal>


        <CCard className="mb-4">
            <CCardHeader>
                <CFormInput
                    type="text"
                    placeholder="Search for a user"
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
                {users.map((user, index) => (
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
