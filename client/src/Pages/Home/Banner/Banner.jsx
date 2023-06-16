import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import french from "../../../assets/French.jpg";
import italian from "../../../assets/italian.jpg";
import arabic from "../../../assets/arabic.webp";
import gramany from "../../../assets/german.jpg";
import book from "../../../assets/book.png";
import Button from "../../../components/Shared/Button";
import BannerSeal from "../../../components/Banner/BannerSeal";
import SectionTitle from "../../Shared/SectionTitle";

const Banner = () => {
  return (
    <section className="flex flex-col gap-10">
    <Carousel>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <BannerSeal
              headings={"Thanks!!!!!"}
              subheadings={"Want to learn new languages"}
            ></BannerSeal>
            <Button content={"Join now"}></Button>
          </div>
          <div className="">
            <img src={french} alt="" className="h-[500px] w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <BannerSeal
              headings={"Thanks!!!!!"}
              subheadings={"Want to learn new languages"}
            ></BannerSeal>
            <Button content={"Join now"}></Button>
          </div>
          <div className="">
            <img src={gramany} alt="" className="h-[500px] w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <BannerSeal
              headings={"Thanks!!!!!"}
              subheadings={"Want to learn new languages"}
            ></BannerSeal>
            <Button content={"Join now"}></Button>
          </div>
          <div className="">
            <img src={book} alt="" className="h-[500px] w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <BannerSeal
              headings={"Thanks!!!!!"}
              subheadings={"Want to learn new languages"}
            ></BannerSeal>
            <Button content={"Join now"}></Button>
          </div>
          <div className="">
            <img src={arabic} alt="" className="h-[500px] w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <BannerSeal
              headings={"Thanks!!!!!"}
              subheadings={"Want to learn new languages"}
            ></BannerSeal>
            <Button content={"Join now"}></Button>
          </div>
          <div className="">
            <img src={italian} alt="" className="h-[500px] w-full object-cover" />
          </div>
        </div>
    </Carousel>
    </section>
  );
};

export default Banner;
