import mongoose from "mongoose";

const Score = mongoose.Schema(
    {
        pseudo: String,
        score: Number,
        category: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Score || mongoose.model("Score", Score);