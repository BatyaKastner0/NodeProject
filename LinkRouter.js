import express from 'express'
import LinkController from './LinkController.js'

const LinkRouter = express.Router()

LinkRouter.get('/', LinkController.getList);


LinkRouter.get('/:id', LinkController.getById);

LinkRouter.post('/', LinkController.add);

LinkRouter.put('/:id', LinkController.update);

LinkRouter.delete('/:id', LinkController.delete);

LinkRouter.get('/chart/:uniqueId',LinkController.getData);

export default LinkRouter