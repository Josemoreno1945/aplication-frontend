import React, {useState, useEffect} from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
    CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell, CInputGroup, CInputGroupText,
    CFormTextarea, 
    CCardFooter} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus, cibDropbox, cilSearch, cilPencil, cilX, cilUser, cilLockLocked, cilPuzzle} from '@coreui/icons'
import "src/scss/edit.scss"
import axios from 'axios';

const report = () => {


const [formData, setFormData]=useState(
  {
    Username:"",
    department:"",
    report:""
  }
)

const[reports, setReports]=useState([])

const ImputChangeData = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value})
  }

const accept=() => {
  axios.post("http://localhost:5000/reports", formData)
  .then(()=>axios.get("http://localhost:5000/reports"))
}

    useEffect(() => {
        axios.get("http://localhost:5000/reports")
          .then(response => setReports(response.data))
          .catch(error => console.error("Error al obtener datos", error));
      }, []);

    return(
        <>
        <CCard>
            <CCardHeader></CCardHeader>
            <CCardBody>
             <CForm>
                <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon
                        icon={cilUser}
                        style={{
                          color: '#b66c47',
                        }}
                      />
                    </CInputGroupText>
                    <CFormInput placeholder="Username"
                         value={formData.Username}
                         name='Username'
                         required
                        onChange={ImputChangeData}/>
                        
                    </CInputGroup>
                    <CInputGroup>
                    <CInputGroupText>
                        <CIcon
                        icon={cilLockLocked}
                        style={{
                        color: '#b66c47',
                         }}
                         />
                        </CInputGroupText>
                    <CFormInput placeholder="Department"
                        value={formData.department}
                        name='department'
                        required
                        onChange={ImputChangeData}/>
                    </CInputGroup>
                    <CInputGroup>
                    <CInputGroupText>
                        <CIcon
                        icon={cilPuzzle}
                        style={{
                        color: '#b66c47',
                         }}
                         />
                        </CInputGroupText>
                    <CFormTextarea placeholder="Report"
                        value={formData.report}
                        name='report'
                        required
                        onChange={ImputChangeData}>
                    </CFormTextarea>
                    </CInputGroup>
                    <CButton className="button_edit"
                    onClick={()=>{
                        accept()
                    }}
                    >
                        Accept
                    </CButton>
                    </CForm>
                </CCardBody>
                <CCardFooter>
             
                </CCardFooter>
        </CCard>

<div className='table-responsive mt-4' >
        <CTable>
            <CTableHead>
          
                <CTableRow>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Department</CTableHeaderCell>
                    <CTableHeaderCell>Report</CTableHeaderCell>
                </CTableRow>
                
            </CTableHead>
            <CTableBody>
                {reports.map((r, index) => (
                    <CTableRow key={index}>
                        
                        <CTableDataCell>{r.Username}</CTableDataCell>
                        <CTableDataCell>{r.department}</CTableDataCell>
                        <CTableDataCell>{r.report}</CTableDataCell>

                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
        </div>

        </>
    )
}

export default report