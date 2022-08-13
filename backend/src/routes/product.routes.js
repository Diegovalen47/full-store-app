import { Router } from 'express'

import { createNewProduct, getProducts, getProductById, deleteProductById, getTotalProducts, updateProductById } from '../controllers/product.controller'

const router = Router()

router.get('/product', getProducts)

router.post('/product', createNewProduct)

router.get('/product/count', getTotalProducts)

router.get('/product/:id', getProductById)

router.delete('/product/:id', deleteProductById)

router.put('/product/:id', updateProductById)


export default router