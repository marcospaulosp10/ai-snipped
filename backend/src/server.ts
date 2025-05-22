import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('mongo connection error:', err);
  });