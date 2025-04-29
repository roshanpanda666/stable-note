import mongoose from "mongoose";

const UserNoteSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
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
      comments: [
        {
          type: String,
          required: true,
        }
      ],
    }, 
    { timestamps: true });

export const UserNote = mongoose.models.UserNote || mongoose.model("UserNote", UserNoteSchema);
