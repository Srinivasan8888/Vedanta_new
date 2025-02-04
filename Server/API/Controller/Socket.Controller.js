import SensorModel1 from "../Models/SensorModel1.js";
import SensorModel2 from "../Models/SensorModel2.js";
import SensorModel3 from "../Models/SensorModel3.js";
import SensorModel4 from "../Models/SensorModel4.js";
import SensorModel5 from "../Models/SensorModel5.js";
import SensorModel6 from "../Models/SensorModel6.js";
import SensorModel7 from "../Models/SensorModel7.js";
import SensorModel8 from "../Models/SensorModel8.js";
import SensorModel9 from "../Models/SensorModel9.js";
import SensorModel10 from "../Models/SensorModel10.js";
import AverageModel from "../Models/AverageModel.js";

export const allsocketData = (io) => {
    const options = { fullDocument: "updateLookup" };
    const modelMap = {
        SensorModel1,
        SensorModel2,
        SensorModel3,
        SensorModel4,
        SensorModel5,
        SensorModel6,
        SensorModel7,
        SensorModel8,
        SensorModel9,
        SensorModel10,
    };

    const getAllSensorData = async () => {
        const allData = [];
        for (let i = 1; i <= 10; i++) {
            const modelName = `SensorModel${i}`;
            const data = await modelMap[modelName].aggregate([
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        id: 0,
                        TIME: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        busbar: 0
                    }
                }
            ]);
            if (data[0]) {
                allData.push(data[0]);
            }
        }
        return allData;
    };

    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial data");
        try {
            const allData = await getAllSensorData();
            io.emit("AllData", allData);
        } catch (error) {
            console.error("Error sending initial data:", error);
        }
    });

    for (let i = 1; i <= 10; i++) {
        const modelName = `SensorModel${i}`;
        modelMap[modelName].watch([], options).on("change", async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const allData = await getAllSensorData();
            io.emit("AllData", allData);
        });
    }
};

export const SideData = (io) => {
    const options = { fullDocument: "updateLookup" };
    const modelMap = {
        SensorModel1,
        SensorModel2,
        SensorModel3,
        SensorModel4,
        SensorModel5,
        SensorModel6,

    };

    const modelMap2 = {
        SensorModel7,
        SensorModel8,
        SensorModel9,
        SensorModel10,
    };

    const getASideData = async () => {
        const allData = [];
        for (let i = 1; i <= 6; i++) {
            const modelName = `SensorModel${i}`;
            const data = await modelMap[modelName].aggregate([
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        id: 0,
                        TIME: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        busbar: 0
                    }
                }
            ]);
            if (data[0]) {
                allData.push(data[0]);
            }
        }
        return allData;
    };

    const getBSideData = async () => {
        const allData = [];
        for (let i = 7; i <= 10; i++) {
            const modelName = `SensorModel${i}`;
            const data = await modelMap2[modelName].aggregate([
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                {
                    $project: {
                        _id: 0,
                        id: 0,
                        TIME: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        busbar: 0
                    }
                }
            ]);
            if (data[0]) {
                allData.push(data[0]);
            }
        }
        return allData;
    };

    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial data");
        try {
            const AsideData = await getASideData();
            const BSideData = await getBSideData();
            io.emit("ASide", AsideData);
            io.emit("BSide", BSideData);
        } catch (error) {
            console.error("Error sending initial data:", error);
        }
    });

    for (let i = 1; i <= 6; i++) {
        const modelName = `SensorModel${i}`;
        modelMap[modelName].watch([], options).on("change", async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const AData = await getASideData();
            io.emit("ASide", AData);
        });
    }

    for (let i = 7; i <= 10; i++) {
        const modelName = `SensorModel${i}`;
        modelMap2[modelName].watch([], options).on("change", async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const BData = await getBSideData();
            io.emit("BSide", BData);
        });
    }
};

export const Avgchartdash = (io, time) => {
    const options = { fullDocument: "updateLookup" };
    const model = AverageModel;
    let changedtime;
    const currentDateTime = new Date();

    // Function to set changedtime based on the time parameter
    const setChangedTime = (time) => {
        if (time == "1D") {
            return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // 1 day ago
        } else if (time == "3D") {
            return new Date(currentDateTime.getTime() - (3 * 24 * 60 * 60 * 1000)); // 3 days ago
        } else if (time == "1W") {
            return new Date(currentDateTime.getTime() - (7 * 24 * 60 * 60 * 1000)); // 1 week ago
        } else if (time == "1M") {
            return new Date(currentDateTime.getTime() - (30 * 24 * 60 * 60 * 1000)); // 1 month ago
        } else if (time == "6M") {
            return new Date(currentDateTime.getTime() - (6 * 30 * 24 * 60 * 60 * 1000)); // 6 months ago
        } else {
            console.warn("Invalid time parameter:", time);
            return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // Default to 1 day ago
        }
    };

    // Set initial changedtime
    changedtime = setChangedTime(time);

    const getAvgTemp = async (changedtime) => {
        try {

            console.log("current time", currentDateTime);
            console.log("Querying data from:", changedtime); // Log the time range being queried
            const data = await model.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: changedtime // Use changedtime directly
                        }
                    }
                },
                {
                    $project: {
                        Avgtemp: 1,
                        TIME: 1,
                        _id: 0,
                        createdAt: 1
                    }
                }
            ]);

            // console.log("Filtered Data:", data);

            if (data.length === 0) {
                console.warn("No data found for the specified time range.");
                return { data: [], minAvgTemp: null, maxAvgTemp: null }; // Return nulls instead of Infinity
            }

            const avgTemps = data.map(item => parseFloat(item.Avgtemp));
            const minAvgTemp = Math.min(...avgTemps);
            const maxAvgTemp = Math.max(...avgTemps);

            return {
                data,
                minAvgTemp,
                maxAvgTemp
            };
        } catch (error) {
            console.error("Error fetching average temperature:", error);
            return { data: [], minAvgTemp: null, maxAvgTemp: null };
        }
    };

    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial average temperature data");
        try {
            const avgTempData = await getAvgTemp(changedtime); // Pass changedtime
            // console.log("Emitting Avgtempdata:", avgTempData);
            io.emit("Avgtempdata", avgTempData);
        } catch (error) {
            console.error("Error sending initial average temperature data:", error);
        }

        socket.on("ButtonClick", async (buttonId) => {
            console.log("Button clicked with ID:", buttonId);
            // Update changedtime based on buttonId (you can customize this logic)
            changedtime = setChangedTime(buttonId); // Assuming buttonId corresponds to time parameter
            const avgTempData = await getAvgTemp(changedtime); // Pass updated changedtime
            // console.log("Emitting Avgtempdata on button click:", avgTempData);
            io.emit("Avgtempdata", avgTempData);
        });
    });

    model.watch([], options).on("change", async (change) => {
        console.log("[change detected in Average Temp]", change);
        const avgTempData = await getAvgTemp(changedtime); // Pass changedtime
        // console.log("Emitting Avgtempdata on change:", avgTempData);
        io.emit("Avgtempdata", avgTempData);
    });
};

export const AvgtempModel = (io, time) => {
    const options = { fullDocument: "updateLookup" };
    const models = [
        SensorModel1, SensorModel2, SensorModel3, SensorModel4, SensorModel5,
        SensorModel6, SensorModel7, SensorModel8, SensorModel9, SensorModel10
    ];
    const nameMapping = [
        "CBT1A2", "CBT1A1", "CBT2A2", "CBT2A1", "CBT3A2", "CBT3A1", "CBT4A2", "CBT4A1", "CBT5A2", "CBT5A1",
        "CBT6A2", "CBT6A1", "CBT7A2", "CBT7A1",

        "CBT8A1", "CBT8A2", "CBT9A1", "CBT9A2", "CBT10A1", "CBT10A2",

        "CBT11A2", "CBT11A1", "CBT12A2", "CBT12A1", "CBT13A2", "CBT13A1", "CBT14A2", "CBT14A1", "CBT15A2", "CBT15A1",
        "CBT16A2", "CBT16A1", "CBT17A2", "CBT17A1", "CBT18A2", "CBT18A1", "CBT19A2", "CBT19A1", "CBT20A2", "CBT20A1",
        "CBT21A2", "CBT21A1", "CBT22A2", "CBT22A1", "CBT23A2", "CBT23A1", "CBT24A2", "CBT24A1", "CBT25A2", "CBT25A1",
        "CBT26A2", "CBT26A1", "CBT27A2", "CBT27A1", "CBT1B2", "CBT1B1", "CBT2B2", "CBT2B1", "CBT3B2", "CBT3B1",
        "CBT4B2", "CBT4B1", "CBT5B2", "CBT5B1", "CBT6B2", "CBT6B1", "CBT7B2", "CBT7B1", "CBT8B2", "CBT8B1",
        "CBT9B2", "CBT9B1", "CBT10B2", "CBT10B1", "CBT11B2", "CBT11B1", "CBT12B2", "CBT12B1", "CBT13B2", "CBT13B1",
        "CBT14B2", "CBT14B1", "CBT15B2", "CBT15B1", "CBT16B2", "CBT16B1", "CBT17B2", "CBT17B1", "CBT18B2", "CBT18B1",
        "CBT19B2", "CBT19B1", "CBT20B2", "CBT20B1", "CBT21B2", "CBT21B1", "CBT22B2", "CBT22B1", "CBT23B2", "CBT23B1",
        "CBT24B2", "CBT24B1", "CBT25B2", "CBT25B1", "CBT26B2", "CBT26B1", "CBT27B2", "CBT27B1"
    ];
    let changedtime;
    const currentDateTime = new Date();

    // Function to set changedtime based on the time parameter
    const setChangedTime = (time) => {
        if (time == "1D") {
            return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // 1 day ago
        } else if (time == "3D") {
            return new Date(currentDateTime.getTime() - (3 * 24 * 60 * 60 * 1000)); // 3 days ago
        } else if (time == "1W") {
            return new Date(currentDateTime.getTime() - (7 * 24 * 60 * 60 * 1000)); // 1 week ago
        } else if (time == "1M") {
            return new Date(currentDateTime.getTime() - (30 * 24 * 60 * 60 * 1000)); // 1 month ago
        } else if (time == "6M") {
            return new Date(currentDateTime.getTime() - (6 * 30 * 24 * 60 * 60 * 1000)); // 6 months ago
        } else {
            console.warn("Invalid time parameter:", time);
            return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // Default to 1 day ago
        }
    };

    // Set initial changedtime
    changedtime = setChangedTime(time);

    const getSensorData = async (changedtime) => {
        try {
            console.log("current time", currentDateTime);
            console.log("Querying data from:", changedtime); // Log the time range being queried

            const maxMinValues = [];

            // Loop through all sensor models
            for (let i = 0; i < models.length; i++) {
                const model = models[i];
                console.log("models", model)

                // Loop through each parameter in nameMapping
                for (let j = 0; j < nameMapping.length; j++) {
                    const parameter = nameMapping[j];
                    // console.log("parameter", parameter)
                    const data = await model.aggregate([
                        {
                            $match: {
                                createdAt: { $gte: changedtime }
                            }
                        },
                        {
                            $project: {
                                [parameter]: 1, // Dynamically select the parameter field
                                createdAt: 1
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                max: { $max: `$${parameter}` },
                                min: { $min: `$${parameter}` }
                            }
                        }
                    ]);

                    if (data[0] && (data[0].max !== null || data[0].min !== null)) {
                        maxMinValues.push({
                            parameter: parameter,
                            max: data[0].max || null,
                            min: data[0].min || null
                        });
                    }
                }
            }

            return maxMinValues;
        } catch (error) {
            console.error("Error fetching sensor data:", error);
            return [];
        }
    };

    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial sensor data");
        try {
            const sensorData = await getSensorData(changedtime); // Pass changedtime
            // console.log("Emitting sensor data:", sensorData);
            io.emit("AvgModeltemp", sensorData);
        } catch (error) {
            console.error("Error sending initial sensor data:", error);
        }

        socket.on("ButtonClick", async (buttonId) => {
            console.log("Button clicked with ID:", buttonId);
            // Update changedtime based on buttonId (you can customize this logic)
            changedtime = setChangedTime(buttonId); // Assuming buttonId corresponds to time parameter
            const sensorData = await getSensorData(changedtime); // Pass updated changedtime
            // console.log("Emitting sensor data on button click:", sensorData);
            io.emit("AvgModeltemp", sensorData);
        });
    });

    // Watch for changes in any of the sensor models
    models.forEach(model => {
        model.watch([], options).on("change", async (change) => {
            console.log("[change detected in Sensor Model]", change);
            const sensorData = await getSensorData(changedtime); // Pass changedtime
            // console.log("Emitting sensor data on change:", sensorData);
            io.emit("AvgModeltemp", sensorData);
        });
    });
};

export const Heatmaprange = (io) => {
    const options = { fullDocument: "updateLookup" };

    // Map of sensor models
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

    const getCombinedData = async (startDate, endDate, value, models) => {
        const combinedData = []; // Array to hold combined data from all models

        // Fetch data from all models
        for (const modelName in models) {
            const query = {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure dates are parsed correctly
            };

            // Fetch data for the current model
            const data = await modelMap[modelName].aggregate([
                { $match: query },
                {
                    $project: {
                        _id: 0, // Exclude the MongoDB _id field
                        createdAt: 1, // Include the timestamp field
                        ...models[modelName].reduce((acc, key) => {
                            acc[key] = 1; // Include all specified keys
                            return acc;
                        }, {}),
                    },
                },
            ]);

            // Flatten the data and add it to the combined array
            data.forEach((doc) => {
                models[modelName].forEach((key) => {
                    if (doc[key] !== undefined) {
                        combinedData.push({
                            key, // Sensor key (e.g., CBT1A1)
                            value: doc[key], // Sensor value
                            // createdAt: doc.createdAt, // Timestamp
                        });
                    }
                });
            });
        }

        // Determine the sort order based on the value parameter
        const sortOrder = value === 'max' ? -1 : 1;

        // Sort combined data by value and limit to 7 entries
        combinedData.sort((a, b) => (a.value - b.value) * sortOrder);
        const top7Data = combinedData.slice(0, 7);

        return top7Data; // Return only the top 7 values
    };

    const getASideData = async (startDate, endDate, value) => {
        const ASideModels = {
            model1: models.model1,
            model2: models.model2,
            model3: models.model3,
            model4: models.model4,
            model5: models.model5,
            model6: models.model6,
        };
        return getCombinedData(startDate, endDate, value, ASideModels);
    };

    const getBSideData = async (startDate, endDate, value) => {
        const BSideModels = {
            model7: models.model7,
            model8: models.model8,
            model9: models.model9,
            model10: models.model10,
        };
        return getCombinedData(startDate, endDate, value, BSideModels);
    };

    // WebSocket connection handler
    io.on('connection', async (socket) => {
        console.log('Client connected, sending initial data');

        // Listen for client requests with parameters
        socket.on('requestrangedata', async (params) => {
            const { value, startDate, endDate, side } = params; // Extract parameters
            console.log('Received requestData:', params); // Debugging

            try {
                if (side === 'ASide') {
                    const AsideData = await getASideData(new Date(startDate), new Date(endDate), value);
                    socket.emit('ASiderange', AsideData); // Emit to the specific client
                } else if (side === 'BSide') {
                    const BSideData = await getBSideData(new Date(startDate), new Date(endDate), value);
                    socket.emit('BSiderange', BSideData); // Emit to the specific client
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        });
    });

    // Watch for changes in SensorModels (ASide)
    for (let i = 1; i <= 6; i++) {
        const modelName = `model${i}`;
        modelMap[modelName].watch([], options).on('change', async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const AData = await getASideData(new Date(0), new Date(), 'max'); // Fetch all data from the beginning of time to now
            io.emit('ASide', AData);
        });
    }

    // Watch for changes in SensorModels (BSide)
    for (let i = 7; i <= 10; i++) {
        const modelName = `model${i}`;
        modelMap[modelName].watch([], options).on('change', async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const BData = await getBSideData(new Date(0), new Date(), 'max'); // Fetch all data from the beginning of time to now
            io.emit('BSide', BData);
        });
    }
};

export const Heatmap = (io) => {
    const options = { fullDocument: "updateLookup" };

    // Map of sensor models
    const modelMap = {
        SensorModel1,
        SensorModel2,
        SensorModel3,
        SensorModel4,
        SensorModel5,
        SensorModel6,
    };

    const modelMap2 = {
        SensorModel7,
        SensorModel8,
        SensorModel9,
        SensorModel10,
    };

    const getASideData = async (startDate, endDate) => {
        const allData = { timestamps: [], data: {} }; // Initialize data structure
        for (let i = 1; i <= 6; i++) {
            const modelName = `SensorModel${i}`;
            const query = {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure dates are parsed correctly
            };
            const data = await modelMap[modelName].aggregate([
                { $match: query },
                { $sort: { createdAt: -1 } },
                {
                    $project: {
                        _id: 0,
                        createdAt: 1,
                        TIME: 1,
                        day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Extract the date without time
                        ...Object.keys(modelMap[modelName].schema.paths).reduce((acc, key) => {
                            if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'  && key !== 'busbar' && key !== 'id') {
                                acc[key] = 1; // Include all other fields
                            }
                            return acc;
                        }, {}),
                    },
                },
                {
                    $group: {
                        _id: "$day", // Group by the day
                        createdAt: { $first: "$createdAt" }, // Get the first timestamp for the day
                        TIME: 1,
                        ...Object.keys(modelMap[modelName].schema.paths).reduce((acc, key) => {
                            if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'  && key !== 'busbar' && key !== 'id') {
                                acc[key] = { $first: `$${key}` }; // Get the first value for each field
                            }
                            return acc;
                        }, {}),
                    },
                },
                { $sort: { createdAt: -1 } }, // Sort by the timestamp again if needed
            ]);
    
            // Populate the data structure
            data.forEach((doc) => {
                allData.timestamps.push(doc.createdAt); // Add timestamp
                Object.keys(doc).forEach((key) => {
                    if (key !== 'createdAt') {
                        if (!allData.data[key]) {
                            allData.data[key] = []; // Initialize array for each key if it doesn't exist
                        }
                        allData.data[key].push(doc[key]); // Add value to the corresponding key
                    }
                });
            });
        }
        return allData;
    };
    

    const getBSideData = async (startDate, endDate) => {
        const allData = { timestamps: [], data: {} }; // Initialize data structure
        for (let i = 7; i <= 10; i++) {
            const modelName = `SensorModel${i}`;
            const query = {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure dates are parsed correctly
            };
    
            // Check if the model exists in modelMap2
            if (!modelMap2[modelName]) {
                console.warn(`Model ${modelName} not found in modelMap2`);
                continue; // Skip this iteration if the model is not found
            }
    
            const data = await modelMap2[modelName].aggregate([
                { $match: query },
                { $sort: { createdAt: -1 } },
                {
                    $project: {
                        _id: 0,
                        createdAt: 1,
                        TIME: 1,
                        day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Extract the date without time
                        ...Object.keys(modelMap2[modelName].schema.paths).reduce((acc, key) => {
                            if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'busbar' && key !== 'id') {
                                acc[key] = 1; // Include all other fields
                            }
                            return acc;
                        }, {}),
                    },
                },
                {
                    $group: {
                        _id: "$day", // Group by the day
                        createdAt: { $first: "$createdAt" }, // Get the first timestamp for the day
                        TIME: 1,
                        ...Object.keys(modelMap2[modelName].schema.paths).reduce((acc, key) => {
                            if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'busbar' && key !== 'id') {
                                acc[key] = { $first: `$${key}` }; // Get the first value for each field
                            }
                            return acc;
                        }, {}),
                    },
                },
                { $sort: { createdAt: -1 } }, // Sort by the timestamp again if needed
            ]);
    
            // Populate the data structure
            data.forEach((doc) => {
                allData.timestamps.push(doc.createdAt); // Add timestamp
                Object.keys(doc).forEach((key) => {
                    if (key !== 'createdAt') {
                        if (!allData.data[key]) {
                            allData.data[key] = []; // Initialize array for each key if it doesn't exist
                        }
                        allData.data[key].push(doc[key]); // Add value to the corresponding key
                    }
                });
            });
        }
        return allData;
    };
    

    // WebSocket connection handler
    io.on('connection', async (socket) => {
        console.log('Client connected, sending initial data');

        // Listen for client requests with parameters
        socket.on('requestData', async (params) => {
            const { value, startDate, endDate, side } = params; // Extract parameters
            console.log('Received requestData:', params); // Debugging

            try {
                if (side === 'ASide') {
                    const AsideData = await getASideData(new Date(startDate), new Date(endDate));
                    socket.emit('ASide', AsideData); // Emit to the specific client
                } else if (side === 'BSide') {
                    const BSideData = await getBSideData(new Date(startDate), new Date(endDate));
                    socket.emit('BSide', BSideData); // Emit to the specific client
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        });
    });

    // Watch for changes in SensorModels (ASide)
    for (let i = 1; i <= 6; i++) {
        const modelName = `SensorModel${i}`;
        modelMap[modelName].watch([], options).on('change', async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const AData = await getASideData(new Date(0), new Date()); // Fetch all data from the beginning of time to now
            io.emit('ASide', AData);
        });
    }

    // Watch for changes in SensorModels (BSide)
    for (let i = 7; i <= 10; i++) {
        const modelName = `SensorModel${i}`;
        modelMap2[modelName].watch([], options).on('change', async (change) => {
            console.log(`[change detected in ${modelName}]`, change);
            const BData = await getBSideData(new Date(0), new Date()); // Fetch all data from the beginning of time to now
            io.emit('BSide', BData);
        });
    }
};

export const collectorbar = (io) => {
    const options = { fullDocument: "updateLookup" };

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

    const parseTimeToDate = (time) => {
        const now = Date.now(); // Get current timestamp in milliseconds
        const num = parseInt(time.match(/\d+/)?.[0] || 0, 10); // Extract numeric value
        const unit = time.match(/[a-zA-Z]+/)?.[0] || ''; // Extract time unit

        let seconds = 0;

        switch (unit.toLowerCase()) {
            case 'min': seconds = num * 60; break; // Minutes
            case 'h': seconds = num * 60 * 60; break; // Hours
            case 'd': seconds = num * 24 * 60 * 60; break; // Days
            case 'w': seconds = num * 7 * 24 * 60 * 60; break; // Weeks
            case 'm': seconds = num * 30 * 24 * 60 * 60; break; // Months (approximate)
            default:
                console.warn("Invalid time format:", time);
                return new Date(now); // Return current time if invalid
        }

        return new Date(now - seconds * 1000); // Convert to milliseconds
    };

    const getModelKeyFromSensorId = (sensorId) => {
        for (const [key, sensors] of Object.entries(models)) {
            if (sensors.includes(sensorId)) {
                return key; // Return the model key if the sensor ID is found
            }
        }
        return null; // Return null if no model is found
    };

    const getCollectorBarData = async (sensorId, time) => {
        const modelKey = getModelKeyFromSensorId(sensorId);
        if (!modelKey) {
            console.warn(`No model found for sensor ID: ${sensorId}`);
            return null;
        }

        const model = modelMap[modelKey];
        if (!model) {
            console.warn(`Model ${modelKey} not found`);
            return null;
        }

        const date = parseTimeToDate(time);
        console.log(`Fetching data for sensor ID: ${sensorId}, Model: ${modelKey}, Time: ${time}, Date: ${date}`);

        try {
            const data = await model.aggregate([
                { $match: { createdAt: { $gte: date } } },
                {
                    $project: {
                        _id: 0,
                        createdAt: 1,
                        [sensorId]: 1 // Include only the requested sensor ID
                    }
                }
            ]);

            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error("Error fetching collector bar data:", error);
            return null;
        }
    };

    io.on('connection', (socket) => {
        console.log('Client connected');

        socket.on('requestedCollectorbar', async (params) => {
            console.log('Received requestData:', params);

            const { value: sensorId, date: time } = params; // 'value' is the sensor ID, 'date' is the time
            if (!sensorId || !time) {
                console.warn("Invalid request: Missing sensor ID or time");
                io.emit('error', { message: "Invalid parameters: sensor ID and time are required" });
                return;
            }

            try {
                const data = await getCollectorBarData(sensorId, time); // Use sensor ID and time
                socket.emit('collectorBarData', data);
            } catch (error) {
                console.error("Error processing request:", error);
                socket.emit('error', { message: "Failed to retrieve data" });
            }
        });

        Object.keys(modelMap).forEach((modelKey) => {
            const model = modelMap[modelKey];
            if (model) {
                model.watch([], options).on('change', async (change) => {
                    console.log(`Data changed for ${modelKey}:`, change);
                    const updatedData = await getCollectorBarData(models[modelKey][0], "10m"); // Use the first sensor ID in the model
                    io.emit('collectorBarData', updatedData);
                });
            }
        });
    });
};