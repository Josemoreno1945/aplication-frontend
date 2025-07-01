import React, { use, useEffect, useState } from 'react'
import classNames from 'classnames'
import { CChartBar } from '@coreui/react-chartjs'
import { CChartPie } from '@coreui/react-chartjs'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import MainChart from './MainChart'
import axios from 'axios'

const Dashboard = () => {
  const [Users, setUsers] = useState([])
  const [Asset, setAsset] = useState([])
  const [Dpt, setDpt] = useState([])

  let January = 0
  let February = 0
  let March = 0
  let April = 0
  let May = 0
  let June = 0
  let July = 0
  let August = 0
  let September = 0
  let Octuber = 0
  let November = 0
  let December = 0

  let Vehicles = 0
  let Equipment = 0
  let Furniture = 0

  let cassets = 0
  let cdpt = 0
  let contuser = 0

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:4000/D_users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()

    const getDpt = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:4000/D_departments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDpt(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getDpt()

    const getAssets = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:4000/D_assets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setAsset(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAssets()
  }, [])

  console.log(Asset)

  for (let i = 0; i < Asset.length; i++) {
    cassets = cassets + 1

    const parts = Asset[i].acquisition_date.split('-') // partes[0]=dd, partes[1]=mm, partes[2]=yyyy
    const mes = parts[1]
    if (mes === '01') {
      January = January + 1
    }
    if (mes === '02') {
      February = February + 1
    }
    if (mes === '03') {
      March = March + 1
    }
    if (mes === '04') {
      April = April + 1
    }
    if (mes === '05') {
      May = May + 1
    }
    if (mes === '06') {
      June = June + 1
    }
    if (mes === '07') {
      July = July + 1
    }
    if (mes === '08') {
      August = August + 1
    }
    if (mes === '09') {
      September = September + 1
    }
    if (mes === '10') {
      Octuber = Octuber + 1
    }
    if (mes === '11') {
      November = November + 1
    }
    if (mes === '12') {
      December = December + 1
    }

    if (Asset[i].type === 'vehicles') {
      Vehicles = Vehicles + 1
    }
    if (Asset[i].type === 'equipment') {
      Equipment = Equipment + 1
    }
    if (Asset[i].type === 'furniture') {
      Furniture = Furniture + 1
    }
  }

  for (let i = 0; i < Dpt.length; i++) {
    cdpt = cdpt + 1
  }

  for (let i = 0; i < Users.length; i++) {
    contuser = contuser + 1
  }

  //........................................................................................

  const Data = {
    labels: ['Vehicles', 'Equipment', 'Furniture'],
    datasets: [
      {
        data: [Vehicles, Equipment, Furniture],
        backgrounedColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF4384', '#3692EB', '#FFC856'],
      },
    ],
  }
  const Options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  const Assets = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Octuber',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Assets added in the year',
        backgroundColor: ['#FFCE56'],
        data: [
          January,
          February,
          March,
          April,
          May,
          June,
          July,
          August,
          September,
          Octuber,
          November,
          December,
        ], // Valores de las categorías
      },
    ],
  }

  const assetsR = [
    { id: 1, name: 'Computer', status: 'Average' },
    { id: 2, name: 'Projector', status: 'Optimal' },
    { id: 3, name: 'Desk', status: 'Optimal' },
    { id: 4, name: 'Chair', status: 'Optimal' },
    { id: 5, name: 'Printer', status: 'Optimal' },
  ]

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>General Summary</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CRow>
                    <CCol>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Assets</div>
                        <div className="fs-5 fw-semibold">{cassets}</div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Users</div>
                        <div className="fs-5 fw-semibold">{contuser}</div>
                      </div>
                    </CCol>
                    <CCol>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Departments</div>
                        <div className="fs-5 fw-semibold">{cdpt}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>Assets added</CCardHeader>
        <CCardBody>
          <CChartBar data={Assets} labels="assets" />

          <div className="table-responsive">
            <CCardHeader>Recently added assets</CCardHeader>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Id</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {assetsR.map((ast) => (
                  <CTableRow key={ast.id}>
                    <CTableDataCell>{ast.id}</CTableDataCell>
                    <CTableDataCell>{ast.name}</CTableDataCell>
                    <CTableDataCell>{ast.status}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Assets Type</CCardHeader>

        <CChartPie data={Data} options={Options} />
      </CCard>
    </>
  )
}

export default Dashboard
