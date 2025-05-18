import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import 'src/scss/departments.scss'
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus } from '@coreui/icons'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}



//------------------------------------------------------------------------

const Colors = () => {

  //estado para guardar deptm
  //mejor dicho , es un arreglo que almacena los departamentos
  const [departments, setDepartments] = useState([])  

  //estado para la visibilidad del modal xd
  const [modalVisible, setModalVisible] = useState(false) 
  //almacena los datos del formulario , setFromdata funcion q se usa para actualizar los valores de formdata
  const [formData, setFormData] = useState({  
    name: '',                      
    address: '',
    phone: '',
    email: '',
    operational_status: '',
  })
  
  //esta asociado al lo anterior , es lo que guarda los datos del formulario 
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  // al presionar el boton save , este envia o guarda los datos -----------------------------------------------
  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.operational_status) {
      //verifica si los campos estan vacios , y si los estan manda un mensaje 
      alert('Please fill out all fields.')   
      return
    }

    {/*si el correo no tiene alrroba y el .com manda alerta*/}
    if (!formData.email.includes("@") || !formData.email.includes(".com")) {
      alert('Please enter a valid email address.')
      return
    }

        //departamentos :
        setDepartments([...departments,formData]) //aqui se guardan los departamentos previamente llenados , osea del formulario
        
        setFormData({  //limpia el formulario
          name: '',
          address: '',
          phone: '',
          email: '',
          operational_status: '',
        })
        setModalVisible(false) 
  }
  
  
  return (
    <>
    <div className='conteiner'>  {/* Un div para contener el cuadro del boton y la lista*/}
      <CCard className="c_button"> {/*contenedor del boton*/}
        <CCardHeader>
          Departments
        </CCardHeader>
        <CCardBody>
          <CButton className="button-add" onClick={() => setModalVisible(true)}>Add <CIcon icon={cilPlus} /> </CButton> {/*cada q se da un click se abre el modal*/}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>  {/*cada que se da un click se cierra el modal*/} 
            <CModalHeader className='Modal-header'>Add New Department</CModalHeader>
            <CModalBody className='Modal-body'>
              <CForm>               {/*dentro del modal se encuentra el formulario*/}
                <div className="mb-3">
                <CFormLabel htmlFor="name">Department Name:</CFormLabel> {/*formulario para agregar el nombre del departamento*/}
                <CFormInput 
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Department Name'
                  value={formData.name}
                  onChange={handleInputChange}
                ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="address">Address:</CFormLabel> {/*formulario para agregar la direccion del departamento*/}
                  <CFormInput
                    type='text'
                    id='address'
                    name='address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleInputChange}
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="phone">Phone:</CFormLabel> {/*formulario para agregar el telefono del departamento*/}
                  <CFormInput
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='Phone number'
                    value={formData.phone}
                    onChange={handleInputChange}
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="email">Email:</CFormLabel> {/*formulario para agregar el correo del departamento*/}
                  <CFormInput
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="operational_status">Operational status:</CFormLabel> {/*formulario para agregar el estado del departamento*/}
                  <CFormSelect
                    id='operational_status'
                    name='operational_status'
                    value={formData.operational_status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </div>
              </CForm>
            </CModalBody>
            <CModalFooter className='Modal-footer'> {/*footer del modal*/}
              <CButton className='button-close' onClick={() => setModalVisible(false)}>Close</CButton> {/*boton para cerrar el modal*/}
              <CButton className='button-save' onClick={handleSubmit}>Save</CButton> {/*boton para guardar los cambios*/}   
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>

    {/*creo otro Ccard que contendra una tabla */}
    {/*esta tabla almacena los departamentos guardados*/}

      <CCard className="c_list"> {/*contenedor de la lista*/}
        <CCardHeader>Management Departments</CCardHeader> 
        <CCardBody>
          <CTable striped hover>       {/*tabla con los departamentos*/}
            <CTableHead>
              <CTableRow>           {/*primera fila , en la cabezera , contiene los tipos de datos*/}
              <CTableHeaderCell><CIcon icon={cilListNumbered}/> </CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>       {/*ahora en el body de la tabla mostramos los datos almacenados*/}
              {/*map es una funcion que se usa para recorrer un arreglo , en este caso es el de departments*/}
              {/*el index , esta vaina es como un ciclo recorriendo un vector , department es el vector en cuestion y key es como un id , indentificador*/}
              {departments.map((department, index) => (          
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{department.name}</CTableDataCell>
                  <CTableDataCell>{department.address}</CTableDataCell>
                  <CTableDataCell>{department.phone}</CTableDataCell>
                  <CTableDataCell>{department.email}</CTableDataCell>
                  <CTableDataCell>{department.operational_status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      </div>
    </>
  )
}

export default Colors
