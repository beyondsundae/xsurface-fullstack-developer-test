import { model, type Model } from 'mongoose';
import { productSchema, type Product } from './products.schema.js';

const ProductModel: Model<Product> = model<Product>('Product', productSchema);

export default ProductModel;
