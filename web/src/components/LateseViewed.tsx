import { UserOutlined } from "@ant-design/icons";
import { Avatar, Carousel, Col, Row } from "antd";
import { useMemo, useState } from "react";
import { StyledCenterDiv } from "../utils/components";
import { formatPrice } from "../utils/utils";

const dataTotal = 20;

const mockLatestViewedProducts = Array(dataTotal)
  .fill({
    productName: "productName",
    img: "",
    price: 550,
    unit: "ตร.ม.",
  })
  ?.map((each, index) => ({ no: index, ...each }));

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  lineHeight: "160px",
  textAlign: "center",
};

const carouselStyle: React.CSSProperties = {
  width: "100%",
};

export default function LateseViewed() {
  /* ---------------------------------- state --------------------------------- */
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // pagination concept
  //   (1-1) * 6 = start at 0/ length = 6
  //   (2-1) * 6 = start at 6/ length = 6

  /* -------------------------------- variables ------------------------------- */
  const limit = 6;
  const pagesTotal = Math.ceil(dataTotal / limit);

  const startIndex = currentSlide * limit;
  const limitedLatestViewedProduts = useMemo(
    () => mockLatestViewedProducts?.slice(startIndex, startIndex + limit),
    [startIndex, currentSlide]
  );

  return (
    <div style={{ border: "1px solid transparent" }}>
      <Row>
        <Col offset={1}>
          <span className="text-2xl">ดูล่าสุด</span>
        </Col>
      </Row>

      <Col className="flex justify-center">
        <div className="light-carousel w-3/4 relative overflow-visible pb-8">
          <Carousel
            arrows
            // className="px-[150px]"
            className="w-full light-carousel"
            style={carouselStyle}
            infinite={false}
            autoplay={false}
            afterChange={(currentSlide) => {
              setCurrentSlide(currentSlide);
            }}
          >
            {Array(pagesTotal)
              .fill(null)
              ?.map((each, index) => (
                <div key={index} style={contentStyle}>
                  <Row
                    justify="space-evenly"
                    className="my-10 w-full px-[120px]"
                    style={{ border: "1px solid transparent" }}
                  >
                    {limitedLatestViewedProduts?.map((each, index) => (
                      <Col key={index} className="mb-3">
                        <StyledCenterDiv>
                          <Avatar
                            className="rounded-xl"
                            style={{ borderRadius: 16 }}
                            src={each?.img}
                            shape="square"
                            size={120}
                            icon={<UserOutlined />}
                          />

                          <span>
                            {each?.productName} {each?.no}
                          </span>
                          <span>
                            <span className="font-bold">
                              {formatPrice(each?.price)}
                            </span>
                            /{each?.unit}
                          </span>
                        </StyledCenterDiv>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
          </Carousel>
        </div>
      </Col>
    </div>
  );
}
