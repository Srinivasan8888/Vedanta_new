import Report from '../Models/ReportModel.js';
import Frequency from '../Models/Alertfrequency.js'

export const createReport = async (req, res) => {
    const { name, email, employeeNo } = req.body;
    if (!name || !email || !employeeNo) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const report = await Report.create({ name, email, employeeNo });
        res.status(201).json({
            message: "Sensor data created successfully.",
            data: report,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createAlert = async (req, res) => {
    const { name, email, phoneno, employeeNo } = req.body;
    if (!name || !email || !employeeNo) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const report = await Report.create({ name, email, employeeNo });
        res.status(201).json({
            message: "Sensor data created successfully.",
            data: report,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const alertFrequency = async (req, res) => {
//     const { email, frequency, id } = req.body;


//     if (!email || !frequency || !id) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {

//         const updatedFrequency = await Frequency.findOneAndUpdate(
//             { email },
//             { frequency, id },
//             { upsert: true, new: true }
//         );


//         res.status(201).json({
//             message: "Frequency data created/updated successfully",
//             data: updatedFrequency,
//         });
//     } catch (error) {

//         console.error("Error updating frequency:", error);
//         res.status(500).json({ message: error.message });
//     }
// };


//get Request

export const alertFrequency = async (req, res) => {
    const { email, frequency, id } = req.body;
  
    if (!email || !frequency || !id) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const newEntry = await Frequency.create({ email, frequency, id });
  
      res.status(201).json({
        message: "Frequency data saved successfully",
        data: newEntry,
      });
    } catch (error) {
      console.error("Error saving frequency data:", error);
      res.status(500).json({ message: error.message });
    }
  };

export const reportUsers = async (req, res) => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });

        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: "No user reports found" });
        }

        res.status(200).json({
            message: "User reports fetched successfully",
            data: reports,
        });
    } catch (error) {

        console.error("Error fetching user reports:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getFrequency = async (req, res) => {
    try {
        const frequencyData = await Frequency.find().sort({createdAt: -1});
        if (!frequencyData) {
            return res.status(404).json({ message: "No frequency data found for this email" });
        }

        res.status(200).json({
            message: "Frequency data retrieved successfully",
            data: frequencyData,
        });
    } catch (error) {
        console.error("Error fetching frequency data:", error);
        res.status(500).json({ message: error.message });
    }
};