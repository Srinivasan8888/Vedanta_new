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
        "CBT6A2", "CBT6A1", "CBT7A2", "CBT7A1", "CBT8A2", "CBT8A1", "CBT9A2", "CBT9A1", "CBT10A2", "CBT10A1",
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

                // Loop through each parameter in nameMapping
                for (let j = 0; j < nameMapping.length; j++) {
                    const parameter = nameMapping[j];

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

                    if (data[0]) {
                        maxMinValues.push({
                            sensor: parameter,
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