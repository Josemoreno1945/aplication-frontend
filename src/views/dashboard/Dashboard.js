import React, { use, useEffect, useState } from 'react'
import classNames from 'classnames'
import { CChartBar } from "@coreui/react-chartjs";
import { CChartPie } from "@coreui/react-chartjs";



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
import axios from 'axios';

const Dashboard = () => {

  const [assetsinv,setAssetsinv]=useState([])
  const [dpt,setDpt]=useState([])

  let   January=0
  let   February=0
  let   March=0
  let   April=0
  let   May=0
  let   June=0
  let   July=0
  let   August=0
  let    September=0
  let   Octuber=0
  let   November=0
  let   December=0


  let Vehicles=0
  let Equipment=0
  let Furniture=0


  useEffect(()=>{
    axios.get("http://localhost:5000/departments")
    .then(response => setDpt(response.data))
  },[])



  useEffect(()=>{
    axios.get("http://localhost:5000/inv0")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv1")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv2")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv3")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv4")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv5")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv6")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv7")
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    axios.get("http://localhost:5000/inv8")    
    .then(response => setAssetsinv(prev => [...prev, ...response.data]))
    
  },[])


  let cassets=0
  let cdpt=0

  for (let i=0;i<assetsinv.length;i++){
      cassets=cassets+1

      const partes = assetsinv[i].acquisition_date.split('-'); // partes[0]=dd, partes[1]=mm, partes[2]=yyyy
      const mes = partes[1]; 
      if (mes==="01"){
        January=January+1
      }
      if(mes==="02"){
        February=February+1
      }
      if(mes==="03"){
        March=March+1
      }
      if(mes==="04"){
        April=April+1
      }
      if(mes==="05"){
        May=May+1
      }
      if(mes==="06"){
        June=June+1
      }
      if(mes==="07"){
        July=July+1
      }
      if(mes==="08"){
        August=August+1
      }
      if(mes==="09"){
        September=September+1
      }
      if(mes==="10"){
        Octuber=Octuber+1
      }
      if(mes==="11"){
        November=November+1
      }
      if(mes==="12"){
        December=December+1
      }

      if(assetsinv[i].type==="vehicles"){
        Vehicles=Vehicles+1
      }
      if(assetsinv[i].type==="equipment"){
        Equipment=Equipment+1
      }
      if(assetsinv[i].type==="furniture"){
        Furniture=Furniture+1
      }
  }

  console.log(Vehicles)

  for(let i=0;i<dpt.length;i++){
    cdpt=cdpt+1
  }



  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

//........................................................................................

const Data = {
  labels: ["Vehicles", "Equipment", "Furniture"],
  datasets: [
    {
      data: [Vehicles, Equipment, Furniture],
      backgrounedColor: ["#FF6384", "#36A2EB", "#FFCE56",],
      hoverBackgroundColor: ["#FF4384", "#3692EB", "#FFC856",],
    },
  ],
};
const Options = {
  responsive: true,
  maintainAspectRatio: false,
  
};


  const Assets = {
    labels: ["January", "February", "March","April","May","June","July","August","September","Octuber","November","December"],
    datasets: [
      {
        label: "Assets added in the year",
        backgroundColor: ["#FFCE56"],
        data: [January,February,March,April,May,June,July,August,September,Octuber,November,December], // Valores de las categorías
      },
    ],
  };



  const assetsR = [
    { id: 1, name: "Computer", status: "Average" },
    { id: 2, name: "Projector", status: "Optimal" },
    { id: 3, name: "Desk", status: "Optimal" },
    { id: 4, name: "Chair", status: "Optimal" },
    { id: 5, name: "Printer", status: "Optimal" },
  ];
  
  

  


  return (
    <>
<CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>General Summary</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol >
                  <CRow>
                    <CCol >
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Assets</div>
                        <div className="fs-5 fw-semibold">{cassets}</div>
                      </div>
                    </CCol>
                    <CCol >
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Users
                        </div>
                        <div className="fs-5 fw-semibold">200</div>
                      </div>
                    </CCol>
                    <CCol >
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



      <CCard className='mb-4'>
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
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">January - April 2025</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart />
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>











      <CCard className='mb-4'>
        <CCardHeader>Assets Type</CCardHeader>

   
    <CChartPie data={Data} options={Options} />


      </CCard>
      














    </>
  )
}

export default Dashboard
