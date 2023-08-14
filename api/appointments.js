import { connectToDatabase } from '../../utils/db'; // Update this with your DB connection utility

export default async function handler(req, res) {
  const { method } = req;

  const { db } = await connectToDatabase(); // Connect to your database

  switch (method) {
    case 'GET':
      try {
        const appointments = await db.collection('appointments').find({}).toArray(); // Retrieve all appointments
        res.status(200).json(appointments);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching appointments' });
      }
      break;

    case 'POST':
      try {
        const newAppointment = req.body;
        const result = await db.collection('appointments').insertOne(newAppointment); // Schedule a new appointment
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while scheduling the appointment' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...appointmentData } = req.body;
        const result = await db.collection('appointments').updateOne({ id }, { $set: appointmentData }); // Update an appointment
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the appointment' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('appointments').deleteOne({ id }); // Cancel an appointment
        res.status(200).json({ success: result.deletedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while canceling the appointment' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
