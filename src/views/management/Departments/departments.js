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
import 'src/scss/departments.scss'
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
} from '@coreui/icons'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
//-----------------------------------------------------------------------------------------------------

const Departments = () => {
  const Navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [mvisible, setMvisible] = useState(false)
  const [departments, setDepartments] = useState([])
  const [editmodalVisible, seteditModalVisible] = useState(false)
  const [codigoEditar, setCodigoEditar] = useState(null)

  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    operational_status: '',
  })

  const InputChangedata = (e) => {
    //e es como un parametro
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value }) //deja todos los valores de formdata pero dejando el nuevo valor , osea por eso el name , eso variaria , puede ser name , addres etc
  }

  //-------------------------------------------------------------------------------------------
  /*
  //funcion para eliminar un registro de la tabla de departamentos
  const Delete = (id) => {
    const updatedDepartments = departments.filter((department) => department.id !== id) //comparamos el id seleccionado con los del vector , y si son iguales lo descarta, ahora estaria entre comillas eliminado el que seleccione
    setDepartments(updatedDepartments)
    setMvisible(false)
    axios
      .delete(`http://localhost:5000/departments/${id}`) //esas comillas si o si xd
      .then(() => console.log(`Departamento con ID ${id} eliminado`))
      .catch((error) => console.error('Error al eliminar departamento:', error))
  }
*/

  /*
  // al presionar el boton save , este envia o guarda los datos -----------------------------------------------
  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.operational_status
    ) {
      alert('Please fill out all fields.')
      return
    }
    {
    }
    if (!formData.email.includes('@') || !formData.email.includes('.com')) {
      alert('Please enter a valid email address.')
      return
    }

    //---------------------------------------------------------------------------------------------------
    //envia los datos del formulario al json , asi que hay un post , pero tambien un get para que automaticamente me muestre los datos

    axios
      .post('http://localhost:5000/departments', formData)
      .then(() => axios.get('http://localhost:5000/departments'))
      .then((response) => {
        setDepartments(response.data)
      })
      .catch((error) => console.error('Error al agregar departamento:', error))

    //-------------------------------------------------------------------
    //ahora in if , solo es cuando se esta editando , esto lo sabemos con banderas . cuando isediting sea true entra
    if (isEditing === true) {
      axios.put(`http://localhost:5000/departments/${departmentId}`, formData).then(() => {
        const updatedDepartments = [...departments] //mete los departamentos a un nuevo arreglo
        const index = updatedDepartments.findIndex((department) => department.id === departmentId)
        if (index !== -1) {
          updatedDepartments[index] = formData
          setDepartments(updatedDepartments) // Actualiza el estado con los departamentos editados
        }
        setIsEditing(false) //cambia la bandera a false
        setDepartmentId(null) //limpia la variable de id
      })
    }

    setFormData({
      //limpia el formulario
      name: '',
      address: '',
      phone: '',
      email: '',
      operational_status: '',
    })
    setModalVisible(false)
  }
*/
  //--------------------------------------------------------------------------------------------

  let filteredDepartment = [] //let para que pueda cambiar los valores , aqui inicializo un vector vacio

  if (search === '') {
    filteredDepartment = departments //si no hay nada en el buscador , o mejor dicho en el vector, muestra todos los dpt
  } else {
    filteredDepartment = departments.filter(
      (
        dpt, //y si si lo hay , filtro , por categorias , o etiquetas
      ) =>
        dpt.name.toLowerCase().includes(search.toLowerCase()) ||
        dpt.address.toLowerCase().includes(search.toLowerCase()) || //reviso si el nombre , esta incluido en el vector search , osea si dpt manolito es igual a dpt manolito pero en el vector search
        dpt.phone.toLowerCase().includes(search.toLowerCase()) ||
        dpt.email.toLowerCase().includes(search.toLowerCase()) ||
        dpt.operational_status.toLowerCase().includes(search.toLowerCase()),
    )
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('http://localhost:4000/departments', {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token en la cabecera
        },
      })
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error al obtener datos', error))
  }, [])

  const getDepartments = async () => {
    try {
      const token = localStorage.getItem('token')
      axios
        .get('http://localhost:4000/departments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setDepartments(response.data))
    } catch {
      console.error('Error al obtener datos', error)
    }
  }

  //ahora una funcion para editar un registro

  const putDepartments = async (id_departments) => {
    try {
      const token = localStorage.getItem('token')
      console.log(id_departments)
      await axios.put(`http://localhost:4000/departments/${id_departments}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      seteditModalVisible(false)
      getDepartments()
    } catch (err) {
      console.error('Error al obtener datos', err)
      let msg
      if (
        err.response &&
        err.response.data &&
        Array.isArray(err.response.data.errors) &&
        err.response.data.errors.length > 0
      ) {
        msg = err.response.data.errors[0].message
      } else if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error
      }
      setErrorMessage(msg)
      setErrorModalVisible(true)
    }
  }

  return (
    <>
      <CModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)}>
        <CModalHeader>Error</CModalHeader>
        <CModalBody>
          <div>{errorMessage}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setErrorModalVisible(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

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
          <CButton className="search-buttom">
            <CIcon className="icon-search" icon={cilSearch} />
          </CButton>
        </CForm>
      </div>

      {/*------------------------------------------------------------------------------------- */}

      <CModal visible={mvisible} onClose={() => setMvisible(false)}>
        <CModalHeader className="Modal-header">Delete department</CModalHeader>
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

      <CModal
        visible={editmodalVisible}
        onClose={() => {
          seteditModalVisible(false)
        }}
      >
        <div className="ccard-box mb-4">
          <CCard>
            <CCardHeader>Add New Department</CCardHeader>
            <CCardBody>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Department Name:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Department Name"
                        value={formData.name}
                        onChange={InputChangedata}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Email:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={InputChangedata}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Phone</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <CFormInput
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={InputChangedata}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Operational status:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
                      <CFormSelect
                        id="operational_status"
                        name="operational_status"
                        value={formData.operational_status}
                        onChange={InputChangedata}
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Address:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilMap} />
                      </CInputGroupText>
                      <CFormTextarea
                        rows={3}
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={InputChangedata}
                      ></CFormTextarea>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CCardBody>
            <CCardFooter>
              <div className="button-box">
                <CButton
                  className="button-register"
                  onClick={() => {
                    putDepartments(codigoEditar)
                  }}
                >
                  Editar
                </CButton>
              </div>
            </CCardFooter>
          </CCard>
        </div>
      </CModal>

      {/*------------------------------------------------------------------------------------- */}
      <div className="conteiner mb-4">
        <CCard className="c_list">
          {' '}
          <CCardHeader className="card-header">
            <div>Management Departments</div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable striped hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilListNumbered} />{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Address</CTableHeaderCell>
                    <CTableHeaderCell>Phone</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>inventory</CTableHeaderCell>
                    <CTableHeaderCell>Edit</CTableHeaderCell>
                    <CTableHeaderCell>Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
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
                        {' '}
                        <CButton
                          className="button-inventory  box-icon"
                          onClick={() => Navigate(`/management/Departments/inventory/${index}`)}
                        >
                          {' '}
                          <CIcon icon={cibDropbox} className="text-success" />{' '}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="button-edit box-icon"
                          onClick={() => {
                            setCodigoEditar(department.id_departments)
                            setFormData({
                              name: department.name,
                              address: department.address,
                              phone: department.phone,
                              email: department.email,
                              operational_status: department.operational_status,
                            })
                            seteditModalVisible(true)
                          }}
                        >
                          {' '}
                          <CIcon icon={cilPencil} className="text-info" />{' '}
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="button-delete  box-icon"
                          onClick={() => {
                            setMvisible(true)
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

export default Departments
