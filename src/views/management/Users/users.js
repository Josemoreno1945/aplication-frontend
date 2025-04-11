import React, {useState} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
    CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from '@coreui/react'
import { DocsLink } from 'src/components'



const Users = () => {

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
                    },
    ])
    return (
        <>
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
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
        </div>
        </>
    )
}

export default Users
