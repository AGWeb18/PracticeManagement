import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const treatmentPlans = await db.collection('treatment-plans').find({}).toArray();
        res.status(200).json(treatmentPlans);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching treatment plans' });
      }
      break;
    case 'POST':
      try {
        const newPlan = req.body;
        const result = await db.collection('treatment-plans').insertOne(newPlan);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the treatment plan' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...planData } = req.body;
        const result = await db.collection('treatment-plans').updateOne({ id }, { $set: planData });
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the treatment plan' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('treatment-plans').deleteOne({ id });
        res.status(200).json({ success: result.deletedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the treatment plan' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
