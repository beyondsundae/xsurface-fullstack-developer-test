import { EyeFilled, RightOutlined } from "@ant-design/icons";
import { Col, Carousel, Row, Card, Typography, Tooltip } from "antd";
import { useState, useMemo, ReactNode } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/utils";
import { SaveToMaterial, ExclusiveDealBanner } from "./icons/SVGComponents";
import { theme } from "../utils/theme";
import { IProduct } from "./types/interface";
import { debugginBorder } from "../utils/components";
import StyledItemCard from "./StyledItemCard";
const { Text, Link } = Typography;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  lineHeight: "160px",
  textAlign: "center",
};

const carouselStyle: React.CSSProperties = {
  width: "100%",
};

const StyledDisCountTagText = styled(Text)`
  display: flex;
  position: absolute;
  bottom: 355px;
  right: 10px;
  z-index: 2;
  background-color: ${theme.color.priceTag};
  border-radius: 3px;
  padding: 0px 8px;
  color: white;
  font-size: 12px;

   /* White dot */
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 2px;
    width: 3px;
    height: 3px;
    background-color: white;
    border-radius: 50%;
`;

export interface props {
  data?: IProduct[];
  description?: string;
  title?: string | ReactNode;
  linkColor?: string;
  backgroundColor?: string;
}

export default function CardCarousel({
  data,
  description,
  title,
  linkColor,
  backgroundColor,
}: props) {
  /* ---------------------------------- state --------------------------------- */
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  /* -------------------------------- variables ------------------------------- */
  const limit = 5;
  const pagesTotal = Math.ceil(Number(data?.length) / limit);

  const startIndex = currentSlide * limit;
  const limitedLatestViewedProduts = useMemo(
    () => data?.slice(startIndex, startIndex + limit),
    [data, startIndex, currentSlide]
  );
  return (
    <>
      <div
        style={{
          background: `linear-gradient(to bottom, ${backgroundColor} 60%, white 40%)`,
        }}
      >
        <Row className="mt-3 pt-8">
          <Col push={1} span={5}>
            <span className="text-3xl">{title}</span>
            <Col push={12} className="mt-3">
              <span className="text-xl">{description}</span>
            </Col>
          </Col>
          <Col offset={15} className=" mt-2">
            <Link
              href=""
              target="_blank"
              style={{ color: linkColor }}
              className="text-md"
            >
              สินค้าทั้งหมด <RightOutlined />
            </Link>
          </Col>
        </Row>

        <Col className="flex justify-center">
          <div className="light-carousel w-4/5 relative overflow-visible pb-8">
            <Carousel
              arrows
              // className="px-[150px]"
              className="w-full"
              style={carouselStyle}
              infinite={true}
              autoplay={false}
              afterChange={(currentSlide) => {
                setCurrentSlide(currentSlide);
              }}
            >
              {Array(pagesTotal)
                .fill(null)
                ?.map((each, indexOutter) => (
                  <div key={indexOutter} style={contentStyle}>
                    <Row justify="space-evenly" className="my-10 w-full px-10">
                      {limitedLatestViewedProduts?.map((each, index) => {
                        return (
                          <Tooltip key={index} title={`outer index: ${indexOutter}, inner index: ${index}`}>
                            <Col className="mb-3">
                              <StyledItemCard
                                imgHeight={"230px"}
                                index={index}
                                item={each}
                              />

                              <ExclusiveDealBanner
                                className=""
                                size={80}
                                style={{
                                  display: "flex", //(index % 2 === 0 && "flex") || "none",
                                  position: "absolute",
                                  bottom: 355,
                                  left: 10,
                                  zIndex: 2,
                                }}
                              />
                              <StyledDisCountTagText className="text-xs">
                                -{each?.discountPercentage * 100}%
                              </StyledDisCountTagText>
                            </Col>
                          </Tooltip>
                        );
                      })}
                    </Row>
                  </div>
                ))}
            </Carousel>
          </div>
        </Col>
      </div>
    </>
  );
}
