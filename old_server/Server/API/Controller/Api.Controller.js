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
      SensorModel1.find(),
      SensorModel2.find(),
      SensorModel3.find(),
      SensorModel4.find(),
      SensorModel5.find(),
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

