import { connectToDatabase } from '@/lib/mongodb';
import Volcano from '@/models/volcano';

export async function GET(request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all documents in the Volcanos collection
    const volcanos = await Volcano.find({}); // Fetch everything

    // Debug log the fetched data
    console.log('Fetched volcanos:', volcanos);

    return new Response(JSON.stringify(volcanos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching volcanos:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch volcanos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}