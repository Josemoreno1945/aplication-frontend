import React, { useState , useEffect } from "react";
import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CTableHead, CTableRow , CTableHeaderCell, CTableBody , CTableDataCell, CButton, CModal, CModalHeader, CModalBody, CFormLabel, CFormSelect,CForm, CModalFooter} from '@coreui/react'
import { useParams } from 'react-router-dom';
import "src/scss/inventory.scss";
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus,cilX,cilPencil,cibDropbox} from '@coreui/icons'
import axios from 'axios';


const Inventory = () => {

//los estados son como el nombre lo dice , puede considerarse banderas , es lo mas parecido que le veo 
//tambien pueden ser arreglos 

    //estado para cuando se edita 
    const [isEditing,setIsEditing]=useState(false)
    //estado para guardar el id del item o bien 
    const [itemId,setItemId]=useState(null)
     //estado para sabar cuando se abre y cierra el modal 
    const [openmodal,setOpenModal]=useState(false);

    //obtiene el id del dpto desde la url, y lo guarda en una variable para usarlo en el inventario
    //USE IA AL 100% AQUI (REPASAR)
    const { departmentId } = useParams(); 
//---------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------
    //aqui guardo los datos al llenar un formulario 
    //osea lleno uno , se llena formdata y despues lo paso a inventory(otro arreglo)
    const [formData,setFormData]=useState([ 
        {
            id:"",
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
            physical_location:"",
            direction_dependency:"",
            level:"",
            analyst:"",
            acquisition_date:""

        }
    ])

    //arreglo para almacenar todos los bienes o items(inventario)
    const [inventory, setInventory] = useState([]); 

    //aja , esta funcion ejecuta o realiza , el proceso de eliminar un item de inventory 


const [deleteitemid,setDeleteitemid]=useState("") 
const [mvisible,setMvisible]=useState(false)

useEffect(() => {
    if(departmentId === "0"){
        axios.get("http://localhost:5000/inv0")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "1"){
        axios.get("http://localhost:5000/inv1")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "2"){
        axios.get("http://localhost:5000/inv2")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "3"){
        axios.get("http://localhost:5000/inv3")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "4"){
        axios.get("http://localhost:5000/inv4")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "5"){
        axios.get("http://localhost:5000/inv5")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "6"){
        axios.get("http://localhost:5000/inv6")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "7"){
        axios.get("http://localhost:5000/inv7")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "8"){
        axios.get("http://localhost:5000/inv8")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "9"){
        axios.get("http://localhost:5000/inv9")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "10"){
        axios.get("http://localhost:5000/inv10")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    if(departmentId === "11"){
        axios.get("http://localhost:5000/inv11")
        .then(response => setInventory(response.data))
        .catch(error => console.error("Error al obtener datos", error));
    }
    
}, [departmentId]);

//----------------------------------------------------------------------------------------------------------------------


    const Deleteitem = (id) => {
        const updatedInventory = inventory.filter((inv)=>inv.id!==id)  //comparamos el id seleccionado con los del vector , y si son iguales lo descarta, ahora estaria entre comillas eliminado el que seleccione 
        setInventory(updatedInventory)  
        setMvisible(false)
        axios.delete(`http://localhost:5000/inv${departmentId}/${id}`)   //esas comillas si o si xd
        .then(() => console.log(`assets con ID ${id} eliminado`))
        .catch(error => console.error("Error al eliminar asset:", error))
        }
        
    

//---------------------------------------------------------------------------------------------------------------------------------------------



function EditItem (index){
        setFormData(inventory[index]); // Carga los datos del elemento seleccionado en el formulario
        setIsEditing(true); // Cambia el estado a true para indicar que se está editando
        setItemId(index); // Guarda el índice del elemento que se está editando
        setOpenModal(true); // Abre el modal para editar
    };

//----------------------------------------------------------------------------------------------------------------------------------------------------

const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
}



    const handleSubmit = () => {

        if(!formData.id || !formData.type || !formData.acquisition_date || !formData.classification){
            alert("Please fill out all fields.")
            return
        }
        

            axios.post(`http://localhost:5000/inv${departmentId}`,formData)
            .then(response =>console.log("Datos recibidos:", response.data))
            .then(response => setInventory(response.data))
            .catch(error => console.error("Error al obtener datos", error));


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
                physical_location:"",
                direction_dependency:"",
                level:"",
                analyst:"",
                acquisition_date:""
                });
                
    setOpenModal(false);


};



    return (
        <>


    <CModal visible={mvisible} onClose={() => setMvisible(false)}>
            <CModalHeader className='Modal-header'>Delete item</CModalHeader>
            <CFormLabel className='label-delete'>Are you sure you want to delete?</CFormLabel>
            <CModalBody>
                <div className='box-buttom-accept'>
                    <CButton
                    className='buttom-accept'
                    onClick={() =>setMvisible(false)}
                    >No</CButton>
                    <CButton
                    className='buttom-accept'
                    onClick={() => 
                        Deleteitem(deleteitemid)}
                    >Yes</CButton>
                </div>
            </CModalBody>
        </CModal>







    <div className="container">
        <div className="buttom-box">                  
        <CButton className="buttom-add" onClick={()=>{
            
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
                physical_location:"",
                direction_dependency:"",
                level:"",
                analyst:"",
                acquisition_date:""
                });
            setIsEditing(false)
            setOpenModal(true)}} >Add<CIcon icon={cilPlus} className="buttom-icon" />
        </CButton>
        </div> 
        
        <CModal visible={openmodal} onClose={() =>setOpenModal(false)}>
            <CModalHeader className="Modal-header">Add new asset</CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormLabel htmlFor="id_assets">id:</CFormLabel>
                    <CFormInput
                    type="number"
                    id='id'
                    name='id'
                    placeholder='Identification of the asset'
                    value={formData.id}
                    onChange={handleInputChange}
                    ></CFormInput>
                    <CFormLabel htmlFor="type">Type:</CFormLabel>
                    <CFormSelect
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    >
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
                    <CButton className="buttom-footer" onClick={()=>handleSubmit()}>Save</CButton>
                    <CButton className="buttom-footer" onClick={()=>setOpenModal(false)}>Cancel</CButton>
            </CModalFooter>
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
                                <CTableHeaderCell>Physical location</CTableHeaderCell>
                                <CTableHeaderCell>Direction dependency</CTableHeaderCell>
                                <CTableHeaderCell>Level</CTableHeaderCell>
                                <CTableHeaderCell>Analyst</CTableHeaderCell>
                                <CTableHeaderCell></CTableHeaderCell>
                                <CTableHeaderCell></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {inventory.map((item, index) => (  
                                <CTableRow key={index}>
                                    <CTableDataCell>{item.id}</CTableDataCell>
                                    <CTableDataCell>{item.type}</CTableDataCell>
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
                                    <CTableDataCell>{item.physical_location}</CTableDataCell>
                                    <CTableDataCell>{item.direction_dependency}</CTableDataCell>
                                    <CTableDataCell>{item.level}</CTableDataCell>
                                    <CTableDataCell>{item.analyst}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton
                                        onClick={() => EditItem(index)} 
                                        > <CIcon icon={cilPencil} /> </CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton onClick={() =>{
                                            setDeleteitemid(item.id)
                                            setMvisible(true)
                                        }}>
                                            <CIcon icon={cilX} />
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

export default Inventory;