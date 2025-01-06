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
      SensorModel7.find() .sort({ updatedAt: -1 }).limit(1),
      SensorModel8.find() .sort({ updatedAt: -1 }).limit(1),
      SensorModel9.find() .sort({ updatedAt: -1 }).limit(1),
      SensorModel10.find() .sort({ updatedAt: -1 }).limit(1)
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

export const ApiController = { Aside, Bside, getallsensor };


