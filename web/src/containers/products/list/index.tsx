"use client";

import StyledListCard from "@/src/components/StyledListCard";
import { IProduct } from "@/src/components/types/interface";
import { theme } from "@/src/utils/theme";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, message, Pagination, Row, Spin } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";


export default function Products() {
  /* ---------------------------------- utils --------------------------------- */
  const router = useRouter();

  /* ---------------------------------- state --------------------------------- */
  const [products, setProducts] = useState<IProduct[]>([]);

  const [count, setSetCount] = useState(0);

  const [searchText, setSearchText] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  /* -------------------------------- variables ------------------------------- */
  const [debouncedSearchText] = useDebounce<string | null>(searchText, 500);

  /* -------------------------------- functions ------------------------------- */
  const formatQueryString = useMemo(() => {
    let result: string[] = [];

    if (currentPage || pageLimit) {
      result = [...result, `?`];
    }

    if (currentPage) {
      result = [...result, `currentPage=${currentPage}&`];
    }
    if (pageLimit) {
      result = [...result, `pageLimit=${pageLimit}&`];
    }

    return result?.join("");
  }, [currentPage, pageLimit]);

  const formatFilterSearch = useMemo(() => {
    const formattedText = debouncedSearchText?.trim();

    if (formattedText === "" || !formattedText || formattedText?.length < 3)
      return {};

    return {
      OR: [
        {
          productName: { in_contains: debouncedSearchText },
        },
        {
          code: { in_contains: debouncedSearchText },
        },
        {
          searchText: { in_contains: debouncedSearchText },
        },
        // {
        //   price: { gte: debouncedSearchText },
        // },
      ],
    };
  }, [debouncedSearchText]);

  const fetchProducts = async () => {
    if (debouncedSearchText) {
      setCurrentPage(1);
    }
    if (debouncedSearchText && debouncedSearchText?.length < 3) return;

    setIsLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products${formatQueryString}`,
        {
          ...(formatFilterSearch && {
            filter: JSON.stringify(formatFilterSearch),
          }),
        } as unknown as AxiosRequestConfig<unknown>
      )
      .then(({ data }) => {
        const { products, count } = data || {};
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
  }, [formatFilterSearch, formatQueryString, debouncedSearchText]);

  return (
    <>
      <Row className="w-full mt-3 pt-8">
        <Col push={1} span={5}>
          {" "}
          <span className="text-xl ">Product List</span>
        </Col>
      </Row>
      <Row className="w-screen  justify-center mt-6 ">
        <Row className="w-9/10">
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

        <Col offset={20}>
          <span
            className="text-md font-semibold"
            style={{ color: theme.color.secondary }}
          >
            พบสินค้า {count} รายการ
          </span>
        </Col>
        {count ? (
          <Row className="w-5/6 mt-8">
            {isLoading ? (
              <Spin />
            ) : (
              <>
                {products?.map((each, index) => (
                  <Col
                    key={index}
                    span={4}
                    className="mx-5 mb-12"
                    style={{ cursor: "pointer" }}
                  >
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
      <Row justify={"end"} className="m-5">
        <Pagination
          showSizeChanger
          pageSize={pageLimit}
          current={currentPage}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageLimit(pageSize);
          }}
          defaultCurrent={6}
          total={count}
        />
      </Row>
    </>
  );
}
