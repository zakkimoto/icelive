import mongoose from 'mongoose';

// Define the schema
const VolcanoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    earthquakes: {
      firstUrl: String,
      secondUrl: String,
    },
    images: [
      {
        placeholderSrc: String,
        imageSrc: String,
        titleText: String,
      },
    ],
  },
  {
    collection: 'Volcanos', // Explicitly match the collection name in your database
  }
);

// Export the model
export default mongoose.models.Volcano || mongoose.model('Volcano', VolcanoSchema);
