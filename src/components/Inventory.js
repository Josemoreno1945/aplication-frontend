import React, { useState } from "react";
import { CCard, CCardHeader, CCardBody, CFormInput, CTable, CTableHead, CTableRow , CTableHeaderCell, CTableBody , CTableDataCell, CButton, CModal, CModalHeader, CModalBody, CFormLabel, CFormSelect,CForm, CModalFooter} from '@coreui/react'
import { useParams } from 'react-router-dom';
import "src/scss/inventory.scss";
import CIcon from '@coreui/icons-react'
import { cilListNumbered, cilPlus,cilX,cilPencil,cibDropbox} from '@coreui/icons'



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
        }
    ])

    //arreglo para almacenar todos los bienes o items(inventario)
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
                use_status: "Average",
                conservation_status: "Optimal",
                observation: "No issues",
                physical_location:"CEFO TACHIRA",
                direction_dependency:"sotano",
                level:"operational",
                analyst:"Maria Perez",
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
                use_status: "Optimal",
                conservation_status: "Operative",
                observation: "Brand new",
                physical_location:"CEFO TACHIRA",
                direction_dependency:"piso 5,oficina 1",
                level:"operational",
                analyst:"Pedro Martinez",
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
                use_status: "Optimal",
                conservation_status: "Inoperative",
                observation: "No issues",
                physical_location:"CEFO TACHIRA",
                direction_dependency:"planta baja",
                level:"operational",
                analyst:"Jose Rodriguez",
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
                use_status: "Average",
                conservation_status: "Operational",
                observation: "Recently serviced",
                physical_location:"CEFO TACHIRA",
                direction_dependency:"planta baja",
                level:"operational",
                analyst:"Carlos Hernandez",
            },
    ]); 

    //aja , esta funcion ejecuta o realiza , el proceso de eliminar un item de inventory 
    //esta funcion recibe index como parametro , vendra siendo practicamente
    //la posicion del item en el arreglo 
    //la de abajo me la dio la IA ()

    /*
    const handleDelete = (index) => {
        const updatedInventory = inventory.filter((_, i) => i !== index) //busca el asset a  eliminar
        setInventory(updatedInventory)  //actualiza el arreglo de assets
    }
*/

//----------------------------------------------------------------------------------------------------------------------
    //la misma vaina me la dio la ia , pero mas entendible , mas similar a lo que aprendi en c , con ciclos 
        //funcion que recibe index como parametro
        //creo un arreglo vacio que va a tener el item nuevo , osea vacio se puede decir
        //for para recorrer el vector
        //verificamos que i sea diferente a index , osea yo elijo 
        //i=1 , index=1 , updateitem no va a tener el 1 , osea se lo salta 
        //y ahora updateitem se llena , pero sin tener el 1 , o index
    function deleteitem(index){         
        const updateitemxd=[]          
        for(let i=0;i<inventory.length;i++){  
            if(i!==index){                           
                updateitemxd.push(inventory[i])    
            }
        }

        setInventory(updateitemxd) //y ahora se actualiza inventario , que ya no tendria el item 
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
                });
    setOpenModal(false);
};

    return (
        <>
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
                });
            setIsEditing(false)
            setOpenModal(true)}} >Add<CIcon icon={cilPlus} className="buttom-icon" />
        </CButton>
        </div> 
        
        <CModal visible={openmodal} onClose={() =>setOpenModal(false)}>
            <CModalHeader className="Modal-header">Add new asset</CModalHeader>
            <CModalBody>
                <CForm>
                    <CFormLabel htmlFor="id">id:</CFormLabel>
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
                    <CFormLabel htmlFor="year">Year of the vehicule:</CFormLabel>
                    <CFormInput
                    type="number"
                    id="year"
                    name="year"
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
                                        <CButton onClick={() => deleteitem(index)}>
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