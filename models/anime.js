import mongoose from "mongoose";
import User from "./user.js";
const { Schema } = mongoose;
const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: { type: Number },
  image: { type: String },
  description: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});
const Anime = mongoose.model("animes", animeSchema);
export default Anime;
