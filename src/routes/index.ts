import express from 'express'
import users from './userRoutes'
import urlRoutes from './urlRoutes'

const routes = express()

routes.use('/urls', urlRoutes)
routes.use('/users', users)


export default routes
