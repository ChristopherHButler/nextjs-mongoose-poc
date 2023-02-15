import mongoose, { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// this avoids errors because in next this file is run angain and again
// check if the model already exists, if not create one.
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
