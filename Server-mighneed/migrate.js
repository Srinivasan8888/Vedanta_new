import mongoose from 'mongoose';
import setAlert from './API/Models/SetAlertModel.js';

async function migrate() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vedanta');
        console.log('Connected to MongoDB');

        // Update all documents to ensure phoneNo is a string
        const result = await setAlert.updateMany(
            {},
            [
                {
                    $set: {
                        phoneNo: {
                            $cond: {
                                if: { $eq: [{ $type: "$phoneNo" }, "number"] },
                                then: { $toString: "$phoneNo" },
                                else: "$phoneNo"
                            }
                        }
                    }
                }
            ]
        );

        console.log('Migration completed:', result);

        // Drop all indexes
        await setAlert.collection.dropIndexes();
        console.log('Dropped all indexes');

        // Create new indexes
        await setAlert.collection.createIndex({ employeeNo: 1 }, { unique: true });
        await setAlert.collection.createIndex({ phoneNo: 1 }, { unique: false });
        console.log('Created new indexes');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

migrate(); 