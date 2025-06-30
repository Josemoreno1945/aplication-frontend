import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CFormLabel,
  CFormSelect,
  CForm,
  CModalFooter,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import 'src/scss/inventory.scss'
import CIcon from '@coreui/icons-react'
import {
  cilListNumbered,
  cilPlus,
  cilX,
  cilPencil,
  cibDropbox,
  cilArrowCircleLeft,
  cilXCircle,
} from '@coreui/icons'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const Inventory = () => {
  const Navigate = useNavigate()

  //estado para guardar el id del item o bien
  const [itemId, setItemId] = useState(null)

  const [openmodal, setOpenModal] = useState(false)
  //obtiene el id del dpto desde la url, y lo guarda en una variable para usarlo en el inventario
  //USE IA AL 100% AQUI (REPASAR)
  const { departmentId } = useParams()

  const [errorMessage, setErrorMessage] = useState('')
  const [messageEdit, setmessageEdit] = useState('')
  const [messageDelete, setmessageDelete] = useState('')

  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [msgDeleteModal, setmsgDeleteModal] = useState(false)
  const [msgEditModal, setmsgEditModal] = useState(false)

  //-------------------------------------------------------------------------------------------------------
  //aqui guardo los datos al llenar un formulario
  //osea lleno uno , se llena formdata y despues lo paso a inventory(otro arreglo)
  const [formData, setFormData] = useState([
    {
      id_assets: '',
      type: '',
      classification: '',
      description: '',
      color: '',
      brand: '',
      model: '',
      serial: '',
      height: '',
      width: '',
      depth: '',
      plate: '',
      bodywork: '',
      engine: '',
      year_of_the_vehicule: '',
      acquisition_value: '',
      use_status: '',
      conservation_status: '',
      observation: '',
      physical_location: '',
      direction_dependency: '',
      level: '',
      analyst: '',
      acquisition_date: '',
    },
  ])

  const [inventory, setInventory] = useState([])
  const [deleteitemid, setDeleteitemid] = useState('')
  const [mvisible, setMvisible] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          `http://localhost:4000/AssetsDepartments/${departmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setInventory(response.data)
      } catch (error) {
        setInventory([])
        console.error(`No se encontró el inventario del departamento ${departmentId}`, error)
      }
    }

    if (departmentId !== null && departmentId !== undefined) {
      fetchInventory()
    }
  }, [departmentId])

  //---------------------------------------------------------------------------------------------------------------------------------------------

  const Getasset = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:4000/AssetsDepartments/${departmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setInventory(response.data)
    } catch (err) {
      setInventory([])
      console.error(`No se encontró el inventario del departamento ${departmentId}`, err)
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------

  const Putasset = async (id) => {}

  //----------------------------------------------------------------------------------------------------------------------

  const Deleteasset = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:4000/assets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      Getasset()
      setMvisible(false)
      setmsgDeleteModal(true)
      setmessageDelete(response.data.message)
    } catch (err) {
      console.log('Error al eliminar departamento:', err)
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------

  const Postasset = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:4000/assets', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setInventory(response.data)
    } catch (err) {
      console.error('Error al registrar asset:', err)
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

      {/*Modal de eliminar -------------------------------------------------------------------------------------------------------------*/}
      <CModal visible={mvisible} onClose={() => setMvisible(false)}>
        <CModalHeader className="Modal-header">Delete item</CModalHeader>
        <CFormLabel className="label-delete">Are you sure you want to delete?</CFormLabel>
        <CModalBody>
          <div className="box-buttom-accept">
            <CButton className="buttom-accept" onClick={() => setMvisible(false)}>
              No
            </CButton>
            <CButton className="buttom-accept" onClick={() => Deleteasset(deleteitemid)}>
              Yes
            </CButton>
          </div>
        </CModalBody>
      </CModal>

      <CModal visible={msgDeleteModal} onClose={() => setmsgDeleteModal(false)}>
        <CModalBody>
          <div>{String(messageDelete)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setmsgDeleteModal(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      {/*Modal de agregar -------------------------------------------------------------------------------------------------------------*/}
      <div className="container">
        <CModal visible={openmodal} onClose={() => setOpenModal(false)}>
          <CModalHeader className="Modal-header">Add new asset</CModalHeader>
          <CModalBody>
            <CForm>
              <CFormLabel htmlFor="id_assets">id:</CFormLabel>
              <CFormInput
                type="number"
                id="id"
                name="id"
                placeholder="Identification of the asset"
                value={formData.id}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="type">Type:</CFormLabel>
              <CFormSelect id="type" name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Select the asset type</option>
                <option value="furniture">Furniture</option>
                <option value="vehicles">Vehicles</option>
                <option value="equiment">Equipment</option>
              </CFormSelect>
              <CFormLabel htmlFor="classification">Classification:</CFormLabel>
              <CFormInput
                type="text"
                id="classification"
                name="classification"
                placeholder="Clasification"
                value={formData.classification}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="description">Description:</CFormLabel>
              <CFormInput
                type="text"
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="color">Color:</CFormLabel>
              <CFormInput
                type="text"
                id="color"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="brand">Brand:</CFormLabel>
              <CFormInput
                type="text"
                id="brand"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="model">Model:</CFormLabel>
              <CFormInput
                type="text"
                id="model"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="serial">Serial:</CFormLabel>
              <CFormInput
                type="text"
                id="serial"
                name="serial"
                placeholder="Serial"
                value={formData.serial}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="height">Height:</CFormLabel>
              <CFormInput
                type="number"
                id="height"
                name="height"
                placeholder="Height"
                value={formData.height}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="width">Width:</CFormLabel>
              <CFormInput
                type="number"
                id="width"
                name="width"
                placeholder="Width"
                value={formData.width}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="depth">Depth:</CFormLabel>
              <CFormInput
                type="number"
                id="depth"
                name="depth"
                placeholder="Depth"
                value={formData.depth}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="plate">Plate:</CFormLabel>
              <CFormInput
                type="text"
                id="plate"
                name="plate"
                placeholder="Plate"
                value={formData.plate}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="bodywork">Bodywork:</CFormLabel>
              <CFormInput
                type="text"
                id="bodywork"
                name="bodywork"
                placeholder="Bodywork"
                value={formData.bodywork}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="engine">Engine:</CFormLabel>
              <CFormInput
                type="text"
                id="engine"
                name="engine"
                placeholder="Engine"
                value={formData.engine}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="year_of_the_vehicule">Year of the vehicule:</CFormLabel>
              <CFormInput
                type="number"
                id="year_of_the_vehicule"
                name="year_of_the_vehicule"
                placeholder="Year of the vehicule"
                value={formData.year_of_the_vehicule}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="acquisition_value">Acquisition value:</CFormLabel>
              <CFormInput
                type="number"
                id="acquisition_value"
                name="acquisition_value"
                placeholder="Acquisition value"
                value={formData.acquisition_value}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="use_status">Use status:</CFormLabel>
              <CFormSelect
                id="use_status"
                name="use_status"
                value={formData.use_status}
                onChange={handleInputChange}
              >
                <option value="">Select status</option>
                <option value="average">Average</option>
                <option value="appalling">Appalling</option>
                <option value="optimal">Optimal</option>
              </CFormSelect>
              <CFormLabel htmlFor="conservation_status">Conservation status:</CFormLabel>
              <CFormSelect
                id="conservation_status"
                name="conservation_status"
                value={formData.conservation_status}
                onChange={handleInputChange}
              >
                <option value="">Select conservation status</option>
                <option value="inoperative">Inoperative</option>
                <option value="operational">Operational</option>
              </CFormSelect>
              <CFormLabel htmlFor="observation">Observation</CFormLabel>
              <CFormInput
                type="text"
                id="observation"
                name="observation"
                placeholder="Observation"
                value={formData.observation}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="physical_location">Physical location</CFormLabel>
              <CFormInput
                type="text"
                id="physical_location"
                name="physical_location"
                placeholder="Physical location"
                value={formData.physical_location}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="direction_dependency">Direction dependency</CFormLabel>
              <CFormInput
                type="text"
                id="direction_dependency"
                name="direction_dependency"
                placeholder="Direction dependency"
                value={formData.direction_dependency}
                onChange={handleInputChange}
              ></CFormInput>
              <CFormLabel htmlFor="level">Level</CFormLabel>
              <CFormInput
                type="text"
                id="level"
                name="level"
                placeholder="Level"
                value={formData.level}
                onChange={handleInputChange}
              ></CFormInput>

              <CFormLabel htmlFor="analyst">Analyst</CFormLabel>
              <CFormInput
                type="text"
                id="analyst"
                name="analyst"
                placeholder="Analyst"
                value={formData.analyst}
                onChange={handleInputChange}
              ></CFormInput>

              <CFormLabel htmlFor="acquisition_date">acquisition date</CFormLabel>
              <CFormInput
                type="date"
                id="acquisition_date"
                name="acquisition_date"
                placeholder="acquisition_date"
                value={formData.acquisition_date}
                onChange={handleInputChange}
              ></CFormInput>
            </CForm>
          </CModalBody>
          <CModalFooter className="Modal-footer">
            <CButton className="buttom-footer" onClick={() => handleSubmit()}>
              Save
            </CButton>
            <CButton className="buttom-footer" onClick={() => setOpenModal(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/*TABLA -------------------------------------------------------------------------------------------------------------*/}

        <CCard className="mb-4">
          <CCardHeader className="card-header">
            <div>Inventory from department:{departmentId}</div>

            <div>
              <CButton
                className="buttom-add"
                onClick={() => {
                  setFormData({
                    id_assets: '',
                    type: '',
                    classification: '',
                    description: '',
                    color: '',
                    brand: '',
                    model: '',
                    serial: '',
                    height: '',
                    width: '',
                    depth: '',
                    plate: '',
                    bodywork: '',
                    engine: '',
                    year_of_the_vehicule: '',
                    acquisition_value: '',
                    use_status: '',
                    conservation_status: '',
                    observation: '',
                    physical_location: '',
                    direction_dependency: '',
                    level: '',
                    analyst: '',
                    acquisition_date: '',
                  })
                  setIsEditing(false)
                  setOpenModal(true)
                }}
              >
                <CIcon icon={cilPlus} className="buttom-icon" /> Add
              </CButton>
              <CButton className="buttom-add" onClick={() => Navigate(`/management/Departments`)}>
                <CIcon icon={cilArrowCircleLeft} className="buttom-icon" /> Back
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="table-responsive">
              <CTable className="vertical-bordered-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell className="column">ID</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Classification</CTableHeaderCell>
                    <CTableHeaderCell className="column">Description</CTableHeaderCell>
                    <CTableHeaderCell>Color</CTableHeaderCell>
                    <CTableHeaderCell>Brand</CTableHeaderCell>
                    <CTableHeaderCell>Model</CTableHeaderCell>
                    <CTableHeaderCell>Serial</CTableHeaderCell>
                    <CTableHeaderCell>Height</CTableHeaderCell>
                    <CTableHeaderCell>Width</CTableHeaderCell>
                    <CTableHeaderCell>Depth</CTableHeaderCell>
                    <CTableHeaderCell>Plate</CTableHeaderCell>
                    <CTableHeaderCell>Bodywork</CTableHeaderCell>
                    <CTableHeaderCell>Engine</CTableHeaderCell>
                    <CTableHeaderCell className="column">Year of the vehicule</CTableHeaderCell>
                    <CTableHeaderCell className="column">Acquisition value</CTableHeaderCell>
                    <CTableHeaderCell className="column">Use status</CTableHeaderCell>
                    <CTableHeaderCell className="column">Conservation status</CTableHeaderCell>
                    <CTableHeaderCell className="column">Observation</CTableHeaderCell>
                    <CTableHeaderCell className="column">Physical location</CTableHeaderCell>
                    <CTableHeaderCell className="column">Direction dependency</CTableHeaderCell>
                    <CTableHeaderCell>Level</CTableHeaderCell>
                    <CTableHeaderCell>Analyst</CTableHeaderCell>
                    <CTableHeaderCell>Edit</CTableHeaderCell>
                    <CTableHeaderCell>Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Array.isArray(inventory) && inventory.length > 0 ? (
                    inventory.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell className="column">{item.id_assets}</CTableDataCell>
                        <CTableDataCell>{item.type}</CTableDataCell>
                        <CTableDataCell>{item.classification}</CTableDataCell>
                        <CTableDataCell className="column">{item.description}</CTableDataCell>
                        <CTableDataCell>{item.color}</CTableDataCell>
                        <CTableDataCell>{item.brand}</CTableDataCell>
                        <CTableDataCell>{item.model}</CTableDataCell>
                        <CTableDataCell>{item.serial}</CTableDataCell>
                        <CTableDataCell>{item.height}</CTableDataCell>
                        <CTableDataCell>{item.width}</CTableDataCell>
                        <CTableDataCell>{item.depth}</CTableDataCell>
                        <CTableDataCell>{item.plate}</CTableDataCell>
                        <CTableDataCell>{item.bodywork}</CTableDataCell>
                        <CTableDataCell>{item.engine}</CTableDataCell>
                        <CTableDataCell className="column">
                          {item.year_of_the_vehicule}
                        </CTableDataCell>
                        <CTableDataCell className="column">{item.acquisition_value}</CTableDataCell>
                        <CTableDataCell className="column">{item.use_status}</CTableDataCell>
                        <CTableDataCell className="column">
                          {item.conservation_status}
                        </CTableDataCell>
                        <CTableDataCell className="column">{item.observation}</CTableDataCell>
                        <CTableDataCell className="column">{item.physical_location}</CTableDataCell>
                        <CTableDataCell className="column">
                          {item.direction_dependency}
                        </CTableDataCell>
                        <CTableDataCell>{item.level}</CTableDataCell>
                        <CTableDataCell>{item.analyst}</CTableDataCell>
                        <CTableDataCell>
                          <CButton className="box-icon" onClick={() => Putasset(item.id_assets)}>
                            <CIcon icon={cilPencil} className="text-info" />
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            className="box-icon"
                            onClick={() => {
                              setDeleteitemid(item.id_assets)
                              setMvisible(true)
                            }}
                          >
                            <CIcon icon={cilXCircle} className="text-danger" />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={24} className="text-center">
                        {'Assets not foud'}
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </div>
    </>
  )
}

export default Inventory
