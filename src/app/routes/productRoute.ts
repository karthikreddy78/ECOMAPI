import {ProductController} from "../controllers/productController";
import {validateUser} from '../middleware/auth'
import * as express from 'express'
import {upload} from '../config/multer'

export const productRoute = express.Router()

productRoute.get('/',ProductController.getProducts)
productRoute.get('/:id',ProductController.getProductById)

productRoute.post('/', upload.single('file') , ProductController.addProduct)
productRoute.post("/searchProduct", ProductController.searchProduct);
productRoute.post('/getProductByCategory', ProductController.getProductByCategory)
productRoute.put('/' ,ProductController.updateProduct)