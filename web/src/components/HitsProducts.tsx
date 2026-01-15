import { theme } from "../utils/theme";
import CardCarousel from "./CardCarousel";
import { IProduct } from "./types/interface";

const dataTotal = 20;

export default function HitsProducts() {
  const mockLatestViewedProducts: IProduct[] = Array(dataTotal)
    .fill({
      productName: "FUVAL (Silver)...",
      code: "CODE12345678",
      catagory: "กระจก",
      isExclusiveDeal: true,
      discountPercentage: 0.5,
      img: "./assets/pictures/mock-pick-2.jpg",
      price: 990,
      priceAfterDiscount: 550,
      unit: "ตร.ม.",
      viewed: 1000,
      dimension: {
        width: 60,
        height: 100,
        depth: 4.5,
        unit: "cm.",
      },
      avaibleStock: 10,
    })
    ?.map((each, index) => ({ no: index, ...each }));

  return (
    <CardCarousel
      data={mockLatestViewedProducts}
      title={"สินค้ายอดนิยม / แนะนำ"}
      linkColor={theme.color.XClusiveDeal}
      backgroundColor={theme.color.hitsListBackground}
    />
  );
}
