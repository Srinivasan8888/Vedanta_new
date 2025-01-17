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

const getAvgTemp = async (changedtime) => {
    try {
        const data = await model.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Date.now() - changedtime * 60 * 1000)
                    }
                }
            },
            {
                $project: {
                    Avgtemp: 1,
                    TIME: 1,
                    _id: 0
                }
            }
        ]);

        console.log("Filtered Data:", data);

        if (data.length === 0) {
            console.warn("No data found for the specified time range.");
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
        const avgTempData = await getAvgTemp();
        console.log("Emitting Avgtempdata:", avgTempData);
        io.emit("Avgtempdata", avgTempData);
    } catch (error) {
        console.error("Error sending initial average temperature data:", error);
    }

    socket.on("ButtonClick", async (buttonId) => {
        console.log("Button clicked with ID:", buttonId);
        const avgTempData = await getAvgTemp();
        console.log("Emitting Avgtempdata on button click:", avgTempData);
        io.emit("Avgtempdata", avgTempData);
    });
});

model.watch([], options).on("change", async (change) => {
    console.log("[change detected in Average Temp]", change);
    const avgTempData = await getAvgTemp();
    console.log("Emitting Avgtempdata on change:", avgTempData);
    io.emit("Avgtempdata", avgTempData);
});
