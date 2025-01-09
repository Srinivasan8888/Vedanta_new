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

export const watchsocketsidesdata = (io) => {

    const options = { fullDocument: "updateLookup" };
    io.on('connection', async (socket) => {
        console.log("Client connected, sending initial data");
        
        try {
            for (let i = 1; i <= 6; i++) {
                await emitLatestSensorData(io, "ASide", `SensorModel${i}`);
            }
            for (let i = 7; i <= 10; i++) {
                await emitLatestSensorData(io, "BSide", `SensorModel${i}`);
            }
        } catch (error) {
            console.error("Error sending initial data:", error);
        }
    });

    SensorModel1.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel1]", change);
        emitLatestSensorData(io, "ASide", "SensorModel1");
    });

    SensorModel2.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel2]", change);
        emitLatestSensorData(io, "ASide", "SensorModel2");
    });

    SensorModel3.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel3]", change);
        emitLatestSensorData(io, "ASide", "SensorModel3");
    });

    SensorModel4.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel4]", change);
        emitLatestSensorData(io, "ASide", "SensorModel4");
    });

    SensorModel5.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel5]", change);
        emitLatestSensorData(io, "ASide", "SensorModel5");
    });

    SensorModel6.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel6]", change);
        emitLatestSensorData(io, "ASide", "SensorModel6");
    });

    SensorModel7.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel7]", change);
        emitLatestSensorData(io, "BSide", "SensorModel7");
    });

    SensorModel8.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel8]", change);
        emitLatestSensorData(io, "BSide", "SensorModel8");
    });

    SensorModel9.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel9]", change);
        emitLatestSensorData(io, "BSide", "SensorModel9");
    });

    SensorModel10.watch([], options).on("change", (change) => {
        console.log("[change detected in SensorModel10]", change);
        emitLatestSensorData(io, "BSide", "SensorModel10");
    });
};


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
const emitLatestSensorData = async (io, endpoint, modelName) => {
    try {
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

      const model = modelMap[modelName];
      const latestCollection = await model.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 1 },
        // { $project: {
        //     _id: 0,
        //     id: 0,
        //     TIME: 0,
        //     createdAt: 0,
        //     updatedAt: 0,
        //     __v: 0
        // }}
      ]);

      console.log(`Emitting latest sensor data to ${endpoint}:`, latestCollection);
      io.emit(endpoint, latestCollection);
    } catch (e) {
      console.error(
        `Error emitting latest sensor data to ${endpoint}:`,
        e
      );
    }
  };
