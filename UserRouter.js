import express from 'express'
import UserController from './UserController.js'

const UserRouter = express.Router()

UserRouter.get('/', UserController.getList)

UserRouter.get('/short-url/:uniqueId', UserController.redirectLink)

UserRouter.get('/:id', UserController.getById)

UserRouter.post('/', UserController.add)

UserRouter.put('/:id', UserController.update)

UserRouter.delete('/:id', UserController.delete)

export default UserRouter