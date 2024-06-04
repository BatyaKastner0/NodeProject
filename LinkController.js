  import LinkModel from "./LinkModel.js";
  import crypto from 'crypto';


  export function generateUniqueId(url) {
    // יצירת האש SHA-256 מה-URL
    const hash = crypto.createHash('sha256').update(url).digest('hex');
    // קיצור ההאש ל-8 תווים ראשונים לדוגמה (ניתן לשנות לפי צורך)
    const shortHash = hash.substring(0, 8);
    return shortHash;
  }

 export function calculateClicksPerTargetValue(links) {
    const clicksPerTargetValue = {};

    links.forEach(link => {
        link.targetValues.forEach(targetValue => {
            const { value } = targetValue;
            if (!clicksPerTargetValue[value]) {
                clicksPerTargetValue[value] = 0;
            }
            link.clicks.forEach(click => {
                if (click.targetParamValue === value) {
                    clicksPerTargetValue[value]++;
                }
            });
        });
    });

    return clicksPerTargetValue;
}
  const LinkController = {
    getList: async (req, res) => {
      try {
        const link = await LinkModel.find();//ללא סינון
      //   const tasks = await TaskModel.find({ isComplete: true });//סינון 1
      //   const tasks = await TaskModel.where('isComplete', false);//סינון 2
        res.json(link);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    },

getData: async (req, res) => {

try {
  const link = await LinkModel.findOne({ uniqueId: req.params.uniqueId });
  if (link) {
    const counts = {};
    for (const click of link.clicks) {
      if (counts[click.targetParamValue]) {
        counts[click.targetParamValue]++;
      } else {
        counts[click.targetParamValue] = 1;
      }
    }
    console.log(counts);
    res.json(counts); 
  } else {
    console.log('No link found with the provided uniqueId');
  }
} catch (error) {
  console.error('Error occurred while fetching the link:', error);
}
},
    getById: async (req, res) => {
      try {
        const link = await LinkModel.findById(req.params.id);
        res.json(link);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    },

    add: async (req, res) => {
      const { originalUrl } = req.body;
      const { targetValues}= req.body;
      try {
        const uniqueId = generateUniqueId(originalUrl);
        const newLink = await LinkModel.create({originalUrl:originalUrl
          , uniqueId:uniqueId,targetValues:targetValues});
        res.json(newLink);
      } catch (e) {
        res.status(400).json({message:e.message });
      }
    },
    update: async (req, res) => {
      const { id } = req.params;
      const { originalUrl } = req.body;
      try {
        const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {originalUrl: req.body.originalUrl});
        res.json(updatedLink);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    },
    delete: async (req, res) => {
      const { id } = req.params;
      try {
        const deleted = await LinkModel.findByIdAndDelete(id);
        res.json(deleted);
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    },
  };

  export default LinkController;