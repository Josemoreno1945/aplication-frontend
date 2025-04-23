import React from 'react'
import classNames from 'classnames'
import { CChartBar } from "@coreui/react-chartjs";
import { CChartPie } from "@coreui/react-chartjs";
import { CSpinner } from '@coreui/react'





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

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
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
      data: [40, 60, 50],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56",],
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
        data: [10,20,30,10,40,10,10,,5,10,,3], // Valores de las categorías
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
                        <div className="fs-5 fw-semibold">90</div>
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
                        <div className="fs-5 fw-semibold">12</div>
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
                          <CTableRow>
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
