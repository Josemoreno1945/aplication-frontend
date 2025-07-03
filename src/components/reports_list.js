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
  cilCommentSquare
} from '@coreui/icons'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


//-----------------------------------------------------------------------------------------------------

const Reports_list = () => {
  const { assetId } = useParams()
  const Navigate = useNavigate()

  const [mvisible, setMvisible] = useState(false)
  const [reports, setReports] = useState([])




  const InputChangedata = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  }



  //get report
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:4000/report', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setReports(response.data))
      .catch((error) => console.error('Error al obtener datos', error))
  }, [])

  

  //delete report

  const Delete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:4000/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      getReports()
      setMvisible(false)
    } catch (err) {
      console.log('Error al eliminar el Reporte:', err)
    }
  }

  
  return (
    <>
     
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
        <CModalHeader className="Modal-header">Delete Report</CModalHeader>
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



      <div className="conteiner mb-4">
        <CCard className="c_list">
          <CCardHeader className="card-header">
            <div>Management Reports</div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilListNumbered} />{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Hour</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Id Asset</CTableHeaderCell>
                    <CTableHeaderCell> </CTableHeaderCell>
                    <CTableHeaderCell>Accept</CTableHeaderCell>
                    <CTableHeaderCell>Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {reports.map((reports, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{reports.date}</CTableDataCell>
                      <CTableDataCell>{reports.hour}</CTableDataCell>
                      <CTableDataCell>{reports.priority}</CTableDataCell>
                      <CTableDataCell>{reports.description}</CTableDataCell>
                      <CTableDataCell>{reports.status}</CTableDataCell>
                      <CTableDataCell>{reports.id_assets}</CTableDataCell>
                      <CTableDataCell>

                      </CTableDataCell>

                    <CTableDataCell>
                        <CButton>Accept</CButton>
                    </CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          className=" box-icon"
                          onClick={() => {
                            setMvisible(true)
                            SetdeleteReport(reports.id_support)
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

export default Reports_list;