import {CategoryController} from "../controllers/categoryController";
//import {validateUser} from '../middleware/auth'
import * as express from 'express'


export const categoryRoute = express.Router()

//categoryRoute.get('/',validateUser ,CategoryController.getProfile)
categoryRoute.get('/',CategoryController.getCategories)
categoryRoute.post('/',CategoryController.saveCategories)
//categoryRoute.put('/',validateUser ,CategoryController.updateProfile)
