import { RightOutlined } from "@ant-design/icons";
import { Carousel, Col, Row, Tooltip, Typography } from "antd";
import { ReactNode, useMemo, useState } from "react";
import { theme } from "../utils/theme";
import StyledItemCard from "./StyledItemCard";
import { IProduct } from "./types/interface";
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

export interface props {
  data?: IProduct[];
  description?: string | ReactNode;
  title?: string | ReactNode;
  linkColor?: string;
  backgroundColor?: string;
}

export default function CardCarouselHighlight({
  data,
  description,
  title,
  linkColor,
  backgroundColor,
}: props) {
  /* ---------------------------------- state --------------------------------- */
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentActive, setCurrentActive] = useState<number | null>(0);

  /* -------------------------------- variables ------------------------------- */
  const limit = 3;
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
          background: `linear-gradient(to bottom, ${backgroundColor} 40%, white 20%)`,
        }}
      >
        <Row className="mt-3 pt-8">
          <Col push={2} span={5}>
            <span className="text-3xl">{title}</span>
            <Col className="mt-9">
              <span
                className="text-base font-thin"
                style={{ color: theme.color.secondary }}
              >
                {description}
              </span>
            </Col>
          </Col>
          <Col offset={15} className=" mt-2">
            <Link
              href=""
              target="_blank"
              style={{ color: linkColor }}
              className="text-md"
            >
              คอลเลคชั่นทั้งหมด <RightOutlined />
            </Link>
          </Col>
        </Row>

        <Col className="flex justify-center">
          <div className="styled-highlight-carousel w-23/24 relative overflow-visible pb-8">
            <Carousel
              arrows
              // className="px-[150px]"
              className="w-full"
              style={{ ...carouselStyle }}
              infinite={true}
              autoplay={false}
              afterChange={(currentSlide) => {
                setCurrentActive(0);
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
                          <Tooltip
                            key={index}
                            title={`outer index: ${indexOutter}, inner index: ${index}`}
                          >
                            <Col className="mb-3">
                              {currentActive === index ? (
                                <img
                                  alt="example"
                                  src={each?.img}
                                  style={{
                                    borderRadius: 16,
                                    height: "100%",
                                    width: 700,
                                    objectFit: "cover",
                                  }}
                                  onClick={() => {
                                    setCurrentActive(null);
                                  }}
                                />
                              ) : (
                                <>
                                  <StyledItemCard
                                    imgHeight={"250px"}
                                    setCurrentActive={setCurrentActive}
                                    index={index}
                                    item={each}
                                  />
                                </>
                              )}
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
