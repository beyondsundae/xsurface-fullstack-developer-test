interface props {
  productCode: string
}

export default function EditProduct({ productCode }: props) {
  return <div>{productCode} - EditProduct</div>;
}
