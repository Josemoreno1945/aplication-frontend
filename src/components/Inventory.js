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
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
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
  cilOptions,
  cilTextSquare,
  cilSquare,
  cilCommentSquare,
  cilPen,
  cilCalendar,
} from '@coreui/icons'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { number } from 'prop-types'

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

  const [InventoryID, setInventoryID] = useState('')

  //-------------------------------------------------------------------------------------------------------
  //aqui guardo los datos al llenar un formulario
  //osea lleno uno , se llena formdata y despues lo paso a inventory(otro arreglo)
  const [formData, setFormData] = useState({
    id_inventory: '',
    type: '',
    classification: '',
    description: '',
    color: '',
    brand: '',
    model: '',
    serial: '',
    height: 0,
    width: 0,
    depth: 0,
    plate: '',
    bodywork: '',
    engine: '',
    year_of_the_vehicle: '',
    acquisition_value: 0,
    use_status: '',
    conservation_status: '',
    observation: '',
    physical_location: '',
    direction_dependency: '',
    level: '',
    analyst: '',
    acquisition_date: '',
  })

  const delete_formdata = () => {
    setFormData({
      id_inventory: '',
      type: '',
      classification: '',
      description: '',
      color: '',
      brand: '',
      model: '',
      serial: '',
      height: 0,
      width: 0,
      depth: 0,
      plate: '',
      bodywork: '',
      engine: '',
      year_of_the_vehicle: '',
      acquisition_value: 0,
      use_status: '',
      conservation_status: '',
      observation: '',
      physical_location: '',
      direction_dependency: '',
      level: '',
      analyst: '',
      acquisition_date: '',
    })
  }

  const [RegisterModalVisible, setRegisterModalVisible] = useState(false)
  const [Registermsg, setRegistermsg] = useState('')

  const [inventory, setInventory] = useState([])
  const [deleteitemid, setDeleteitemid] = useState('')
  const [mvisible, setMvisible] = useState(false)

  const [modal0, Setmodal0] = useState(false)
  const [modal1, Setmodal1] = useState(false)
  const [modal2, Setmodal2] = useState(false)
  const [modal3, Setmodal3] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [editAssetId, setEditAssetId] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    const newValue = type === 'number' ? Number(value) : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleEditAsset = (asset) => {
    setFormData({
      id_inventory: asset.id_inventory,
      type: asset.type,
      classification: asset.classification,
      description: asset.description,
      color: asset.color,
      brand: asset.brand,
      model: asset.model,
      serial: asset.serial,
      height: asset.height,
      width: asset.width,
      depth: asset.depth,
      plate: asset.plate,
      bodywork: asset.bodywork,
      engine: asset.engine,
      year_of_the_vehicle: asset.year_of_the_vehicle,
      acquisition_value: asset.acquisition_value,
      use_status: asset.use_status,
      conservation_status: asset.conservation_status,
      observation: asset.observation,
      physical_location: asset.physical_location,
      direction_dependency: asset.direction_dependency,
      level: asset.level,
      analyst: asset.analyst,
      acquisition_date: asset.acquisition_date,
    })
    setIsEditMode(true)
    setEditAssetId(asset.id_assets)
    // Abre el modal correspondiente según el tipo
    if (asset.type === 'furniture') {
      Setmodal1(true)
    } else if (asset.type === 'vehicles') {
      Setmodal2(true)
    } else if (asset.type === 'equipment') {
      Setmodal3(true)
    }
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

    const GetInvID = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:4000/assetsinventory/${departmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const inventoryId = response.data.id_inventory

        setInventoryID(inventoryId)
      } catch (err) {
        setInventory([])
        console.error(`No se encontró el inventario del departamento ${departmentId}`, err)
      }
    }

    GetInvID()
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

  const Putasset = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:4000/assets/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      Getasset()
      setmsgEditModal(true)
      setmessageEdit(response.data.message)
      setIsEditMode(false)
      setEditAssetId(null)
      Setmodal1(false)
      Setmodal2(false)
      Setmodal3(false)
      delete_formdata()
    } catch (err) {}
  }

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
      //esta vaina me pone el inventoryid y convierte esos datosa number en el formdata
      const dataToSend = {
        ...formData,
        id_inventory: InventoryID,
        depth: Number(formData.depth),
        height: Number(formData.height),
        width: Number(formData.width),
        year_of_the_vehicle: Number(formData.year_of_the_vehicle),
        acquisition_value: Number(formData.acquisition_value),
      }

      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:4000/assets', dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      setInventory(response.data)
      Getasset()
      delete_formdata()
      setRegistermsg(response.data.message)
      setRegisterModalVisible(true)
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
      setOpenModal(false)
    }
  }

  return (
    <>
      <CModal visible={msgEditModal} onClose={() => setmsgEditModal(false)}>
        <CModalBody>
          <div>{String(messageEdit)}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setmsgEditModal(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

      <CModal visible={RegisterModalVisible} onClose={() => setRegisterModalVisible(false)}>
        <CModalBody>
          <div>{Registermsg}</div>
        </CModalBody>
        <CModalFooter>
          <div className="button-box">
            <CButton className="button-register" onClick={() => setRegisterModalVisible(false)}>
              Cerrar
            </CButton>
          </div>
        </CModalFooter>
      </CModal>

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

      {/*Modal 0 de elegir el tipo -------------------------------------------------------------------------------------------------------------*/}

      <div className="container">
        <CModal
          visible={modal0}
          onClose={() => {
            Setmodal0(false)
          }}
        >
          <CModalHeader className="Modal-header">Add new asset</CModalHeader>
          <CModalBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Type</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
                      <CFormSelect
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                      >
                        <option value="">Select the asset type</option>
                        <option value="furniture">Furniture</option>
                        <option value="vehicles">Vehicles</option>
                        <option value="equipment">Equipment</option>
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter className="Modal-footer">
            <CButton
              className="buttom-footer"
              onClick={() => {
                Setmodal0(false)
                if (formData.type === 'furniture') {
                  Setmodal1(true)
                }
                if (formData.type === 'vehicles') {
                  Setmodal2(true)
                }
                if (formData.type === 'equipment') {
                  Setmodal3(true)
                }
              }}
            >
              Continue
            </CButton>
            <CButton
              className="buttom-footer"
              onClick={() => {
                Setmodal0(false)
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/*Modal 1 de furniture -------------------------------------------------------------------------------------------------------------*/}

        <CModal visible={modal1} onClose={() => Setmodal1(false)}>
          <CModalHeader className="Modal-header">Add new asset :furniture</CModalHeader>
          <CModalBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Clasification:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="classification"
                        name="classification"
                        placeholder="Clasification"
                        value={formData.classification}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Description</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCommentSquare} />
                      </CInputGroupText>
                      <CFormTextarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></CFormTextarea>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Color:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Brand</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Model</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Serial</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="serial"
                        name="serial"
                        placeholder="Serial"
                        value={formData.serial}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Height</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="height"
                        name="height"
                        placeholder="Height"
                        value={formData.height}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Width</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="width"
                        name="width"
                        placeholder="Width"
                        value={formData.width}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Depth</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="depth"
                        name="depth"
                        placeholder="Depth"
                        value={formData.depth}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Acquisition value</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="acquisition_value"
                        name="acquisition_value"
                        placeholder="Acquisition value"
                        value={formData.acquisition_value}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Use status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Conservation status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Observation</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="observation"
                        name="observation"
                        placeholder="Observation"
                        value={formData.observation}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Physical location</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="physical_location"
                        name="physical_location"
                        placeholder="Physical location"
                        value={formData.physical_location}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Direction dependency</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="direction_dependency"
                        name="direction_dependency"
                        placeholder="Direction dependency"
                        value={formData.direction_dependency}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Level</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="level"
                        name="level"
                        placeholder="Level"
                        value={formData.level}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Analyst</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="analyst"
                        name="analyst"
                        placeholder="Analyst"
                        value={formData.analyst}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Acquisition date</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput
                        type="date"
                        id="acquisition_date"
                        name="acquisition_date"
                        placeholder="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter className="Modal-footer">
            <CButton
              className="buttom-footer"
              onClick={() => {
                if (isEditMode) {
                  Putasset(editAssetId)
                } else {
                  Postasset()
                }
                Setmodal1(false)
              }}
            >
              Save
            </CButton>
            <CButton
              className="buttom-footer"
              onClick={() => {
                Setmodal1(false)
                setIsEditMode(false)
                setEditAssetId(null)
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/*Modal 2 de vehicle -------------------------------------------------------------------------------------------------------------*/}

        <CModal
          visible={modal2}
          onClose={() => {
            Setmodal2(false)
          }}
        >
          <CModalHeader className="Modal-header">Add new asset : Vehicle</CModalHeader>
          <CModalBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Plate</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="plate"
                        name="plate"
                        placeholder="Plate"
                        value={formData.plate}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Bodywork</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="bodywork"
                        name="bodywork"
                        placeholder="Bodywork"
                        value={formData.bodywork}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Engine</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="engine"
                        name="engine"
                        placeholder="Engine"
                        value={formData.engine}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>year of the vehicle</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="year_of_the_vehicle"
                        name="year_of_the_vehicle"
                        placeholder="Year of the vehicle"
                        value={formData.year_of_the_vehicle}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Clasification:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="classification"
                        name="classification"
                        placeholder="Clasification"
                        value={formData.classification}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Description</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCommentSquare} />
                      </CInputGroupText>
                      <CFormTextarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></CFormTextarea>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Color:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Brand</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Model</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Serial</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="serial"
                        name="serial"
                        placeholder="Serial"
                        value={formData.serial}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Height</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="height"
                        name="height"
                        placeholder="Height"
                        value={formData.height}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Width</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="width"
                        name="width"
                        placeholder="Width"
                        value={formData.width}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Acquisition value</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="acquisition_value"
                        name="acquisition_value"
                        placeholder="Acquisition value"
                        value={formData.acquisition_value}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Use status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Conservation status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Observation</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="observation"
                        name="observation"
                        placeholder="Observation"
                        value={formData.observation}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Physical location</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="physical_location"
                        name="physical_location"
                        placeholder="Physical location"
                        value={formData.physical_location}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Direction dependency</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="direction_dependency"
                        name="direction_dependency"
                        placeholder="Direction dependency"
                        value={formData.direction_dependency}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Level</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="level"
                        name="level"
                        placeholder="Level"
                        value={formData.level}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Analyst</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="analyst"
                        name="analyst"
                        placeholder="Analyst"
                        value={formData.analyst}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Acquisition date</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput
                        type="date"
                        id="acquisition_date"
                        name="acquisition_date"
                        placeholder="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter className="Modal-footer">
            <CButton
              className="buttom-footer"
              onClick={() => {
                if (isEditMode) {
                  Putasset(editAssetId)
                } else {
                  Postasset()
                }
                Setmodal2(false)
              }}
            >
              Save
            </CButton>
            <CButton
              className="buttom-footer"
              onClick={() => {
                Setmodal2(false)
                setIsEditMode(false)
                setEditAssetId(null)
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/*Modal 3 de equipment -------------------------------------------------------------------------------------------------------------*/}

        <CModal
          visible={modal3}
          onClose={() => {
            Setmodal3(false)
          }}
        >
          <CModalHeader className="Modal-header">Add new asset : Equipment</CModalHeader>
          <CModalBody>
            <CForm>
              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Clasification:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="classification"
                        name="classification"
                        placeholder="Clasification"
                        value={formData.classification}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Description</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCommentSquare} />
                      </CInputGroupText>
                      <CFormTextarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></CFormTextarea>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Color:</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="color"
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Brand</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Model</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="model"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Serial</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="serial"
                        name="serial"
                        placeholder="Serial"
                        value={formData.serial}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Height</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="height"
                        name="height"
                        placeholder="Height"
                        value={formData.height}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Width</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="width"
                        name="width"
                        placeholder="Width"
                        value={formData.width}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Depth</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="depth"
                        name="depth"
                        placeholder="Depth"
                        value={formData.depth}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Acquisition value</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="acquisition_value"
                        name="acquisition_value"
                        placeholder="Acquisition value"
                        value={formData.acquisition_value}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Use status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Conservation status</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilOptions} />
                      </CInputGroupText>
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
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Observation</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="observation"
                        name="observation"
                        placeholder="Observation"
                        value={formData.observation}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Physical location</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="physical_location"
                        name="physical_location"
                        placeholder="Physical location"
                        value={formData.physical_location}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Direction dependency</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="direction_dependency"
                        name="direction_dependency"
                        placeholder="Direction dependency"
                        value={formData.direction_dependency}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-50">
                    <CFormLabel>Level</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="level"
                        name="level"
                        placeholder="Level"
                        value={formData.level}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                  <div className="w-50">
                    <CFormLabel>Analyst</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilPencil} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        id="analyst"
                        name="analyst"
                        placeholder="Analyst"
                        value={formData.analyst}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>

              <CInputGroup className="mb-3">
                <div className="d-flex  w-100 gap-3">
                  <div className="w-100">
                    <CFormLabel>Acquisition date</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilCalendar} />
                      </CInputGroupText>
                      <CFormInput
                        type="date"
                        id="acquisition_date"
                        name="acquisition_date"
                        placeholder="acquisition_date"
                        value={formData.acquisition_date}
                        onChange={handleInputChange}
                      ></CFormInput>
                    </CInputGroup>
                  </div>
                </div>
              </CInputGroup>
            </CForm>
          </CModalBody>
          <CModalFooter className="Modal-footer">
            <CButton
              className="buttom-footer"
              onClick={() => {
                if (isEditMode) {
                  Putasset(editAssetId)
                } else {
                  Postasset()
                }
                Setmodal3(false)
              }}
            >
              Save
            </CButton>
            <CButton
              className="buttom-footer"
              onClick={() => {
                Setmodal3(false)
                setIsEditMode(false)
                setEditAssetId(null)
              }}
            >
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
                  delete_formdata()
                  Setmodal0(true)
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
                          <CButton className="box-icon" onClick={() => handleEditAsset(item)}>
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
