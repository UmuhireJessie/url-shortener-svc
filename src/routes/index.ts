import express from 'express'
import users from './userRoutes'

const routes = express()

routes.use('/users', users)


export default routes
