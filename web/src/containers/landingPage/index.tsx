"use client";

import Banner from "@/src/components/Banner";
import Collections from "@/src/components/Collections";
import Footer from "@/src/components/Footer";
import HitsCatagory from "@/src/components/HitsCatagory";
import HitsProducts from "@/src/components/HitsProducts";
import LateseViewed from "@/src/components/LateseViewed";
import Navbar from "@/src/components/Navbar";
import RandomDetails from "@/src/components/RandomDetails";
import RelatedBrands from "@/src/components/RelatedBrands";
import XClusiveDeal from "@/src/components/XClusiveDeal";
import { Row, Col, Input, Button, Space } from "antd";

interface Props {}

export default function LandingPage({}: Props) {
  return (
    <>
      <Navbar />
      <Banner />
      <HitsCatagory />
      <LateseViewed />
      <HitsProducts />
      <XClusiveDeal />
      <Collections />
      <RandomDetails />
      <RelatedBrands />
      <Footer />

    </>
  );
}
