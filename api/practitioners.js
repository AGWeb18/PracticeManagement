import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const practitioners = await db.collection('practitioners').find({}).toArray();
        res.status(200).json(practitioners);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching practitioners' });
      }
      break;
    case 'POST':
      try {
        const newPractitioner = req.body;
        const result = await db.collection('practitioners').insertOne(newPractitioner);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the practitioner' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...practitionerData } = req.body;
        const result = await db.collection('practitioners').updateOne({ id }, { $set: practitionerData });
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the practitioner' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('practitioners').deleteOne({ id });
        res.status(200).json({ success: result.deletedCount > 0 });
        break;
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while removing the practitioner' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
