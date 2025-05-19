import { Router } from "express";
import pool from "../db.js"
import {getDepartments} from "../controllers/departments.controllers.js"
import {getDepartmentsId} from "../controllers/departments.controllers.js"
import {postDeparments} from "../controllers/departments.controllers.js"
import {putDeparments} from "../controllers/departments.controllers.js"
import {deleteDepartments} from "../controllers/departments.controllers.js"

const router=Router()

//callback(funcion de retorno) la funcion en si 
//request(peticion) req
//response(respuesta) res

//---------------------------------Get---------------------------------------
router.get('/departments',getDepartments)

//------------------------------Get------------------------------------------
router.get('/departments/:id',getDepartmentsId)

//-------------------------------Post-----------------------------------------
router.post('/departments',postDeparments)

//--------------------------------Put----------------------------------------
router.put('/departments/:id',putDeparments)

//-------------------------------Delete-----------------------------------------
router.delete('/departments/:id',deleteDepartments)

export default router;