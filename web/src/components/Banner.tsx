import { Carousel } from "antd";

const fixedHeight = {
  height: "472px",
};

const carouselStyle: React.CSSProperties = {
  ...fixedHeight,
  width: "1440px", // fixed width
  border: "1px solid purple",
};

const contentStyle: React.CSSProperties = {
  margin: 0,
  ...fixedHeight,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  textAlign: "center",
  background: "#364d79"
};

export default function Banner() {
  const mockBanner = Array(4)?.fill({
    title: "BANNER XSURFACE",
  });
  return (
    <>
      <div
        className="styled-banner-carousel w-full flex items-center justify-center"
        
      >
        <Carousel
        arrows
          infinite={true}
          style={carouselStyle}
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
        >
          {mockBanner?.map((each, index) => (
            <div key={index}>
              <h3 style={contentStyle}>
                <div className="text-7xl">{each?.title}{' '}{Number(index) + 1}</div>
                {/* <Img> something */}
              </h3>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
