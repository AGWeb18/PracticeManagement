import { connectToDatabase } from '../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const invoices = await db.collection('invoices').find({}).toArray();
        res.status(200).json(invoices);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching invoices' });
      }
      break;
    case 'POST':
      try {
        const newInvoice = req.body;
        const result = await db.collection('invoices').insertOne(newInvoice);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the invoice' });
      }
      break;
    case 'PUT':
      try {
        const { id, ...invoiceData } = req.body;
        const result = await db.collection('invoices').updateOne({ id }, { $set: invoiceData });
        res.status(200).json({ success: result.modifiedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the invoice' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        const result = await db.collection('invoices').deleteOne({ id });
        res.status(200).json({ success: result.deletedCount > 0 });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the invoice' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
