/* eslint-disable no-unused-vars */
const express = require('express')
//devuelve la ruta del directorio actual
const path = require('path')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')
const boom = require('boom')

const {
  logErrors,
  wrapErrors,
  clientErrorsHandler,
  errorsHandler,
} = require('./utils/middlewares/errorsHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

// App
const app = express()

// Statics files
app.use('/static', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

// redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

//error pag 404, ya que ninguna ruta responde
app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: { statusCode, payload },
    } = boom.notFound()

    res.status(statusCode).json(payload)
  }

  res.status(404).render('404')
})

// Errors Handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorsHandler)
app.use(errorsHandler)

// Server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
