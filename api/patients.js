import { connectToDatabase } from '../../utils/db'; // Update this with your DB connection utility

export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase(); // Connect to your database

  switch (method) {
    case 'GET':
      try {
        const patients = await db.collection('patients').find({}).toArray(); // Retrieve all patients
        res.status(200).json(patients);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching patients' });
      }
      break;

    case 'POST':
      try {
        const newPatient = req.body;
        const result = await db.collection('patients').insertOne(newPatient); // Insert a new patient
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the patient' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...patientData } = req.body;
        const result = await db.collection('patients').updateOne({ id }, { $set: patientData }); // Update an existing patient
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the patient' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('patients').deleteOne({ id }); // Delete a patient
        res.status(200).json({ success: result.deletedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the patient' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
