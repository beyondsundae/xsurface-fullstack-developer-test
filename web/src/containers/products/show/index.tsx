import StyledListCard from "@/src/components/StyledListCard";
import { IProduct } from "@/src/components/types/interface";
import { StyledSecondaryText } from "@/src/utils/components";
import { theme } from "@/src/utils/theme";
import { formatPrice, getScreenSize } from "@/src/utils/utils";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Image,
  message,
  Row,
  Tag,
} from "antd";
import { CarouselRef } from "antd/es/carousel";
import { Footer } from "antd/es/layout/layout";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";

interface props {
  productCode: string;
}

export default function ProductShow({ productCode }: props) {
  /* ---------------------------------- utils --------------------------------- */
  /* ---------------------------------- state --------------------------------- */
  const [product, setProduct] = useState<IProduct | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ----------------------------------- ref ---------------------------------- */
  const carouselRef = useRef<React.Ref<CarouselRef>>(null);

  /* -------------------------------- variables ------------------------------- */
  const screenSize = getScreenSize();

  const isMobile = ["xs", "sm"].includes(screenSize);

  /* -------------------------------- functions ------------------------------- */

  // concept FIFO
  // push to localstorage
  // store prodcutName, code, price, (unit)
  // check duplicated
  // - take old duplicated out
  // - push to last
  const limitedLatestViewedSize = 10;
  const getXSFLatestLocalStorage = () => {
    const latestViews = localStorage.getItem("xsf-test-latest-viewed") || "[]";

    if (latestViews) {
      const result = JSON?.parse(latestViews);

      return result;
    }
  };

  const setXSFLocalStorage = (
    currentProduct: Record<string, unknown>,
    currentLatestViewedStorage: Record<string, unknown>[]
  ) => {

    // find duplicated index
    const foundProductIndex = currentLatestViewedStorage?.findIndex(
      (each) => each?.code === currentProduct?.code
    );

    // splice out
    if (foundProductIndex !== -1) {
      currentLatestViewedStorage.splice(foundProductIndex, 1);
    }

    // limit the array
    let modifiedProductsViewed = [
      currentProduct,
      ...currentLatestViewedStorage,
    ];

    if (modifiedProductsViewed?.length >= limitedLatestViewedSize) {
      modifiedProductsViewed = modifiedProductsViewed?.slice(
        0,
        limitedLatestViewedSize
      ); // start index, length of keeping
    }

    localStorage.setItem(
      "xsf-test-latest-viewed",
      JSON.stringify(modifiedProductsViewed)
    );
  };

  const updateLatestViewed = (product: IProduct) => {
    const { productName, code, price, images } = product || {};
    const currentProduct = {
      productName,
      code,
      price,
      img: images?.[0] || "",
    };

    const currentLatestViewedStorage = getXSFLatestLocalStorage();

    setXSFLocalStorage(currentProduct, currentLatestViewedStorage);
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productCode}/show`
      )
      .then(({ data: product }) => {
        setProduct({
          ...product,
          discountPercentage: 0.5,
          priceAfterDiscount: 600,
          avaibleStock: Math.floor(Math.random()),
        });

        updateLatestViewed(product);
      })
      .catch((err) => {
        const errMessage = err?.response?.data?.message;

        message.error(` ${err}, ${errMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /* -------------------------------- useEffect ------------------------------- */
  useEffect(() => {
    fetchProduct();
  }, [productCode]);

  const footerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    color: "#fff",
    backgroundColor: "#E5E7EB",
    zIndex: 1000,
  };

  const RenderProductName = useMemo(
    () => (
      <>
        <Row>
          <span className="text-4xl font-semibold my-3">
            {product?.productName}
          </span>
        </Row>
        
      </>
    ),
    [product]
  );

  return (
    <>
      <Row className="w-screen h-full  justify-center mt-6" >
        {/* <Row className="w-9/10"></Row> */}
        {isMobile && RenderProductName}
        <Col span={isMobile ? 24 : 12} >
          <div className="product-show-carousel px-6">
            <Carousel
              ref={carouselRef as React.Ref<CarouselRef>}
              arrows
              autoplay
            >
              {(product?.images?.length ? product?.images : [null])?.map(
                (each, index) => {
                  return (
                    <div key={index} className="text-center">
                      <Image
                        width={"100%"}
                        height={isMobile ? 320 : 640}
                        style={{
                          objectFit: "cover",
                          border: `1px solid ${theme.color.generalRed}`,
                          borderRadius: 16,
                        }}
                        alt="basic"
                        src={each ?? "/assets/pictures/default-product-pic.png"}
                        className="anim-fade-in"
                      />
                    </div>
                  );
                }
              )}
            </Carousel>
          </div>
          <Row justify={"start"}>
            {(product?.images?.length ? product?.images : [null])?.map(
              (each, index) => {
                return (
                  <Col
                    className="mx-1"
                    style={{ cursor: "pointer" }}
                    key={index}
                  >
                    <img
                      alt="example"
                      src={each ?? "/assets/pictures/default-product-pic.png"}
                      style={{
                        border: `1px solid ${theme.color.generalRed}`,

                        height: 72,
                        width: 72,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        (carouselRef?.current as unknown as CarouselRef)?.goTo(
                          index,
                          false
                        );
                      }}
                    />
                  </Col>
                );
              }
            )}
          </Row>
        </Col>
        <Col span={isMobile ? 24 : 11} >
          {!isMobile && RenderProductName}
          <Row>
          <Col span={12}>
            <span className="text-2xl font-semibold my-1">
              {formatPrice(product?.priceAfterDiscount)}{" "}
            </span>
            <span
              className="text-lg  m-1"
              style={{ color: theme.color.secondary }}
            >
              <s>{formatPrice(product?.price) || "-"}</s>
            </span>
          </Col>
          <Col className="text-end" span={11}>
            <span className="text-lg text-right  mx-2">
              4.8/5
              <StarFilled className="text-4xl" style={{ color: "#FFEA00" }} />
            </span>
          </Col>
        </Row>
          <Row>
            <span
              className="text-lg text-right  m-2"
              style={{ color: theme.color.secondary }}
            >
              Sold 999 pieces
            </span>
          </Row>
          <Row className="my-4">
            <Col span={24}>
              <span className="text-lg c text-right mx-2">Variants</span>
            </Col>
            <Col span={24} className="px-6">
              <Card className="shadow-md">
                <Row gutter={[16, 24]} className="m-4">
                  {Array.from({ length: 12 })?.map((each, index) => (
                    <Col key={index} className="gutter-row mx-1">
                      <Tag
                        key={"default"}
                        color={"default"}
                        variant={"outlined"}
                      >
                        some variant
                      </Tag>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
          <Row className="my-4" >
            <Col span={24}>
              <span className="text-lg text-right mx-2">Attributes</span>
            </Col>
            <Col span={24} className="m-2 ">
              <Card>
                <Row gutter={[16, 8]}>
                  <Col span={8}>
                    <span>Dimension</span>
                  </Col>
                  <Col span={16}>
                    <StyledSecondaryText>W x H x L</StyledSecondaryText>
                  </Col>

                  <Col span={8}>
                    <span>Weight</span>
                  </Col>
                  <Col span={16}>
                    <StyledSecondaryText>2.0 kg</StyledSecondaryText>
                  </Col>

                  <Col span={8}>
                    <span>Warranty</span>
                  </Col>
                  <Col span={16}>
                    <StyledSecondaryText>1 year</StyledSecondaryText>
                  </Col>

                  <Col span={8}>
                    <span>Material</span>
                  </Col>
                  <Col span={16}>
                    <StyledSecondaryText>Fabric</StyledSecondaryText>
                  </Col>
                </Row>
              </Card>
              <Col className="mt-4">
                <span>Created At</span>{" "}
                <StyledSecondaryText>
                  {dayjs(product?.createdAt).format("DD-MM-YYYY: HH.mm")}
                </StyledSecondaryText>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider size="large" />
      <Row className=" p-8" >
        <span className="text-xl font-semibold">Relate Products</span>
      </Row>
      <Row className="mb-24 p-8" justify="center">
        {Array(16)
          .fill({
            productName: `Product Name`,
            code: null,
            img: "https://www.nawy.com/blog/wp-content/uploads/2022/07/interior-design.jpg",
            images: [],
            price: 990,
          })
          ?.map((each, index) => (
            <>
              <Col
                span={isMobile ? 16 : 4} 
                key={index}
                className="mx-5 mb-12"
                style={{ cursor: "pointer" }}
              >
                <StyledListCard imgHeight={"200px"} index={index} item={each} />
              </Col>
            </>
          ))}
      </Row>
      <Footer style={{ ...footerStyle }}>
        <Row className="mb-2 mt-4 mr-12" justify="end">
          <Button
            className={`${isMobile ? "w-5/10" : "w-1/10"} mx-2`}
            variant="outlined"
            shape="round"
            color="danger"
            type="default"
          >
            <ShoppingCartOutlined /> Add to card
          </Button>

          <Button
            className={`${isMobile ? "w-3/10" : "w-2/10"} mx-2`}
            color="danger"
            variant="solid"
            shape="round"
          >
            <ShoppingOutlined /> Buy Now
          </Button>
        </Row>
      </Footer>
    </>
  );
}
