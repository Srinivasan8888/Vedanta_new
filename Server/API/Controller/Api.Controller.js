// const { verifyRefreshToken } = require("../../Helpers/jwt_helper")

import SensorModel1 from '../Models/SensorModel1.js';
import SensorModel2 from '../Models/SensorModel2.js';
import SensorModel3 from '../Models/SensorModel3.js';
import SensorModel4 from '../Models/SensorModel4.js';
import SensorModel5 from '../Models/SensorModel5.js';
import SensorModel6 from '../Models/SensorModel6.js';
import SensorModel7 from '../Models/SensorModel7.js';
import SensorModel8 from '../Models/SensorModel8.js';
import SensorModel9 from '../Models/SensorModel9.js';
import SensorModel10 from '../Models/SensorModel10.js';


export const Aside = async (req, res) => {
  try {
    // Fetch all sensor data concurrently
    const [data, data1, data2, data3, data4, data5] = await Promise.all([
      SensorModel1.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel2.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel3.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel4.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel5.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel6.find().sort({ updatedAt: -1 }).limit(1)
    ]);

    // Combine all sensor data into a single array
    const combinedData = [
      ...data,
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      ...data5
    ];


    res.status(200).json({
      //   message: "Data fetched successfully.",
      data: combinedData // Send combined data as a single response
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: "An error occurred while fetching data.",
    });
  }
};

export const Bside = async (req, res) => {
  try {
    // Fetch all sensor data concurrently
    const [data, data1, data2, data3] = await Promise.all([
      SensorModel7.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel8.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel9.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel10.find().sort({ updatedAt: -1 }).limit(1)
    ]);

    // Combine all sensor data into a single array
    const combinedData = [
      ...data,
      ...data1,
      ...data2,
      ...data3
    ];

    res.status(200).json({
      //   message: "Data fetched successfully.",
      data: combinedData // Send combined data as a single response
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      error: "An error occurred while fetching data.",
    });
  }
};

export const getallsensor = async (req, res) => {
  const collectionModels = [
    SensorModel1, SensorModel2, SensorModel3, SensorModel4, SensorModel5,
    SensorModel6, SensorModel7, SensorModel8, SensorModel9, SensorModel10
  ];
  const limitPerModel = 1;
  const combinedData = {};

  for (let i = 0; i < collectionModels.length; i++) {
    try {
      const documents = await collectionModels[i]
        .find({})
        .sort({ updatedAt: -1 })
        .limit(limitPerModel)
        .lean()
        .select('-_id -id -TIME -createdAt -updatedAt -__v -busbar');

      if (documents.length > 0) {
        Object.assign(combinedData, documents[0]);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json(combinedData);
};

export const cbname = async (req, res) => {
  const collectionModels = [
    SensorModel1, SensorModel2, SensorModel3, SensorModel4, SensorModel5,
    SensorModel6, SensorModel7, SensorModel8, SensorModel9, SensorModel10
  ];
  const limitPerModel = 1;
  const combinedData = {};

  for (let i = 0; i < collectionModels.length; i++) {
    try {
      const documents = await collectionModels[i]
        .find({})
        .sort({ updatedAt: -1 })
        .limit(limitPerModel)
        .lean()
        .select('-_id -id -TIME -createdAt -updatedAt -__v -busbar');

      if (documents.length > 0) {
        Object.assign(combinedData, documents[0]);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  res.status(200).json(Object.keys(combinedData));
};

export const fetchSensorDataByKey = async (req, res) => {
  const { key } = req.query;
  const modelMap = {
    model1: SensorModel1,
    model2: SensorModel2,
    model3: SensorModel3,
    model4: SensorModel4,
    model5: SensorModel5,
    model6: SensorModel6,
    model7: SensorModel7,
    model8: SensorModel8,
    model9: SensorModel9,
    model10: SensorModel10,
  };

  const models = {
    model1: [
      "CBT1A1", "CBT1A2", "CBT2A1", "CBT2A2",
      "CBT3A1", "CBT3A2", "CBT4A1", "CBT4A2",
      "CBT5A1", "CBT5A2", "CBT6A1", "CBT6A2",
      "CBT7A1", "CBT7A2"
    ],
    model2: [
      "CBT8A1", "CBT8A2", "CBT9A1", "CBT9A2",
      "CBT10A1", "CBT10A2"
    ],
    model3: [
      "CBT11A1", "CBT11A2", "CBT12A1", "CBT12A2",
      "CBT13A1", "CBT13A2", "CBT14A1", "CBT14A2"
    ],
    model4: [
      "CBT15A1", "CBT15A2", "CBT16A1", "CBT16A2"
    ],
    model5: [
      "CBT17A1", "CBT17A2", "CBT18A1", "CBT18A2",
      "CBT19A1", "CBT19A2"
    ],
    model6: [
      "CBT20A1", "CBT20A2", "CBT21A1", "CBT21A2",
      "CBT22A1", "CBT22A2", "CBT23A1", "CBT23A2",
      "CBT24A1", "CBT24A2", "CBT25A1", "CBT25A2",
      "CBT26A1", "CBT26A2", "CBT27A1", "CBT27A2"
    ],
    model7: [
      "CBT1B1", "CBT1B2", "CBT2B1", "CBT2B2",
      "CBT3B1", "CBT3B2", "CBT4B1", "CBT4B2",
      "CBT5B1", "CBT5B2", "CBT6B1", "CBT6B2",
      "CBT7B1", "CBT7B2", "CBT8B1", "CBT8B2",
      "CBT9B1", "CBT9B2", "CBT10B1", "CBT10B2"
    ],
    model8: [
      "CBT11B1", "CBT11B2", "CBT12B1", "CBT12B2",
      "CBT13B1", "CBT13B2", "CBT14B1", "CBT14B2"
    ],
    model9: [
      "CBT15B1", "CBT15B2", "CBT16B1", "CBT16B2",
      "CBT17B1", "CBT17B2", "CBT18B1", "CBT18B2"
    ],
    model10: [
      "CBT19B1", "CBT19B2", "CBT20B1", "CBT20B2",
      "CBT21B1", "CBT21B2", "CBT22B1", "CBT22B2",
      "CBT23B1", "CBT23B2", "CBT24B1", "CBT24B2",
      "CBT25B1", "CBT25B2", "CBT26B1", "CBT26B2",
      "CBT27B1", "CBT27B2"
    ]
  };

  let modelName = null;
  for (const [name, keys] of Object.entries(models)) {
    if (keys.includes(key)) {
      modelName = name;
      break;
    }
  }

  if (modelName) {
    const sensorModel = modelMap[modelName];
    try {
      const data = await sensorModel.find({ [key]: { $exists: true } }).lean();
      if (data.length > 0) {
        const keyValues = data.map(doc => ({
          id: doc.id,
          busbar: doc.busbar,
          TIME: doc.TIME,
          [key]: doc[key]
        }));
        res.status(200).json(keyValues);
      } else {
        res.status(404).json({ error: "Data not found for the given key" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ error: "Key not found in any model" });
  }
};

export const ApiController = { Aside, Bside, getallsensor, cbname, fetchSensorDataByKey };
