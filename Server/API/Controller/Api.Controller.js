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
  const { key, startDate, endDate, average } = req.query;

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

  const findModelByKey = (key) => {
    for (const [name, keys] of Object.entries(models)) {
      if (keys.includes(key)) return modelMap[name];
    }
    return null;
  };

  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);


    // Handle case for All-Data key (average for all keys)
    if (key === "All-Data") {
      const allData = await Promise.all(
        Object.values(modelMap).map((model) =>
          model.find({ createdAt: { $gte: date1, $lte: date2 } }).lean()
        )
      );
      const combinedData = allData.flat();

      if (combinedData.length === 0) {
        return res.status(404).json({ error: "No data found for the given date range" });
      }

      if (average === "Hour") {
        const allGroupedData = await Promise.all([
          SensorModel1.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:00:00Z",
                    date: "$createdAt"
                  }
                },
                avgCBT1A1: { $avg: { $toDouble: "$CBT1A1" } },
                avgCBT1A2: { $avg: { $toDouble: "$CBT1A2" } },
                avgCBT2A1: { $avg: { $toDouble: "$CBT2A1" } },
                avgCBT2A2: { $avg: { $toDouble: "$CBT2A2" } },
                avgCBT3A1: { $avg: { $toDouble: "$CBT3A1" } },
                avgCBT3A2: { $avg: { $toDouble: "$CBT3A2" } },
                avgCBT4A1: { $avg: { $toDouble: "$CBT4A1" } },
                avgCBT4A2: { $avg: { $toDouble: "$CBT4A2" } },
                avgCBT5A1: { $avg: { $toDouble: "$CBT5A1" } },
                avgCBT5A2: { $avg: { $toDouble: "$CBT5A2" } },
                avgCBT6A1: { $avg: { $toDouble: "$CBT6A1" } },
                avgCBT6A2: { $avg: { $toDouble: "$CBT6A2" } },
                avgCBT7A1: { $avg: { $toDouble: "$CBT7A1" } },
                avgCBT7A2: { $avg: { $toDouble: "$CBT7A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT1A1: 1,
                avgCBT1A2: 1,
                avgCBT2A1: 1,
                avgCBT2A2: 1,
                avgCBT3A1: 1,
                avgCBT3A2: 1,
                avgCBT4A1: 1,
                avgCBT4A2: 1,
                avgCBT5A1: 1,
                avgCBT5A2: 1,
                avgCBT6A1: 1,
                avgCBT6A2: 1,
                avgCBT7A1: 1,
                avgCBT7A2: 1,
                TIME: 1
              }
            },
            { $sort: { "_id": 1 } }
          ]),
          SensorModel2.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT8A1: { $avg: { $toDouble: "$CBT8A1" } },
                avgCBT8A2: { $avg: { $toDouble: "$CBT8A2" } },
                avgCBT9A1: { $avg: { $toDouble: "$CBT9A1" } },
                avgCBT9A2: { $avg: { $toDouble: "$CBT9A2" } },
                avgCBT10A1: { $avg: { $toDouble: "$CBT10A1" } },
                avgCBT10A2: { $avg: { $toDouble: "$CBT10A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT8A1: 1,
                avgCBT8A2: 1,
                avgCBT9A1: 1,
                avgCBT9A2: 1,
                avgCBT10A1: 1,
                avgCBT10A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel3.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT11A1: { $avg: { $toDouble: "$CBT11A1" } },
                avgCBT11A2: { $avg: { $toDouble: "$CBT11A2" } },
                avgCBT12A1: { $avg: { $toDouble: "$CBT12A1" } },
                avgCBT12A2: { $avg: { $toDouble: "$CBT12A2" } },
                avgCBT13A1: { $avg: { $toDouble: "$CBT13A1" } },
                avgCBT13A2: { $avg: { $toDouble: "$CBT13A2" } },
                avgCBT14A1: { $avg: { $toDouble: "$CBT14A1" } },
                avgCBT14A2: { $avg: { $toDouble: "$CBT14A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT11A1: 1,
                avgCBT11A2: 1,
                avgCBT12A1: 1,
                avgCBT12A2: 1,
                avgCBT13A1: 1,
                avgCBT13A2: 1,
                avgCBT14A1: 1,
                avgCBT14A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel4.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT15A1: { $avg: { $toDouble: "$CBT15A1" } },
                avgCBT15A2: { $avg: { $toDouble: "$CBT15A2" } },
                avgCBT16A1: { $avg: { $toDouble: "$CBT16A1" } },
                avgCBT16A2: { $avg: { $toDouble: "$CBT16A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT15A1: 1,
                avgCBT15A2: 1,
                avgCBT16A1: 1,
                avgCBT16A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel5.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT17A1: { $avg: { $toDouble: "$CBT17A1" } },
                avgCBT17A2: { $avg: { $toDouble: "$CBT17A2" } },
                avgCBT18A1: { $avg: { $toDouble: "$CBT18A1" } },
                avgCBT18A2: { $avg: { $toDouble: "$CBT18A2" } },
                avgCBT19A1: { $avg: { $toDouble: "$CBT19A1" } },
                avgCBT19A2: { $avg: { $toDouble: "$CBT19A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT17A1: 1,
                avgCBT17A2: 1,
                avgCBT18A1: 1,
                avgCBT18A2: 1,
                avgCBT19A1: 1,
                avgCBT19A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel6.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT20A1: { $avg: { $toDouble: "$CBT20A1" } },
                avgCBT20A2: { $avg: { $toDouble: "$CBT20A2" } },
                avgCBT21A1: { $avg: { $toDouble: "$CBT21A1" } },
                avgCBT21A2: { $avg: { $toDouble: "$CBT21A2" } },
                avgCBT22A1: { $avg: { $toDouble: "$CBT22A1" } },
                avgCBT22A2: { $avg: { $toDouble: "$CBT22A2" } },
                avgCBT23A1: { $avg: { $toDouble: "$CBT23A1" } },
                avgCBT23A2: { $avg: { $toDouble: "$CBT23A2" } },
                avgCBT24A1: { $avg: { $toDouble: "$CBT24A1" } },
                avgCBT24A2: { $avg: { $toDouble: "$CBT24A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT20A1: 1,
                avgCBT20A2: 1,
                avgCBT21A1: 1,
                avgCBT21A2: 1,
                avgCBT22A1: 1,
                avgCBT22A2: 1,
                avgCBT23A1: 1,
                avgCBT23A2: 1,
                avgCBT24A1: 1,
                avgCBT24A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel7.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT1B1: { $avg: { $toDouble: "$CBT1B1" } },
                avgCBT1B2: { $avg: { $toDouble: "$CBT1B2" } },
                avgCBT2B1: { $avg: { $toDouble: "$CBT2B1" } },
                avgCBT2B2: { $avg: { $toDouble: "$CBT2B2" } },
                avgCBT3B1: { $avg: { $toDouble: "$CBT3B1" } },
                avgCBT3B2: { $avg: { $toDouble: "$CBT3B2" } },
                avgCBT4B1: { $avg: { $toDouble: "$CBT4B1" } },
                avgCBT4B2: { $avg: { $toDouble: "$CBT4B2" } },
                avgCBT5B1: { $avg: { $toDouble: "$CBT5B1" } },
                avgCBT5B2: { $avg: { $toDouble: "$CBT5B2" } },
                avgCBT6B1: { $avg: { $toDouble: "$CBT6B1" } },
                avgCBT6B2: { $avg: { $toDouble: "$CBT6B2" } },
                avgCBT7B1: { $avg: { $toDouble: "$CBT7B1" } },
                avgCBT7B2: { $avg: { $toDouble: "$CBT7B2" } },
                avgCBT8B1: { $avg: { $toDouble: "$CBT8B1" } },
                avgCBT8B2: { $avg: { $toDouble: "$CBT8B2" } },
                avgCBT9B1: { $avg: { $toDouble: "$CBT9B1" } },
                avgCBT9B2: { $avg: { $toDouble: "$CBT9B2" } },
                avgCBT10B1: { $avg: { $toDouble: "$CBT10B1" } },
                avgCBT10B2: { $avg: { $toDouble: "$CBT10B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT1B1: 1,
                avgCBT1B2: 1,
                avgCBT2B1: 1,
                avgCBT2B2: 1,
                avgCBT3B1: 1,
                avgCBT3B2: 1,
                avgCBT4B1: 1,
                avgCBT4B2: 1,
                avgCBT5B1: 1,
                avgCBT5B2: 1,
                avgCBT6B1: 1,
                avgCBT6B2: 1,
                avgCBT7B1: 1,
                avgCBT7B2: 1,
                avgCBT8B1: 1,
                avgCBT8B2: 1,
                avgCBT9B1: 1,
                avgCBT9B2: 1,
                avgCBT10B1: 1,
                avgCBT10B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel8.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT11B1: { $avg: { $toDouble: "$CBT11B1" } },
                avgCBT11B2: { $avg: { $toDouble: "$CBT11B2" } },
                avgCBT12B1: { $avg: { $toDouble: "$CBT12B1" } },
                avgCBT12B2: { $avg: { $toDouble: "$CBT12B2" } },
                avgCBT13B1: { $avg: { $toDouble: "$CBT13B1" } },
                avgCBT13B2: { $avg: { $toDouble: "$CBT13B2" } },
                avgCBT14B1: { $avg: { $toDouble: "$CBT14B1" } },
                avgCBT14B2: { $avg: { $toDouble: "$CBT14B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT11B1: 1,
                avgCBT11B2: 1,
                avgCBT12B1: 1,
                avgCBT12B2: 1,
                avgCBT13B1: 1,
                avgCBT13B2: 1,
                avgCBT14B1: 1,
                avgCBT14B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel9.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT15B1: { $avg: { $toDouble: "$CBT15B1" } },
                avgCBT15B2: { $avg: { $toDouble: "$CBT15B2" } },
                avgCBT16B1: { $avg: { $toDouble: "$CBT16B1" } },
                avgCBT16B2: { $avg: { $toDouble: "$CBT16B2" } },
                avgCBT17B1: { $avg: { $toDouble: "$CBT17B1" } },
                avgCBT17B2: { $avg: { $toDouble: "$CBT17B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT15B1: 1,
                avgCBT15B2: 1,
                avgCBT16B1: 1,
                avgCBT16B2: 1,
                avgCBT17B1: 1,
                avgCBT17B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel10.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT19B1: { $avg: { $toDouble: "$CBT19B1" } },
                avgCBT19B2: { $avg: { $toDouble: "$CBT19B2" } },
                avgCBT20B1: { $avg: { $toDouble: "$CBT20B1" } },
                avgCBT20B2: { $avg: { $toDouble: "$CBT20B2" } },
                avgCBT21B1: { $avg: { $toDouble: "$CBT21B1" } },
                avgCBT21B2: { $avg: { $toDouble: "$CBT21B2" } },
                avgCBT22B1: { $avg: { $toDouble: "$CBT22B1" } },
                avgCBT22B2: { $avg: { $toDouble: "$CBT22B2" } },
                avgCBT23B1: { $avg: { $toDouble: "$CBT23B1" } },
                avgCBT23B2: { $avg: { $toDouble: "$CBT23B2" } },
                avgCBT24B1: { $avg: { $toDouble: "$CBT24B1" } },
                avgCBT24B2: { $avg: { $toDouble: "$CBT24B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT19B1: 1,
                avgCBT19B2: 1,
                avgCBT20B1: 1,
                avgCBT20B2: 1,
                avgCBT21B1: 1,
                avgCBT21B2: 1,
                avgCBT22B1: 1,
                avgCBT22B2: 1,
                avgCBT23B1: 1,
                avgCBT23B2: 1,
                avgCBT24B1: 1,
                avgCBT24B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ])
        ]);
  
        const combinedGroupedData = allGroupedData.flat();
  
        if (combinedGroupedData.length === 0) {
          return res.status(404).json({ error: "No data found for the given date range" });
        }
  
        return res.status(200).json(combinedGroupedData);
      } 
       else if (average === "Day") {
         const allGroupedData = await Promise.all([
          SensorModel1.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:00:00Z",
                    date: "$createdAt"
                  }
                },
                avgCBT1A1: { $avg: { $toDouble: "$CBT1A1" } },
                avgCBT1A2: { $avg: { $toDouble: "$CBT1A2" } },
                avgCBT2A1: { $avg: { $toDouble: "$CBT2A1" } },
                avgCBT2A2: { $avg: { $toDouble: "$CBT2A2" } },
                avgCBT3A1: { $avg: { $toDouble: "$CBT3A1" } },
                avgCBT3A2: { $avg: { $toDouble: "$CBT3A2" } },
                avgCBT4A1: { $avg: { $toDouble: "$CBT4A1" } },
                avgCBT4A2: { $avg: { $toDouble: "$CBT4A2" } },
                avgCBT5A1: { $avg: { $toDouble: "$CBT5A1" } },
                avgCBT5A2: { $avg: { $toDouble: "$CBT5A2" } },
                avgCBT6A1: { $avg: { $toDouble: "$CBT6A1" } },
                avgCBT6A2: { $avg: { $toDouble: "$CBT6A2" } },
                avgCBT7A1: { $avg: { $toDouble: "$CBT7A1" } },
                avgCBT7A2: { $avg: { $toDouble: "$CBT7A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT1A1: 1,
                avgCBT1A2: 1,
                avgCBT2A1: 1,
                avgCBT2A2: 1,
                avgCBT3A1: 1,
                avgCBT3A2: 1,
                avgCBT4A1: 1,
                avgCBT4A2: 1,
                avgCBT5A1: 1,
                avgCBT5A2: 1,
                avgCBT6A1: 1,
                avgCBT6A2: 1,
                avgCBT7A1: 1,
                avgCBT7A2: 1,
                TIME: 1
              }
            },
            { $sort: { "_id": 1 } }
          ]),
          SensorModel2.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT8A1: { $avg: { $toDouble: "$CBT8A1" } },
                avgCBT8A2: { $avg: { $toDouble: "$CBT8A2" } },
                avgCBT9A1: { $avg: { $toDouble: "$CBT9A1" } },
                avgCBT9A2: { $avg: { $toDouble: "$CBT9A2" } },
                avgCBT10A1: { $avg: { $toDouble: "$CBT10A1" } },
                avgCBT10A2: { $avg: { $toDouble: "$CBT10A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT8A1: 1,
                avgCBT8A2: 1,
                avgCBT9A1: 1,
                avgCBT9A2: 1,
                avgCBT10A1: 1,
                avgCBT10A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel3.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT11A1: { $avg: { $toDouble: "$CBT11A1" } },
                avgCBT11A2: { $avg: { $toDouble: "$CBT11A2" } },
                avgCBT12A1: { $avg: { $toDouble: "$CBT12A1" } },
                avgCBT12A2: { $avg: { $toDouble: "$CBT12A2" } },
                avgCBT13A1: { $avg: { $toDouble: "$CBT13A1" } },
                avgCBT13A2: { $avg: { $toDouble: "$CBT13A2" } },
                avgCBT14A1: { $avg: { $toDouble: "$CBT14A1" } },
                avgCBT14A2: { $avg: { $toDouble: "$CBT14A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT11A1: 1,
                avgCBT11A2: 1,
                avgCBT12A1: 1,
                avgCBT12A2: 1,
                avgCBT13A1: 1,
                avgCBT13A2: 1,
                avgCBT14A1: 1,
                avgCBT14A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel4.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT15A1: { $avg: { $toDouble: "$CBT15A1" } },
                avgCBT15A2: { $avg: { $toDouble: "$CBT15A2" } },
                avgCBT16A1: { $avg: { $toDouble: "$CBT16A1" } },
                avgCBT16A2: { $avg: { $toDouble: "$CBT16A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT15A1: 1,
                avgCBT15A2: 1,
                avgCBT16A1: 1,
                avgCBT16A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel5.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT17A1: { $avg: { $toDouble: "$CBT17A1" } },
                avgCBT17A2: { $avg: { $toDouble: "$CBT17A2" } },
                avgCBT18A1: { $avg: { $toDouble: "$CBT18A1" } },
                avgCBT18A2: { $avg: { $toDouble: "$CBT18A2" } },
                avgCBT19A1: { $avg: { $toDouble: "$CBT19A1" } },
                avgCBT19A2: { $avg: { $toDouble: "$CBT19A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT17A1: 1,
                avgCBT17A2: 1,
                avgCBT18A1: 1,
                avgCBT18A2: 1,
                avgCBT19A1: 1,
                avgCBT19A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel6.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT20A1: { $avg: { $toDouble: "$CBT20A1" } },
                avgCBT20A2: { $avg: { $toDouble: "$CBT20A2" } },
                avgCBT21A1: { $avg: { $toDouble: "$CBT21A1" } },
                avgCBT21A2: { $avg: { $toDouble: "$CBT21A2" } },
                avgCBT22A1: { $avg: { $toDouble: "$CBT22A1" } },
                avgCBT22A2: { $avg: { $toDouble: "$CBT22A2" } },
                avgCBT23A1: { $avg: { $toDouble: "$CBT23A1" } },
                avgCBT23A2: { $avg: { $toDouble: "$CBT23A2" } },
                avgCBT24A1: { $avg: { $toDouble: "$CBT24A1" } },
                avgCBT24A2: { $avg: { $toDouble: "$CBT24A2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT20A1: 1,
                avgCBT20A2: 1,
                avgCBT21A1: 1,
                avgCBT21A2: 1,
                avgCBT22A1: 1,
                avgCBT22A2: 1,
                avgCBT23A1: 1,
                avgCBT23A2: 1,
                avgCBT24A1: 1,
                avgCBT24A2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel7.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT1B1: { $avg: { $toDouble: "$CBT1B1" } },
                avgCBT1B2: { $avg: { $toDouble: "$CBT1B2" } },
                avgCBT2B1: { $avg: { $toDouble: "$CBT2B1" } },
                avgCBT2B2: { $avg: { $toDouble: "$CBT2B2" } },
                avgCBT3B1: { $avg: { $toDouble: "$CBT3B1" } },
                avgCBT3B2: { $avg: { $toDouble: "$CBT3B2" } },
                avgCBT4B1: { $avg: { $toDouble: "$CBT4B1" } },
                avgCBT4B2: { $avg: { $toDouble: "$CBT4B2" } },
                avgCBT5B1: { $avg: { $toDouble: "$CBT5B1" } },
                avgCBT5B2: { $avg: { $toDouble: "$CBT5B2" } },
                avgCBT6B1: { $avg: { $toDouble: "$CBT6B1" } },
                avgCBT6B2: { $avg: { $toDouble: "$CBT6B2" } },
                avgCBT7B1: { $avg: { $toDouble: "$CBT7B1" } },
                avgCBT7B2: { $avg: { $toDouble: "$CBT7B2" } },
                avgCBT8B1: { $avg: { $toDouble: "$CBT8B1" } },
                avgCBT8B2: { $avg: { $toDouble: "$CBT8B2" } },
                avgCBT9B1: { $avg: { $toDouble: "$CBT9B1" } },
                avgCBT9B2: { $avg: { $toDouble: "$CBT9B2" } },
                avgCBT10B1: { $avg: { $toDouble: "$CBT10B1" } },
                avgCBT10B2: { $avg: { $toDouble: "$CBT10B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT1B1: 1,
                avgCBT1B2: 1,
                avgCBT2B1: 1,
                avgCBT2B2: 1,
                avgCBT3B1: 1,
                avgCBT3B2: 1,
                avgCBT4B1: 1,
                avgCBT4B2: 1,
                avgCBT5B1: 1,
                avgCBT5B2: 1,
                avgCBT6B1: 1,
                avgCBT6B2: 1,
                avgCBT7B1: 1,
                avgCBT7B2: 1,
                avgCBT8B1: 1,
                avgCBT8B2: 1,
                avgCBT9B1: 1,
                avgCBT9B2: 1,
                avgCBT10B1: 1,
                avgCBT10B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel8.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT11B1: { $avg: { $toDouble: "$CBT11B1" } },
                avgCBT11B2: { $avg: { $toDouble: "$CBT11B2" } },
                avgCBT12B1: { $avg: { $toDouble: "$CBT12B1" } },
                avgCBT12B2: { $avg: { $toDouble: "$CBT12B2" } },
                avgCBT13B1: { $avg: { $toDouble: "$CBT13B1" } },
                avgCBT13B2: { $avg: { $toDouble: "$CBT13B2" } },
                avgCBT14B1: { $avg: { $toDouble: "$CBT14B1" } },
                avgCBT14B2: { $avg: { $toDouble: "$CBT14B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT11B1: 1,
                avgCBT11B2: 1,
                avgCBT12B1: 1,
                avgCBT12B2: 1,
                avgCBT13B1: 1,
                avgCBT13B2: 1,
                avgCBT14B1: 1,
                avgCBT14B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel9.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT15B1: { $avg: { $toDouble: "$CBT15B1" } },
                avgCBT15B2: { $avg: { $toDouble: "$CBT15B2" } },
                avgCBT16B1: { $avg: { $toDouble: "$CBT16B1" } },
                avgCBT16B2: { $avg: { $toDouble: "$CBT16B2" } },
                avgCBT17B1: { $avg: { $toDouble: "$CBT17B1" } },
                avgCBT17B2: { $avg: { $toDouble: "$CBT17B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT15B1: 1,
                avgCBT15B2: 1,
                avgCBT16B1: 1,
                avgCBT16B2: 1,
                avgCBT17B1: 1,
                avgCBT17B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ]),
          SensorModel10.aggregate([
            {
              $match: {
                createdAt: { $gte: date1, $lt: date2 },
              },
            },
            {
              $addFields: {
                date: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt"
                  }
                },
                hour: {
                  $dateToString: {
                    format: "%H",
                    date: "$createdAt"
                  }
                }
              }
            },
            {
              $group: {
                _id: { date: "$date", hour: "$hour" },
                avgCBT19B1: { $avg: { $toDouble: "$CBT19B1" } },
                avgCBT19B2: { $avg: { $toDouble: "$CBT19B2" } },
                avgCBT20B1: { $avg: { $toDouble: "$CBT20B1" } },
                avgCBT20B2: { $avg: { $toDouble: "$CBT20B2" } },
                avgCBT21B1: { $avg: { $toDouble: "$CBT21B1" } },
                avgCBT21B2: { $avg: { $toDouble: "$CBT21B2" } },
                avgCBT22B1: { $avg: { $toDouble: "$CBT22B1" } },
                avgCBT22B2: { $avg: { $toDouble: "$CBT22B2" } },
                avgCBT23B1: { $avg: { $toDouble: "$CBT23B1" } },
                avgCBT23B2: { $avg: { $toDouble: "$CBT23B2" } },
                avgCBT24B1: { $avg: { $toDouble: "$CBT24B1" } },
                avgCBT24B2: { $avg: { $toDouble: "$CBT24B2" } },
                TIME: { $first: "$TIME" }
              }
            },
            {
              $project: {
                _id: 0,
                avgCBT19B1: 1,
                avgCBT19B2: 1,
                avgCBT20B1: 1,
                avgCBT20B2: 1,
                avgCBT21B1: 1,
                avgCBT21B2: 1,
                avgCBT22B1: 1,
                avgCBT22B2: 1,
                avgCBT23B1: 1,
                avgCBT23B2: 1,
                avgCBT24B1: 1,
                avgCBT24B2: 1,
                TIME: 1
              }
            },
            { $sort: { "date": 1, "hour": 1 } }
          ])
        ]);
  
        const combinedGroupedData = allGroupedData.flat();
  
  
        if (combinedGroupedData.length === 0) {
          return res.status(404).json({ error: "No data found for the given date range" });
        }
  
        return res.status(200).json(combinedGroupedData);
      }
  
    }

    // Handle case for a specific key
    const model = findModelByKey(key);
    if (!model) {
      return res.status(404).json({ error: "Key not found in any model" });
    }

    const data = await model.find({
      createdAt: { $gte: date1, $lte: date2 },
      [key]: { $exists: true },
    }).lean();

    if (data.length === 0) {
      return res.status(404).json({ error: "No data found for the given key" });
    }

    if (average === "Day") {
      const groupedData = await model.aggregate([
        {
          $match: {
            createdAt: { $gte: date1, $lt: date2 },
          },
        },
        {
          $project: {
            [key]: { $toDouble: `$${key}` },
            TIME: 1,
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt"
              }
            }
          }
        },
        {
          $group: {
            _id: "$_id",
            [key]: { $avg: `$${key}` },
            TIME: { $first: "$TIME" }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
      return res.status(200).json(groupedData);
    } else if (average === "Hour") {
      const groupedData = await model.aggregate([
        {
          $match: {
            createdAt: { $gte: date1, $lt: date2 },
          },
        },
        {
          $project: {
            hour: { $hour: "$createdAt" },
            TIME: 1,
            [key]: 1,
          }
        },
        {
          $group: {
            _id: "$_id",
            [key]: {
              $avg: { $toDouble: `$${key}` }
            },
            TIME: { $first: "$TIME" }
          }
        },
        {
          $project: {
            // hour: "$_id",
            [key]: 1,
            TIME: 1,
          _id: 0
          }
        }
      ]);
      return res.status(200).json(groupedData);
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const ApiController = { Aside, Bside, getallsensor, cbname, fetchSensorDataByKey };
