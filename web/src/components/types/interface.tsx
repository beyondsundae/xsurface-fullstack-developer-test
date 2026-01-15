

export interface IProduct {
    no?: string;
    productName: string;
    code: string;
    catagory: string;
    isExclusiveDeal: boolean;
    discountPercentage: number;
    img?: string;
    images?: string[]
    price: number;
    priceAfterDiscount: number;
    unit: string;
    viewed: number;
    dimension: Dimension;
    avaibleStock: number;
  }
  export interface Dimension {
    width: number;
    height: number;
    depth: number;
    unit: string;
  }
  