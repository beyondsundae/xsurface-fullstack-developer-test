import mongoose, { Schema } from 'mongoose';

// Subdocument schema for dimensions
export const productDimensionSchema = new Schema(
  {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    length: { type: Number, required: true },
  },
  { _id: false }
);

// Main product schema
export const productSchema = new Schema(
  {
    isActive: { type: Boolean, default: true },
    images: [{ type: String, }],
    productName: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    // Arrays of ObjectId references (adjust ref names to your collections)
    categories: [{ type: String, ref: 'Categories' }],
    attributes: [{ type: String, ref: 'Attributes' }],
    unit: { type: String },
    description: { type: String },
    // Use array of dimension subdocs (fixing original "dimention" typo)
    dimension: productDimensionSchema, //[productDimensionSchema]
    weight: { type: Number, min: 0 },


    createdAt: {type: Date},
    updatedAt: {type: Date, default: Date.now},
    createdBy: { type: String, ref: 'Users' },
    updatedBy: { type: String, ref: 'Users' },
  },
  { timestamps: true }
)

// Export a TypeScript type derived from the schema
export type Product = mongoose.InferSchemaType<typeof productSchema>;
