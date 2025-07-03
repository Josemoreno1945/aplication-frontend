/*import React, {useState, useEffect} from 'react'
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

export default report;*/

import React, { useEffect, useState } from "react";
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
} from "@coreui/react";
import "src/scss/edit.scss";
import CIcon from "@coreui/icons-react";
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
  cilCommentSquare,
} from "@coreui/icons";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//-----------------------------------------------------------------------------------------------------

const Reports = () => {
  const { assetId } = useParams();
  const Navigate = useNavigate();

  const [mvisible, setMvisible] = useState(false);
  const [reports, setReports] = useState([]);
  const [editmodalVisible, seteditModalVisible] = useState(false);
  const [codigoEditar, setCodigoEditar] = useState(null);
  const [deleteReport, SetdeleteReport] = useState(null);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const [mensajeEdit, setmensajeEdit] = useState("");
  const [mensajeDelete, setmensajeDelete] = useState("");
  const [mensajeDeleteModal, setmensajeDeleteModal] = useState(false);
  const [mensajeEditModal, setmensajeEditModal] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    hour: "",
    priority: "",
    description: "",
    id_assets: assetId,
  });

  const InputChangedata = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  };

  //reportes post
  const Postreports= async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:4000/report', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      setReports(response.data)

    } catch (err) {
      console.error('Error al registrar asset:', err)
    }
  }

  return (
    <>
      <div className="ccard-box mb-4">
        <CCard>
        <CCardHeader>Add New Report</CCardHeader>
          <CCardBody>
            <CInputGroup className="mb-3">
              <div className="d-flex  w-100 gap-3">
                <div className="w-50">
                  <CFormLabel>Date:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      type="date"
                      id="date"
                      name="date"
                      placeholder="Date"
                      value={formData.date}
                      onChange={InputChangedata}
                    ></CFormInput>
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Hour:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="hour"
                      id="hour"
                      name="hour"
                      placeholder="Hour"
                      value={formData.hour}
                      onChange={InputChangedata}
                    ></CFormInput>
                  </CInputGroup>
                </div>
                <div className="w-50">
                  <CFormLabel>Priority:</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilOptions} />
                    </CInputGroupText>
                    <CFormSelect
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={InputChangedata}
                    >
                      <option value="">Select priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </CFormSelect>
                  </CInputGroup>
                </div>
              </div>
            </CInputGroup>
            <div className="w-50">
              <CFormLabel>Description</CFormLabel>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilCommentSquare} />
                </CInputGroupText>
                <CFormTextarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={InputChangedata}
                ></CFormTextarea>
              </CInputGroup>
            </div>
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
  );
};

export default Reports;