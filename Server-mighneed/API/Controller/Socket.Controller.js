import SensorModel1 from "../Models/sensorModel1.js";
import SensorModel2 from "../Models/sensorModel2.js";
import SensorModel3 from "../Models/sensorModel3.js";
import SensorModel4 from "../Models/sensorModel4.js";
import SensorModel5 from "../Models/sensorModel5.js";
import SensorModel6 from "../Models/sensorModel6.js";
import SensorModel7 from "../Models/sensorModel7.js";
import SensorModel8 from "../Models/sensorModel8.js";
import SensorModel9 from "../Models/sensorModel9.js";
import SensorModel10 from "../Models/sensorModel10.js";
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

    // Function to fetch filtered sensor data for a specific userId
    const getAllSensorData = async (userId) => {
        const promises = Object.values(modelMap).map(model =>
            model.aggregate([
                { $match: { id: userId } }, // Filter by userId (id field)
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
            ])
        );
        const results = await Promise.all(promises);
        return results.flat().filter(Boolean); // Flatten array & remove empty results
    };

    io.on('connection', async (socket) => {
        // console.log("Client connected, sending initial data");

        // Extract userId from the socket handshake
        // const { userId } = socket.handshake.auth;
        const { userId } = 1604;

        try {
            // Fetch data filtered by userId
            const allData = await getAllSensorData(userId);
            io.emit("AllData", allData);

            // Set up change streams for each model
            const changeStreams = Object.values(modelMap).map(model => {
                const changeStream = model.watch([], options);

                changeStream.on('change', async (change) => {
                    // console.log(`Change detected in ${model.modelName}:`, change);

                    // Wait for the insertion to complete before fetching updated data
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second to ensure insertion is completed

                    // Fetch updated data for the user after a change
                    const updatedData = await getAllSensorData(userId);
                    io.emit("AllData", updatedData);
                });

                return changeStream;
            });

            // Clean up change streams when the socket disconnects
            socket.on('disconnect', () => {
                // console.log("Client disconnected, closing change streams");
                changeStreams.forEach(stream => stream.close());
            });
        } catch (error) {
            // console.error("Error sending initial data or setting up watch:", error);
        }
    });
};

export const SideData = (io) => {
    const options = { fullDocument: "updateLookup" };
    const modelMap = { SensorModel1, SensorModel2, SensorModel3, SensorModel4, SensorModel5, SensorModel6 };
    const modelMap2 = { SensorModel7, SensorModel8, SensorModel9, SensorModel10 };

    // Function to fetch latest A-Side data for a specific userId
    const getASideData = async (userId) => {
        const promises = Object.values(modelMap).map((model) =>
            model.aggregate([
                { $match: { id: userId } }, // Filter by userId
                { $sort: { createdAt: -1 } }, // Sort by createdAt descending
                { $limit: 1 }, // Get the latest record
                {
                    $project: { _id: 0, id: 0, TIME: 0, createdAt: 0, updatedAt: 0, __v: 0, busbar: 0 },
                },
            ])
        );
        const results = await Promise.all(promises);
        return results.map(data => data[0]).filter(Boolean); // Flatten and filter empty results
    };

    // Function to fetch latest B-Side data for a specific userId
    const getBSideData = async (userId) => {
        const promises = Object.values(modelMap2).map((model) =>
            model.aggregate([
                { $match: { id: userId } }, // Filter by userId
                { $sort: { createdAt: -1 } }, // Sort by createdAt descending
                { $limit: 1 }, // Get the latest record
                {
                    $project: { _id: 0, id: 0, TIME: 0, createdAt: 0, updatedAt: 0, __v: 0, busbar: 0 },
                },
            ])
        );
        const results = await Promise.all(promises);
        return results.map(data => data[0]).filter(Boolean); // Flatten and filter empty results
    };

    io.on("connection", async (socket) => {
        console.log("Client connected, sending initial data");

        // Extract userId from the socket handshake
        const { userId } = socket.handshake.auth;
        if (!userId) {
            console.error("No userId provided in socket handshake");
            return;
        }

        try {
            // Fetch initial A-Side and B-Side data for the user
            const [ASideData, BSideData] = await Promise.all([getASideData(userId), getBSideData(userId)]);

            // Emit initial data to the client
            socket.emit("ASideUpdate", ASideData);
            socket.emit("BSideUpdate", BSideData);
        } catch (error) {
            console.error("Error sending initial data:", error);
        }
    });

    // Set up change streams for A-Side models
    for (const model of Object.values(modelMap)) {
        const changeStream = model.watch([], options);
        changeStream.on("change", async (change) => {
            console.log(`[Change detected in ${model.modelName}]`, change);

            // Extract userId from the changed document
            const userId = change.fullDocument?.id;
            if (!userId) {
                console.warn(`No userId found in change event for ${model.modelName}`);
                return;
            }

            try {
                // Fetch updated A-Side data for the affected userId
                const AData = await getASideData(userId);

                // Log the updated data for debugging
                console.log("Updated A-Side Data:", AData);

                // Emit the updated data to all connected clients
                io.emit("ASideUpdate", AData);
            } catch (error) {
                console.error(`Error handling change in ${model.modelName}:`, error);
            }
        });
    }

    // Set up change streams for B-Side models
    for (const model of Object.values(modelMap2)) {
        const changeStream = model.watch([], options);
        changeStream.on("change", async (change) => {
            console.log(`[Change detected in ${model.modelName}]`, change);

            // Extract userId from the changed document
            const userId = change.fullDocument?.id;
            if (!userId) {
                console.warn(`No userId found in change event for ${model.modelName}`);
                return;
            }

            try {
                // Fetch updated B-Side data for the affected userId
                const BData = await getBSideData(userId);

                // Log the updated data for debugging
                console.log("Updated B-Side Data:", BData);

                // Emit the updated data to all connected clients
                io.emit("BSideUpdate", BData);
            } catch (error) {
                console.error(`Error handling change in ${model.modelName}:`, error);
            }
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
            // console.warn("Invalid time parameter:", time);
            return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // Default to 1 day ago
        }
    };

    // Set initial changedtime
    changedtime = setChangedTime(time);

    // Function to fetch average temperature data for a specific userId
    const getAvgTemp = async (changedtime, userId) => {
        try {
            // console.log("Current time:", currentDateTime);
            // console.log("Querying data from:", changedtime);

            const data = await model.aggregate([
                {
                    $match: {
                        id: userId, // Filter by userId
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
                // console.warn("No data found for the specified time range.");
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
            // console.error("Error fetching average temperature:", error);
            return { data: [], minAvgTemp: null, maxAvgTemp: null };
        }
    };

    // Handle client connections
    io.on('connection', async (socket) => {
        // console.log("Client connected, sending initial average temperature data");

        // Extract userId from the socket handshake
        const { userId } = socket.handshake.auth;

        try {
            const avgTempData = await getAvgTemp(changedtime, userId); // Pass changedtime and userId
            io.emit("Avgtempdata", avgTempData);
        } catch (error) {
            // console.error("Error sending initial average temperature data:", error);
        }

        // Listen for button click events
        socket.on("ButtonClick", async (buttonId) => {
            // console.log("Button clicked with ID:", buttonId);

            // Update changedtime based on buttonId (you can customize this logic)
            changedtime = setChangedTime(buttonId); // Assuming buttonId corresponds to time parameter

            const avgTempData = await getAvgTemp(changedtime, userId); // Pass updated changedtime and userId
            io.emit("Avgtempdata", avgTempData);
        });
    });

    // Watch for changes in the AverageModel
    model.watch([], options).on("change", async (change) => {
        // console.log("[Change detected in Average Temp]", change);

        // Extract userId from the changed document
        const userId = change.fullDocument?.id;

        if (userId) {
            try {
                const avgTempData = await getAvgTemp(changedtime, userId); // Pass changedtime and userId
                io.emit("Avgtempdata", avgTempData);
            } catch (error) {
                // console.error("Error fetching average temperature data on change:", error);
            }
        }
    });
};


export const dashboardDate = (io) => {
    const options = { fullDocument: "updateLookup" };


    const aggregateSensorData = async (model, userId, projectFields) => {
        userId = String(userId);
        return model.aggregate([
            { $match: { id: userId } }, // Filter by userId (id field)
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
            {
                $project: projectFields
            }
        ], { maxTimeMS: 60000, allowDiskUse: true });
    };

    const allSensorDashboardData = async (userId) => {
        return Promise.all([
            aggregateSensorData(SensorModel1, 1604, {
                _id: 0,
                CBT1A1: 1,
                CBT1A2: 1,
                CBT2A1: 1,
                CBT2A2: 1,
                CBT3A1: 1,
                CBT3A2: 1,
                CBT4A1: 1,
                CBT4A2: 1,
                CBT5A1: 1,
                CBT5A2: 1,
                CBT6A1: 1,
                CBT6A2: 1,
                CBT7A1: 1,
                CBT7A2: 1,
            }),
            // aggregateSensorData(SensorModel2, 1604),
            // aggregateSensorData(SensorModel3, 1604),
            // aggregateSensorData(SensorModel4, 1604),
            // aggregateSensorData(SensorModel5, 1604),
            // aggregateSensorData(SensorModel6, 1604),
            // aggregateSensorData(SensorModel7, 1604),
            // aggregateSensorData(SensorModel8, 1604),
            // aggregateSensorData(SensorModel9, 1604),
            // aggregateSensorData(SensorModel10, 1604),
        ]);
    };

    io.on('connection', async (socket) => {
        const { userId } = socket.handshake.auth;

        try {
            const dashboardData = await allSensorDashboardData(userId);
            io.emit("DashboardData", { status: "success", data: dashboardData });
        } catch (error) {
            console.error("Error sending dashboard data:", error);
        }
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
        "CBT6A2", "CBT6A1", "CBT7A2", "CBT7A1", "CBT8A1", "CBT8A2", "CBT9A1", "CBT9A2", "CBT10A1", "CBT10A2",
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

    const currentDateTime = new Date();

    // Function to set changedtime based on the time parameter
    const setChangedTime = (time) => {
        switch (time) {
            case "1D": return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // 1 day ago
            case "3D": return new Date(currentDateTime.getTime() - (3 * 24 * 60 * 60 * 1000)); // 3 days ago
            case "1W": return new Date(currentDateTime.getTime() - (7 * 24 * 60 * 60 * 1000)); // 1 week ago
            case "1M": return new Date(currentDateTime.getTime() - (30 * 24 * 60 * 60 * 1000)); // 1 month ago
            case "6M": return new Date(currentDateTime.getTime() - (6 * 30 * 24 * 60 * 60 * 1000)); // 6 months ago
            default: console.warn("Invalid time parameter:", time); return new Date(currentDateTime.getTime() - (24 * 60 * 60 * 1000)); // Default to 1 day ago
        }
    };

    // Set initial changedtime
    let changedtime = setChangedTime(time);

    const getSensorData = async (changedtime) => {
        try {
            const maxMinValues = [];

            const fetchData = models.map(async (model) => {
                return Promise.all(
                    nameMapping.map(async (parameter) => {
                        const data = await model.aggregate([
                            { $match: { createdAt: { $gte: changedtime } } },
                            { $project: { [parameter]: 1, createdAt: 1 } },
                            { $group: { _id: null, max: { $max: `$${parameter}` }, min: { $min: `$${parameter}` } } }
                        ]);

                        if (data[0] && (data[0].max !== null || data[0].min !== null)) {
                            return {
                                parameter: parameter,
                                max: data[0].max || null,
                                min: data[0].min || null
                            };
                        }
                    })
                );
            });

            const results = await Promise.all(fetchData);

            results.forEach(result => {
                maxMinValues.push(...result.filter(item => item)); // Flatten and remove null values
            });

            return maxMinValues;
        } catch (error) {
            console.error("Error fetching sensor data:", error);
            return [];
        }
    };

    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial sensor data");
        try {
            const sensorData = await getSensorData(changedtime);
            io.emit("AvgModeltemp", sensorData);
        } catch (error) {
            console.error("Error sending initial sensor data:", error);
        }

        socket.on("ButtonClick", async (buttonId) => {
            console.log("Button clicked with ID:", buttonId);
            changedtime = setChangedTime(buttonId);
            const sensorData = await getSensorData(changedtime);
            io.emit("AvgModeltemp", sensorData);
        });
    });

    // Watch for changes in any of the sensor models
    models.forEach(model => {
        model.watch([], options).on("change", async (change) => {
            console.log("[change detected in Sensor Model]", change);
            const sensorData = await getSensorData(changedtime);
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
        const top7Data = combinedData.slice(0, 8);

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

    const getASideData = async (startDate, endDate, userId) => {
        console.log(`Fetching A-Side data for user ${userId} between ${startDate} and ${endDate}`);
        // console.log("userId", userId);
        const allData = { timestamps: [], data: {} }; // Initialize data structure

        for (let i = 1; i <= 6; i++) {
            const modelName = `SensorModel${i}`;
            const query = {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure dates are parsed correctly
                id: userId, // Filter by userId
            };

            // console.log(`Querying ${modelName} with query:`, query);

            try {
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
                            ...Object.keys(modelMap[modelName].schema.paths).reduce((acc, key) => {
                                if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v' && key !== 'busbar' && key !== 'id') {
                                    acc[key] = { $first: `$${key}` }; // Get the first value for each field
                                }
                                return acc;
                            }, {}),
                        },
                    },
                    { $sort: { createdAt: -1 } }, // Sort by the timestamp again if needed
                ]);

                // console.log(`Received data from ${modelName}:`, data);

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
            } catch (error) {
                // console.error(`Error fetching data from ${modelName}:`, error);
            }
        }

        // console.log(`Final A-Side data for user ${userId}:`, allData);
        return allData;
    };

    const getBSideData = async (startDate, endDate, userId) => {
        // console.log(`Fetching B-Side data for user ${userId} between ${startDate} and ${endDate}`);
        const allData = { timestamps: [], data: {} }; // Initialize data structure

        for (let i = 7; i <= 10; i++) {
            const modelName = `SensorModel${i}`;
            const query = {
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Ensure dates are parsed correctly
                id: userId, // Filter by userId
            };

            // console.log(`Querying ${modelName} with query:`, query);

            // Check if the model exists in modelMap2
            if (!modelMap2[modelName]) {
                // console.warn(`${modelName} not found in modelMap2, skipping...`);
                continue; // Skip this iteration if the model is not found
            }

            try {
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

                // console.log(`Received data from ${modelName}:`, data);

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
            } catch (error) {
                // console.error(`Error fetching data from ${modelName}:`, error);
            }
        }

        // console.log(`Final B-Side data for user ${userId}:`, allData);
        return allData;
    };

    // WebSocket connection handler
    io.on('connection', async (socket) => {
        // console.log('Client connected:', socket.id);

        // Extract userId from the socket handshake
        const { userId } = socket.handshake.auth;
        // console.log(userId);

        // Listen for client requests with parameters
        socket.on('requestData', async (params) => {
            const { value, startDate, endDate, side } = params; // Extract parameters
            // console.log(`Request received for ${side} data with params:`, params);

            try {
                if (side === 'ASide') {
                    const AsideData = await getASideData(new Date(startDate), new Date(endDate), userId);
                    // console.log(`Sending A-Side data to client:`, AsideData);
                    socket.emit('ASide', AsideData); // Emit to the specific client
                } else if (side === 'BSide') {
                    const BSideData = await getBSideData(new Date(startDate), new Date(endDate), userId);
                    // console.log(`Sending B-Side data to client:`, BSideData);
                    socket.emit('BSide', BSideData); // Emit to the specific client
                }
            } catch (error) {
                // console.error('Error sending data:', error);
            }
        });

        socket.on('disconnect', () => {
            // console.log('Client disconnected:', socket.id);
        });
    });

    // Watch for changes in SensorModels (ASide)
    for (let i = 1; i <= 6; i++) {
        const modelName = `SensorModel${i}`;
        modelMap[modelName].watch([], options).on('change', async (change) => {
            // console.log(`Change detected in ${modelName}:`, change);
            const userId = change.fullDocument?.id; // Extract userId from the changed document

            if (userId) {
                // console.log(`Fetching updated A-Side data for user ${userId}`);
                const AData = await getASideData(new Date(0), new Date(), userId); // Fetch all data from the beginning of time to now
                // console.log(`Emitting updated A-Side data to all clients:`, AData);
                io.emit('ASide', AData);
            }
        });
    }

    // Watch for changes in SensorModels (BSide)
    for (let i = 7; i <= 10; i++) {
        const modelName = `SensorModel${i}`;
        modelMap2[modelName].watch([], options).on('change', async (change) => {
            // console.log(`Change detected in ${modelName}:`, change);
            const userId = change.fullDocument?.id; // Extract userId from the changed document

            if (userId) {
                // console.log(`Fetching updated B-Side data for user ${userId}`);
                const BData = await getBSideData(new Date(0), new Date(), userId); // Fetch all data from the beginning of time to now
                // console.log(`Emitting updated B-Side data to all clients:`, BData);
                io.emit('BSide', BData);
            }
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

            // Extract the sensor values from the fetched data
            const sensorValues = data.map(entry => entry[sensorId]).filter(value => value !== undefined);

            if (sensorValues.length === 0) {
                console.warn(`No data found for sensor ID: ${sensorId}`);
                return null;
            }

            // Calculate min, max, and average values
            const minValue = Math.min(...sensorValues);
            const maxValue = Math.max(...sensorValues);
            const averageValue = sensorValues.reduce((sum, value) => sum + value, 0) / sensorValues.length;

            return {
                data,
                minValue,
                maxValue,
                averageValue
            };
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
                const result = await getCollectorBarData(sensorId, time); // Use sensor ID and time
                if (result) {
                    socket.emit('collectorBarData', {
                        data: result.data,
                        minValue: result.minValue,
                        maxValue: result.maxValue,
                        averageValue: result.averageValue
                    });
                } else {
                    socket.emit('error', { message: "No data found for the given sensor ID and time range" });
                }
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
                    const result = await getCollectorBarData(models[modelKey][0], "10m"); // Use the first sensor ID in the model
                    if (result) {
                        io.emit('collectorBarData', {
                            data: result.data,
                            minValue: result.minValue,
                            maxValue: result.maxValue,
                            averageValue: result.averageValue
                        });
                    }
                });
            }
        });
    });
};

export const latesttimetamp = (io) => {
    const models = [
        SensorModel1, SensorModel2, SensorModel3, SensorModel4, SensorModel5,
        SensorModel6, SensorModel7, SensorModel8, SensorModel9, SensorModel10
    ];

    // Helper function to convert UTC time to IST
    const convertToIST = (date) => {
        const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
        return new Date(date.getTime() + istOffset);
    };

    // Helper function to format the date
    const formatDate = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Convert to 12-hour format and determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two digits for minutes

        // Format the date string
        return `${formattedHours}:${formattedMinutes} ${ampm} ${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
    };

    // Function to fetch the latest timestamp across all models
    const getLatestTimestamp = async () => {
        try {
            // Fetch the latest document from each model in parallel
            const latestDocuments = await Promise.all(
                models.map(model =>
                    model.findOne().sort({ createdAt: -1 }).select({ createdAt: 1 }).lean()
                )
            );

            // Extract timestamps and find the latest one
            const timestamps = latestDocuments
                .filter(doc => doc && doc.createdAt)
                .map(doc => doc.createdAt);

            if (timestamps.length === 0) {
                return null; // No timestamps found
            }

            // Find the latest timestamp
            const latestTimestampUTC = new Date(Math.max(...timestamps));

            // Convert to IST and format
            const latestTimestampIST = convertToIST(latestTimestampUTC);
            return formatDate(latestTimestampIST);
        } catch (error) {
            console.error("Error fetching latest timestamp:", error);
            throw error;
        }
    };

    // Emit the latest timestamp on client connection
    io.on('connection', async (socket) => {
        console.log("Client connected, fetching latest timestamp");
        try {
            const latestTimestamp = await getLatestTimestamp();
            console.log("Latest timestamp:", latestTimestamp);
            io.emit("LatestTimestamp", latestTimestamp); // Emit the latest timestamp immediately upon connection
        } catch (error) {
            console.error("Error fetching latest timestamp:", error);
        }
    });

    // Watch for changes in any model to update the latest timestamp
    models.forEach(model => {
        model.watch([], { fullDocument: "updateLookup" }).on('change', async (change) => {
            console.log(`[Change detected in ${model.modelName}]`, change);
            try {
                const latestTimestamp = await getLatestTimestamp();
                io.emit("LatestTimestamp", latestTimestamp); // Emit the updated latest timestamp
            } catch (error) {
                console.error("Error fetching latest timestamp on change:", error);
            }
        });
    });
};

export const notificationData = (io) => {
    const options = { fullDocument: "updateLookup" };


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

    const modelFieldMap = {
        SensorModel1: models.model1,
        SensorModel2: models.model2,
        SensorModel3: models.model3,
        SensorModel4: models.model4,
        SensorModel5: models.model5,
        SensorModel6: models.model6,
        SensorModel7: models.model7,
        SensorModel8: models.model8,
        SensorModel9: models.model9,
        SensorModel10: models.model10
    };

    const getFilteredData = async () => {
        const results = [];
        const uniqueIds = new Set();

        // Collect all unique IDs in parallel
        const idPromises = Object.values(modelMap).map(async (model) => {
            try {
                const docs = await model.find().select('id -_id').lean();
                docs.forEach(doc => doc.id && uniqueIds.add(doc.id));
            } catch (err) {
                console.error("ID collection error:", err);
            }
        });

        await Promise.all(idPromises);

        // Process each ID in parallel
        const processIdPromises = Array.from(uniqueIds).map(async (id) => {
            const modelPromises = Object.entries(modelMap).map(async ([modelName, model]) => {
                try {
                    const sensorFields = modelFieldMap[modelName];
                    if (!sensorFields?.length) return;

                    const doc = await model.findOne({ id })
                        .sort({ createdAt: -1 })
                        .select([...sensorFields, 'createdAt'])
                        .lean();

                    if (!doc) return;

                    sensorFields.forEach(field => {
                        const value = parseFloat(doc[field]);
                        if (isNaN(value)) return;

                        let message;
                        if (value >= 700) {
                            message = "Critical: Something went wrong";
                        } else if (value >= 450) {
                            message = "Attention Required";
                        } else if (value >= 300) {
                            toast.info('Be at the area 10 minutes before the event time')
                        } else {
                            return; // Skip values < 300
                        }

                        results.push({
                            id,
                            model: modelName,
                            sensor: field,
                            value,
                            message,
                            timestamp: doc.createdAt
                        });
                    });

                } catch (err) {
                    console.error(`Error processing ${modelName} ID ${id}:`, err);
                }
            });

            await Promise.all(modelPromises);
        });

        await Promise.all(processIdPromises);

        return results;
    };

    // Socket handlers remain the same but now send categorized data
    io.on("connection", async (socket) => {
        try {
            const data = await getFilteredData();
            socket.emit("TempData", { status: "success", data });
        } catch (err) {
            socket.emit("TempData", { status: "error", error: err.message });
        }
    });

    Object.entries(modelMap).forEach(([modelName, model]) => {
        const changeStream = model.watch([], options);
        changeStream.on("change", async () => {
            try {
                const data = await getFilteredData();
                io.emit("TempDataUpdate", { status: "success", data });
            } catch (err) {
                io.emit("TempDataUpdate", { status: "error", error: err.message });
            }
        });
    });
};