const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')

const productsService = new ProductsService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query

  try {
    const products = await productsService.getProducts({ tags })

    res.status(200).json({
      data: products,
      message: 'Products listed',
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:productID', async (req, res, next) => {
  const { productID } = req.params

  try {
    const product = await productsService.getProduct({ productID })

    res.status(200).json({
      data: product,
      message: 'Product retrieved',
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { body: product } = req

  try {
    const postProduct = await productsService.createProduct({ product })

    res.status(201).json({
      data: postProduct,
      message: 'Products listed',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:productID', async (req, res, next) => {
  const { productID } = req.params
  const { body: product } = req

  try {
    const putProduct = await productsService.updateProducts({
      productID,
      product,
    })

    res.status(200).json({
      data: putProduct,
      message: 'Products updated',
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:productID', async (req, res, next) => {
  const { productID } = req.params
  const { body: product } = req

  try {
    const patchProduct = await productsService.upgradeProduct({
      productID,
      product,
    })

    res.status(200).send({
      data: patchProduct,
      message: 'product upgraded',
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:productID', async (req, res, next) => {
  const { productID } = req.params

  try {
    const product = await productsService.deleteProduct({ productID })

    res.status(200).json({
      data: product,
      message: 'Product deleted',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
