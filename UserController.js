import UserModel from "./UserModel.js";
import LinkModel from "./LinkModel.js";

const UserController = {
  getList: async (req, res) => {
    try {
      const user = await UserModel.find();//ללא סינון
    //   const tasks = await TaskModel.find({ isComplete: true });//סינון 1
    //   const tasks = await TaskModel.where('isComplete', false);//סינון 2
    res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  getById: async (req, res) => {
    try {
        await UserModel.find({_id:req.params.id})
      const user = await UserModel.findById({_id:req.params.id});//שליפה לפי מזהה
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
  add: async (req, res) => {
    const { name, email, password, originalUrl } = req.body;

    try {
        const linkIds = await Promise.all(originalUrl.map(async url => {
            const newLink = await LinkModel.create({ originalUrl: url });
            const savedLink = await newLink.save();
            return savedLink._id;
        }));

        const newUser = await UserModel.create({
            name,
            email,
            password,
            links: linkIds
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
},
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {name: req.body.name,email: req.body.email,password: req.body.password,links: req.body.links});
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UserModel.findByIdAndDelete(id);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
redirectLink: async  (req, res) => {
  const { uniqueId } = req.params;
  try {
      const link = await LinkModel.findOne({ uniqueId });

      if (link) {
          const targetValue = req.query[link.targetParamName];
            console.log('link', link);
          if (targetValue) {
              link.clicks.push({ ipAddress: req.ip, targetParamValue: targetValue });
          } else {
              link.clicks.push({ ipAddress: req.ip });
          }
          await link.save(); 
          res.redirect(link.originalUrl); 
      } else {
          console.log('no exist!');
          res.status(404).send('Link not found');
      }
  } catch (error) {
      console.log('catch', error);
      res.status(500).send('Server error');
  }
},
};
export default UserController;