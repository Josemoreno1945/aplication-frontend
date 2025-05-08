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

console.log("nose")

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
                    <CFormInput placeholder="Username"/>
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
                    <CFormInput placeholder="Department"/>
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
                    <CFormTextarea placeholder="Report">
                    </CFormTextarea>
                    </CInputGroup>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <CButton className="button_edit">
                        Accept
                    </CButton>
                </CCardFooter>
        </CCard>
        </>
    )
}

export default report