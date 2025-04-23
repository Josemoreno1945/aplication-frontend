import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody,CButton,CModal,CModalBody,CModalHeader,CModalFooter,CForm, CFormInput, CFormLabel, CFormSelect,
CTable,CTableHead,CTableRow,CTableHeaderCell,CTableBody,CTableDataCell} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import 'src/scss/departments.scss'
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus,cilX,cilPencil,cibDropbox,cilSearch} from '@coreui/icons'
import { Navigate, useNavigate } from 'react-router-dom'

//---------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------

const Departments = () => {

  const Navigate = useNavigate(); //esto es para entrar en paginas creo 

  //estado para editar 
  const [isEditing,setIsEditing] = useState(false) //inicia en falso ....esto son como banderas xd , programar god

  //variable que guarda el id del departamento a editar
  const [departmentId, setDepartmentId] = useState(null)  //en null pq no hay nada , solo se llena cuando se edita 



  //arreglo que almacena los departamentos
  const [departments, setDepartments] = useState([
          { 
            id:'666',
            name: 'Human Resources',                      
            address: 'unes, Av. 19 de Abril, San Cristóbal, piso 5',
            phone: '+58 212-7654321',
            email: 'hr.office@organization.com',
            operational_status: 'active',
        },
        {               
          id:'123',
          name: 'Technology Office',                      
          address: 'unes, Av. 19 de Abril, San Cristóbal, piso 5',
          phone: '+58 212-9876543',
          email: 'technology.office@organization.com',
          operational_status: 'active',
      },
      { 
        id:'321',
        name: 'National Assets Office',                      
        address: 'unes, Av. 19 de Abril, San Cristóbal, piso 5',
        phone: '+58 212-1234567',
        email: 'assets.office@organization.com',
        operational_status: 'active',
    },
    
  ]) 

  //estado para la visibilidad del modal de add xd
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
  
  //-------------------------------------------------------------------------------------------
  const [deleteDptid,setDeleteDptid]=useState("") //guarda el id del dpt a eliminar (se podra usar lo mismo de editar?????)

    //funcion para eliminar un registro de la tabla de departamentos
  const handleDelete = (id) => {
    const updatedDepartments = departments.filter((department)=>department.id!==id)  //comparamos el id seleccionado con los del vector
    setDepartments(updatedDepartments)  
    setMvisible(false)
  }

  //ahora una funcion para editar un registro 

  const Editregister = (index) => {
    setFormData(departments[index]) //accedo al departamento elegido 
    setIsEditing(true) //cambio el estado a true para editar
    setDepartmentId(index) //guarda el id del dpt
    setModalVisible(true) //muestra el modal o mejor dicho el formulario
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

    //-------------------------------------------------------------------
    //ahora in if , solo es cuando se esta editando , esto lo sabemos con banderas . cuando isediting sea true entra
    if (isEditing=== true) {
      const updatedDepartments = [...departments] //mete los departamentos a un nuevo arreglo 
      updatedDepartments[departmentId] = formData  //en update posicion 1 va guadar el nuevo registro , osea formdata guarda cada nuevo registro
      setDepartments(updatedDepartments) //actualiza el arreglo de departamentos
      setIsEditing(false) //cambia la bandera a false 
      setDepartmentId(null) //limpia la variable de id 
    }
  }
  
  
//--------------------------------------------------------------------------------------------

  const [search, setSearch] = useState("");  //verctor donde guarda las busquedas 
                                            //al buscar , lo que escribo se guarda aqui 

  let  filteredDepartment=[]  //let para que pueda cambiar los valores , aqui inicializo un vector vacio

  if (search===""){
    filteredDepartment=departments  //si no hay nada en el buscador , o mejor dicho en el vector, muestra todos los dpt 
  }else{
    filteredDepartment=departments.filter((dpt)=>                //y si si lo hay , filtro , por categorias , o etiquetas 
    dpt.name.toLowerCase().includes(search.toLowerCase())||
    dpt.address.toLowerCase().includes(search.toLowerCase())||  //reviso si el nombre , esta incluido en el vector search , osea si dpt manolito es igual a dpt manolito pero en el vector search
    dpt.phone.toLowerCase().includes(search.toLowerCase())||
    dpt.email.toLowerCase().includes(search.toLowerCase())||
    dpt.operational_status.toLowerCase().includes(search.toLowerCase())
    );
  }

  const [mvisible,setMvisible]=useState(false)



  return (
    <>
            {/*------------------------------------------------------------------------------------- */}
            <div className="buscador">
                <CForm className="d-flex">
                    <CFormInput
                    className="input-buttom-search"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    ></CFormInput>
                    <CButton className="search-buttom"><CIcon className="icon-search" icon={cilSearch} /></CButton>
                </CForm>
            </div>


 {/*------------------------------------------------------------------------------------- */}


            <CModal visible={mvisible} onClose={() => setMvisible(false)}>
            <CModalHeader>Delete department</CModalHeader>
            <CFormLabel>Are you sure you want to delete?</CFormLabel>
            <CModalBody>
            <CButton
              className='buttom-accept'
              onClick={() =>setMvisible(false)}
              >No</CButton>
            <CButton
              className='buttom-accept'
              onClick={() => 
                handleDelete(deleteDptid)}
              >Yes</CButton>
            </CModalBody>
          </CModal>





            {/*------------------------------------------------------------------------------------- */}
    <div className='conteiner'>  {/* Un div para contener el cuadro del boton y la lista*/}
      <div className="c_button"> {/*contenedor del boton*/}
        <CCardBody>
          <CButton className="button-add" onClick={() => {
          setFormData({
            name: '',                  //aqui hacemos q al darle click al add , siempre el formulario este vacio 
            address: '',
            phone: '',
            email: '',
            operational_status: '',
          });
          setModalVisible(true); //modal lo hacemos visible 
          setIsEditing(false);  //y verificamos q no se esta editando , q es solo add pues 
          }}  
          
          >Add <CIcon icon={cilPlus} /> </CButton> {/*cada q se da un click se abre el modal*/}
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
      </div>

    {/*creo otro Ccard que contendra una tabla */}
    {/*esta tabla almacena los departamentos guardados*/}

      <CCard className="c_list"> {/*contenedor de la lista*/}
        <CCardHeader>Management Departments</CCardHeader> 
        <CCardBody>
          <div  className="table-responsive">
          <CTable striped hover>     
            {/*tabla con los departamentos*/}
            <CTableHead>
              <CTableRow>  
              <CTableHeaderCell><CIcon icon={cilListNumbered}/> </CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>      
              {/*ahora en el body de la tabla mostramos los datos almacenados*/}
              {/*map es una funcion que se usa para recorrer un arreglo , en este caso es el de departments*/}
              {/*el index , esta vaina es como un ciclo recorriendo un vector , department es el vector en cuestion y key es como un id , indentificador*/}
              {filteredDepartment.map((department, index) => (          
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{department.name}</CTableDataCell>
                  <CTableDataCell>{department.address}</CTableDataCell>
                  <CTableDataCell>{department.phone}</CTableDataCell>
                  <CTableDataCell>{department.email}</CTableDataCell>
                  <CTableDataCell>{department.operational_status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                    className='button-inventory'
                    onClick={() => Navigate(`/inventory/${index}`)}  
                    > <CIcon icon={cibDropbox} /> </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                    className='button-edit'
                    onClick={() => Editregister(index)} 
                    > <CIcon icon={cilPencil} /> </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton 
                    className='button-delete'
                    onClick={() => 
                    { 
                      setDeleteDptid(department.id) //aqui guarda el id del dpt seleccionado (se usa department si s , pq abajo donde se recorre el vector esta asi)
                      setMvisible(true)}
                    }>
                    <CIcon icon={cilX} /> </CButton>
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

export default Departments
