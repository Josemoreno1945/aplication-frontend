import React from 'react'
import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CTableHead, CTableRow , CTableHeaderCell } from '@coreui/react'
import { DocsLink } from 'src/components'




const Users = () => {
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

        <CTable>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>name</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
        </CTable>
        </>
    )
}

export default Users
