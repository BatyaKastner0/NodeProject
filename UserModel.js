
  import mongoose from "mongoose";
  const { Schema } = mongoose;
  const userSchema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      links: [{ type: Schema.Types.ObjectId, ref: 'Link1' }]
    });

    export default mongoose.model("users-table", userSchema);

