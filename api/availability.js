import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const availability = await db.collection('availability').find({}).toArray();
        res.status(200).json(availability);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching availability schedules' });
      }
      break;
    case 'POST':
      try {
        const newSchedule = req.body;
        const result = await db.collection('availability').insertOne(newSchedule);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the availability schedule' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...scheduleData } = req.body;
        const result = await db.collection('availability').updateOne({ id }, { $set: scheduleData });
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the availability schedule' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('availability').deleteOne({ id });
        res.status(200).json({ success: result.deletedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the availability schedule' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
