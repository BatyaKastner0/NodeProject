import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './database.js'
import LinkRouter from './LinkRouter.js'
import UserRouter from './UserRouter.js'
// import LinkModel from './LinkModel.js';
connectDB()
const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.get('/', (req, res)=>{
//   res.send('first project in node')})

// app.get('/redirect/:id', async (req, res) => {
//   const { id } = req.params;
//   const ipAddress = req.ip;

//   if (!id) {
//       res.status(400).send('Bad Request: ID is required');
//       return;
//   }

//   let link;
//   try {
//       link = await LinkModel.findById(id);
//   } catch (error) {
//       res.status(400).send('Bad Request: invalid ID');
//       return;
//   }


//   if (!link) {
//       res.status(404).send('Link not found');
//       return;
//   }

//   link.clicks.push({ insertedAt: new Date(), ipAddress });
//   await link.save();

//   res.redirect(link.originUrl);
// });
app.use('/links-table', LinkRouter)
app.use('/users-table', UserRouter)

app.listen(5000, () => {
  console.log('app is running on http://localhost:5000')
})