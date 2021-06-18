const Sentry = require('@sentry/node')
const { config } = require('../../config')

Sentry.init({
  dsn: `${config.sentryDns}`,
  tracesSampleRate: 1.0,
})

const logErrors = (err, req, res, next) => {
  //logea el error con trayectoria
  if (!config.dev) {
    delete err.stack
  }

  //captura y guarda errore en sentry
  Sentry.captureException(err)

  res.render('error', { error: err })
  console.log(err.stack)
  next(err)
}

const clientErrorsHandler = (err, req, res, next) => {
  //devuelve el error como json en un request AJAX
  if (req.xhr) {
    res.status(500).json({ err: err.message })
  } else {
    next(err)
  }
}

const errorsHandler = (err, req, res, next) => {
  //error para los streaming en tiempo no capturados
  if (res.headersSent) {
    next(err)
  }

  if (!config.dev) {
    delete err.stack
  }

  res.status(res.status || 500)
  res.render('error', { error: err })
}

module.exports = {
  logErrors,
  clientErrorsHandler,
  errorsHandler,
}
