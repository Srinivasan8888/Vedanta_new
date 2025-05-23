import Report from '../Models/ReportModel.js';
import AlertFrequency from '../Models/Alertfrequency.js';
import axios from 'axios';
import nodemailer from 'nodemailer';
import XLSX from 'xlsx';
import moment from 'moment';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to calculate date range based on frequency
const calculateDateRange = (frequency, lastSentDate) => {
  const now = new Date();
  let startDate;

  switch (frequency.toLowerCase()) {
    case 'daily':
      startDate = moment(lastSentDate).add(1, 'days').toDate();
      break;
    case 'weekly':
      startDate = moment(lastSentDate).add(7, 'days').toDate();
      break;
    case 'monthly':
      startDate = moment(lastSentDate).add(1, 'months').toDate();
      break;
    default:
      startDate = moment(lastSentDate).toDate();
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0]
  };
};

// Helper function to convert JSON to Excel
const convertToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  
  // Create a buffer
  const buffer = XLSX.write(workbook, { 
    type: 'buffer',
    bookType: 'xlsx'
  });

  return buffer;
};

// Helper function to send email with attachment
const sendEmail = async (email, filename, buffer) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Weekly Report',
      text: 'Please find your attached report.',
      attachments: [
        {
          filename,
          content: buffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Main controller to handle report generation and sending
export const generateAndSendReports = async (req, res) => {
  try {
    // Get all users who have report frequency set
    const frequencies = await AlertFrequency.find();
    
    for (const frequency of frequencies) {
      // Get user details
      const user = await Report.findOne({ email: frequency.email });
      if (!user) continue;

      // Calculate date range
      const dateRange = calculateDateRange(frequency.frequency, frequency.updatedAt);

      // Fetch data from API
      const response = await axios.get('http://34.100.168.176:4000/api/v2/getDateExcel', {
        params: {
          key: 'All-Data',
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        },
        headers: {
          'x-user-id': frequency.id
        }
      });

      if (response.data) {
        // Convert to Excel
        const filename = `report_${user.name}_${moment().format('YYYY-MM-DD')}.xlsx`;
        const excelBuffer = convertToExcel(response.data, filename);

        // Send email
        const emailSent = await sendEmail(user.email, filename, excelBuffer);
        
        if (emailSent) {
          // Update last sent date
          await AlertFrequency.findByIdAndUpdate(frequency._id, {
            updatedAt: new Date()
          });
        }
      }
    }

    res.status(200).json({ message: 'Reports generated and sent successfully' });
  } catch (error) {
    console.error('Error generating reports:', error);
    res.status(500).json({ error: 'Failed to generate and send reports' });
  }
};

// Controller to update user's report frequency
export const updateReportFrequency = async (req, res) => {
  try {
    const { email, frequency } = req.body;
    
    // Get user details
    const user = await Report.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update or create frequency setting
    let frequencySetting = await AlertFrequency.findOne({ email });
    if (frequencySetting) {
      frequencySetting.frequency = frequency;
      frequencySetting.updatedAt = new Date();
      await frequencySetting.save();
    } else {
      frequencySetting = new AlertFrequency({
        email,
        frequency,
        id: user.employeeNo,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await frequencySetting.save();
    }

    res.status(200).json({ message: 'Frequency updated successfully' });
  } catch (error) {
    console.error('Error updating frequency:', error);
    res.status(500).json({ error: 'Failed to update frequency' });
  }
};
