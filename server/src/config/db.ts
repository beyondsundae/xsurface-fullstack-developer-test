import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const connectedDb = await mongoose.connect(process.env.DATABASE_URL as string);

    if(connectedDb) console.log("✅ MongoDB Connected Successfully");
  } catch (err: any) {
    console.error("❌ Database connection failed:", err?.message ?? err);
    process.exit(1);
  }
};
