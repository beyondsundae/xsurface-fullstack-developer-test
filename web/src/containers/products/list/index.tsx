import StyledListCard from "@/src/components/StyledListCard";
import { debugginBorder } from "@/src/utils/components";
import { theme } from "@/src/utils/theme";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, message, Row, Spin } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

interface props {}

export default function Products({}: props) {
  /* ---------------------------------- state --------------------------------- */
  const [products, setProducts] = useState([]);
  const [count, setSetCount] = useState(0);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* -------------------------------- variables ------------------------------- */
  const [debouncedSearchText] = useDebounce(searchText, 500);
  console.log("🧅 debouncedSearchText", debouncedSearchText);

  /* -------------------------------- functions ------------------------------- */
  const formatFilterSearch = useMemo(() => {
    console.log("🔥 debouncedSearchText", debouncedSearchText);

    const formattedText = debouncedSearchText?.trim();

    if (formattedText === "" || !formattedText) return {};

    return {
      OR: [
        {
          productName: { in_contains: debouncedSearchText },
        },
        {
          code: { in_contains: debouncedSearchText },
        },
        // {
        //   price: { gte: debouncedSearchText },
        // },
      ],
    };
  }, [debouncedSearchText]);

  const fetchProducts = async () => {
    console.log("🍿 formatFilterSearch", formatFilterSearch);
    setIsLoading(true);
    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
        ...(formatFilterSearch && {
          filter: JSON.stringify(formatFilterSearch),
        }),
      } as unknown as AxiosRequestConfig<unknown>)
      .then(({ data }) => {
        const { products, count } = data || {};
        console.log("🐷 data", data);
        setProducts(products);
        setSetCount(count);
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
    fetchProducts();
  }, [formatFilterSearch]);

  return (
    <>
      <Row className="w-full mt-3 pt-8">
        <Col push={1} span={5}>
          {" "}
          <span className="text-xl ">Product List</span>
        </Col>
      </Row>
      <Row
        className="w-screen h-full justify-center mt-6 "
        style={debugginBorder}
      >
        <Row className="w-9/10" style={debugginBorder}>
          <Input
            size="large"
            className="h-full"
            style={{ borderRadius: 25 }}
            prefix={<SearchOutlined />}
            placeholder={"Name, Catalogue, Code "}
            onChange={(e) => {
              e.preventDefault();
              setSearchText(e?.target?.value);
            }}
            allowClear
          />
        </Row>
        {/* <Row className="w-full justify-end m" style={debugginBorder}>
          {count}
        </Row> */}
        <Col offset={20}>
          <span className="text-md font-semibold" style={{color: theme.color.secondary }}>พบสินค้า {count } รายการ</span>
        </Col>
        {count ? (
          <Row className="w-5/6 mt-8 " style={debugginBorder}>
            {isLoading ? (
              <Spin />
            ) : (
              <>
                {products?.map((each, index) => (
                  <Col key={index} span={4} className="mx-5 mb-12">
                    <StyledListCard
                      imgHeight={"200px"}
                      index={index}
                      item={each}
                    />
                  </Col>
                ))}
              </>
            )}
          </Row>
        ) : (
          <Row className="w-full mt-8 justify-center ">
            <span className=" text-lg">Not found item</span>
          </Row>
        )}
      </Row>
    </>
  );
}
