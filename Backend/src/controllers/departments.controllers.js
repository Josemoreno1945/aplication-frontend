import pool from "../db.js"


//---------------------------------Get---------------------------------------
export const getDepartments = async(req,res)=>{
    try{
        const {rows} = await pool.query("SELECT * FROM departments")
        res.json(rows);
    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}

//---------------------------------Get---------------------------------------
export const getDepartmentsId = async(req,res)=>{
    try{
        const id=req.params.id
        const {rows} = await pool.query(`SELECT * FROM departments WHERE id_departments = $1`,[id])

        if (rows.length===0){
            return res.status(404).json({ messaje : "Department not found"});
        }
        res.json(rows[0]);

    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}

//-------------------------------Post-----------------------------------------
export const postDeparments = async(req,res)=>{
    try{
        const data=req.body
        const {rows} = await pool.query('INSERT INTO departments(name, address, phone, email, operational_status) VALUES ($1,$2,$3,$4,$5) RETURNING*',
        [data.name, data.address, data.phone, data.email, data.operational_status])
        return res.json(rows[0])
    }   
    catch(error){
        console.error("Error when creating department:", error);
        res.status(500).send("Error when creating department");
    } 
}

//--------------------------------Put----------------------------------------
export const putDeparments = async(req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        const {rows}= await pool.query('UPDATE departments SET name=$1, address=$2, phone=$3, email=$4, operational_status=$5 WHERE id_departments=$6 RETURNING *' ,
        [data.name, data.address, data.phone, data.email, data.operational_status,id])

        res.json(rows[0]);
    }
    catch(error){
        console.error("Error when creating department:", error);
        res.status(500).send("Error when creating department");
    }
}

//-------------------------------Delete-----------------------------------------

export const deleteDepartments = async(req,res)=>{
    try{
        const id=req.params.id
        const {rowCount} = await pool.query(`DELETE FROM departments WHERE id_departments = $1`,[id])

        if (rowCount.length===0){
            return res.status(404).json({ messaje : "Department not found"});
        }
        else{
            return res.json({messaje:"delete department"});
        }
    }catch(error){
        console.error("Error getting department:", error);
        res.status(500).send("Error getting department");
    }
}