import mongoose from "mongoose";

const UserNoteSchema = new mongoose.Schema({
  username: { type: String, required: true },
  note: { type: String, required: true },
});

export const UserNote = mongoose.models.UserNote || mongoose.model("UserNote", UserNoteSchema);
