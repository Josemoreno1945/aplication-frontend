import React, { useState } from "react";
import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CTableHead, CTableRow , CTableHeaderCell, CTableBody , CTableDataCell, CButton, CModal, CModalHeader, CModalBody, CFormLabel, CFormSelect,CForm, CModalFooter} from '@coreui/react'
import { useParams } from 'react-router-dom';
import "src/scss/inventory.scss";
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus,cilX,cilPencil,cibDropbox} from '@coreui/icons'


//aja quiero q el formulario de añadir empieze eligiendo por tipos , el formulario cambia 
//diferenciar por colores los tipos 



const Inventory = () => {



    const [buttomcontinue,setButtomContinue]=useState(false); 

    const [openmodal,setOpenModal]=useState(false); //abri model y cerrar

    const { departmentId } = useParams();  //obtiene el id del dpto desde la url, y lo guarda en una variable para usarlo en el inventario
    
    const [selectedType, setSelectedType] = useState(''); //estado para el tipo de inventario seleccionado

    const typechange = (e) => {
        setSelectedType(e.target.value); //actualiza el estado con el valor seleccionado
    }

    const Continue = () => {
        if (selectedType === "Furniture") {
            setButtomContinue(true); 
            setOpenModal(false); 
        }
    }

    const [inventory, setInventory] = useState([
            {
                
                id: 1,
                type: "Equipment",
                classification: "Laptop",
                description: "Dell XPS 15",
                color: "Silver",
                brand: "Dell",
                model: "XPS 15",
                serial: "12345ABC",
                height: 2,
                width: 15,
                depth: 10,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 1500,
                use_status: "In use",
                conservation_status: "Good",
                observation: "No issues",
            },
            {
                id: 2,
                type: "Furniture",
                classification: "Chair",
                description: "Office Chair",
                color: "Black",
                brand: "IKEA",
                model: "ErgoChair",
                serial: "67890XYZ",
                height: 4,
                width: 2,
                depth: 2,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 200,
                use_status: "Available",
                conservation_status: "Excellent",
                observation: "Brand new",
            },
            {
                id: 3,
                type: "Equipment",
                classification: "Monitor",
                description: "Samsung 4K Monitor",
                color: "Black",
                brand: "Samsung",
                model: "U28E590D",
                serial: "MON123456",
                height: 18,
                width: 28,
                depth: 8,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 300,
                use_status: "In use",
                conservation_status: "Good",
                observation: "No issues",
            },
            {
                id: 4,
                type: "Vehicles",
                classification: "Car",
                description: "Toyota Corolla",
                color: "White",
                brand: "Toyota",
                model: "Corolla",
                serial: "CAR987654",
                height: 5,
                width: 6,
                depth: 15,
                plate: "XYZ-123",
                bodywork: "Sedan",
                engine: "1.8L",
                year_of_the_vehicule: 2020,
                acquisition_value: 20000,
                use_status: "In use",
                conservation_status: "Excellent",
                observation: "Recently serviced",
            },
            {
                id: 5,
                type: "Equipment",
                classification: "Drill",
                description: "Bosch Cordless Drill",
                color: "Blue",
                brand: "Bosch",
                model: "GSR12V-140FCB22",
                serial: "TOOL56789",
                height: 1,
                width: 1,
                depth: 1,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 150,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Battery included",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
            {
                id: 6,
                type: "Furniture",
                classification: "Desk",
                description: "Standing Desk",
                color: "Brown",
                brand: "Autonomous",
                model: "SmartDesk 2",
                serial: "FURN12345",
                height: 4,
                width: 6,
                depth: 3,
                plate: "",
                bodywork: "",
                engine: "",
                year_of_the_vehicule: 0,
                acquisition_value: 500,
                use_status: "Available",
                conservation_status: "Good",
                observation: "Adjustable height",
            },
    ]); 

    const handleDelete = (index) => {
        const updatedInventory = inventory.filter((_, i) => i !== index) //busca el asset a  eliminar
        setInventory(updatedInventory)  //actualiza el arreglo de assets
    }

    const EditItem = (index) => {
        setFormData(inventory[index]); // Carga los datos del elemento seleccionado en el formulario
        setIsEditing(true); // Cambia el estado a true para indicar que se está editando
        setItemId(index); // Guarda el índice del elemento que se está editando
        setOpenModal(true); // Abre el modal para editar
    };

    const handleSubmit = () => {
        if (isEditing === true) {
          const updatedInventory = [...inventory]; // Crea una copia del inventario
          updatedInventory[itemId] = formData; // Actualiza el elemento en la posición correspondiente
          setInventory(updatedInventory); // Actualiza el estado del inventario
          setIsEditing(false); // Cambia la bandera de edición a false
          setItemId(null); // Limpia el índice del elemento editado
        } else {
          // Si no se está editando, agrega un nuevo elemento
          setInventory([...inventory, formData]); // Agrega el nuevo elemento al inventario
        }
        // Limpia el formulario y cierra el modal
  setFormData({
    id: "",
    type: "",
    classification: "",
    description: "",
    color: "",
    brand: "",
    model: "",
    serial: "",
    height: "",
    width: "",
    depth: "",
    plate: "",
    bodywork: "",
    engine: "",
    year_of_the_vehicule: "",
    acquisition_value: "",
    use_status: "",
    conservation_status: "",
    observation: "",
    });
    setOpenModal(false);
};

    return (
        <>
        <div className="container">

        <div className="buttom-box">                  
        <CButton className="buttom-add" onClick={()=>setOpenModal(true)} >Add<CIcon icon={cilPlus} className="buttom-icon" />
        </CButton>
        </div> 
        
        <CModal visible={openmodal} onClose={() =>setOpenModal(false)}>
            <CModalHeader>Add new asset</CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormLabel htmlFor="nametype">Type:</CFormLabel>
                    <CFormSelect
                    id='nametype'
                    name='nametype'
                    value={selectedType}
                    onChange={typechange}
                    >
                        <option value={""}>Select type</option>
                        <option value={"Furniture"}>Furniture</option>
                        <option value={"Equipment"}>Equipment</option>
                        <option value={"Vehicles"}>Vehicles</option>
                    </CFormSelect>
                </CForm>


                   {  selectedType === "Furniture" && ButtomContinue === true && (
                        <CModal>
                            <CModalHeader>Furniture</CModalHeader>
                        </CModal>
                    )}


                <CModalFooter>
                    <CButton className="buttom-cancel" onClick={()=>setButtomContinue(true)}>Continue</CButton>
                    <CButton className="buttom-save" onClick={()=>setOpenModal(false)}>Cancel</CButton>
                </CModalFooter>
            </CModalBody>
        </CModal>
        
        
        
        
        
        
        
        
        <CCard className="m-5">
            <CCardHeader>Inventory from department:{departmentId}</CCardHeader>
            <CCardBody>
                
                <div className="table-responsive">
                    <CTable>
                        <CTableHead>
                            <CTableRow>         
                                <CTableHeaderCell>ID</CTableHeaderCell>
                                <CTableHeaderCell>Type</CTableHeaderCell>
                                <CTableHeaderCell>Classification</CTableHeaderCell>
                                <CTableHeaderCell>Description</CTableHeaderCell>
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
                                <CTableHeaderCell>Year of the vehicule</CTableHeaderCell>
                                <CTableHeaderCell>Acquisition value</CTableHeaderCell>
                                <CTableHeaderCell>Use status</CTableHeaderCell>
                                <CTableHeaderCell>Conservation status</CTableHeaderCell>
                                <CTableHeaderCell>Observation</CTableHeaderCell>
                                <CTableHeaderCell></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {inventory.map((item, index) => (  
                                <CTableRow key={index}>
                                    <CTableDataCell>{item.id}</CTableDataCell>
                                    <CTableDataCell >{item.type}</CTableDataCell>
                                    <CTableDataCell>{item.classification}</CTableDataCell>
                                    <CTableDataCell>{item.description}</CTableDataCell>
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
                                    <CTableDataCell>{item.year_of_the_vehicule}</CTableDataCell>
                                    <CTableDataCell>{item.acquisition_value}</CTableDataCell>
                                    <CTableDataCell>{item.use_status}</CTableDataCell>
                                    <CTableDataCell>{item.conservation_status}</CTableDataCell>
                                    <CTableDataCell>{item.observation}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() => handleDelete(index)}>
                                            <CIcon icon={cilX} />
                                        </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                        onClick={() => Editregister(index)} 
                                        > <CIcon icon={cilPencil} /> </CButton>
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

export default Inventory;