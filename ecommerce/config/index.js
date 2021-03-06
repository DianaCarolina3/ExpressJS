require('dotenv').config()

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  sentryDns: process.env.SENTRY_DNS,
  password: {
    authAdminUser: process.env.AUTH_ADMIN_USERNAME,
    authAdminPassword: process.env.AUTH_ADMIN_PASSWORD,
    authAdminEmail: process.env.AUTH_ADMIN_EMAIL,
    authJWTSecret: process.env.AUTH_JWT_SECRET,
  },
}

module.exports = { config }
