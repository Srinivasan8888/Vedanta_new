import Report from '../Models/ReportModel.js';
import Frequency from '../Models/Alertfrequency.js'
import User from '../Models/User.model.js';
import setAlert from '../Models/SetAlertModel.js'
import SetAlertfrequency from '../Models/SetAlertfrequency.js';
import UserAlertModel from '../Models/UserAlertModel.js';

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

export const SaveAlertRange = async (req, res)=> {
    const {info, warning, critical, email } = req.body;
    if(!info || !warning || !critical || !email ) {
        return res.status(400).json({ message: 'All the fields are required'});
    }
    try {
        const savealert = await UserAlertModel.create({info, warning, critical, email });
        res.status(201).json({
            message: 'Alerts Limit have been saved successfully.',
            data: savealert,
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message});
        
    }
}

export const createAlert = async (req, res) => {
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


export const createSetAlert = async (req, res) => {
    const { name, email, phoneno, employeeNo } = req.body;
    if (!name || !email || !employeeNo || !phoneno) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const datas = await setAlert.create({ name, email, employeeNo, phoneno });
        res.status(201).json({
            message: "Sensor data created successfully.",
            data: datas,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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

export const SetAlertFrequency = async (req, res) => {
    const { email, mode, frequency } = req.body;

    if (!email || !frequency || !mode) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newEntry = await SetAlertfrequency.create({ email, frequency, mode });

        res.status(201).json({
            message: "AlertSetFrequency data saved successfully",
            data: newEntry,
        });
    } catch (error) {
        console.error("Error saving AlertSetFrequency data:", error);
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

export const AlertfreqUsers = async (req, res) => {
    try {
        const reports = await setAlert.find().sort({ createdAt: -1 });

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
        const frequencyData = await Frequency.find().sort({ createdAt: -1 });
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

export const getAlertFrequency = async (req, res) => {
    try {

        const Entry = await SetAlertfrequency.find().sort({ createdAt: -1 });
        if (!Entry) {
            return res.status(400).json({ message: 'No data found' });
        }
        res.status(200).json({
            message: "AlertSetFrequency data retrieved successfully",
            data: Entry,
        });

    } catch (error) {
        console.error("Error saving AlertSetFrequency data:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const usersDate = await User.find({}, { password: 0 });
        if (!usersDate) {
            return res.status(404).json({ message: "No frequency data found for this email" });
        }

        res.status(200).json({
            message: "Frequency data retrieved successfully",
            data: usersDate,
        });
    } catch (error) {
        console.error("Error fetching frequency data:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getUserAlertRange = async (req, res)=> {

    try {
        const savealert = await UserAlertModel.find().sort({updated : -1})
        res.status(201).json({
            message: 'Alerts Limit have fetched successfully.',
            data: savealert,
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message});
        
    }
}
