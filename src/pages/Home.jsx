import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import waterlogging from "../assets/jashore_waterlogging.jpg";
import garbage from "../assets/waste-excavator-bangladesh.jpg";
import cleaning from "../assets/cleaning.jpg";
import LatestIssueCards from "../components/LatestIssueCards";
import ReportByCategory from "../components/ReportByCategory";
import PageTitle from "../components/PageTitle";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto mb-10 p-2">
      <PageTitle title="Home | Community Cleanliness" />

      <h2 className="text-3xl md:text-4xl font-bold text-center my-10 mt-20 px-4">
        <span>Join Us To</span>
        <span className="text-secondary">
          <Typewriter
            words={[
              " Take Action Today",
              " Keep Your City Clean",
              " Raise Your Voice",
              " Fix What Matters",
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </span>
      </h2>
      {/* Swiper Carousel */}
      <div className=" carousel w-full max-h-[300px] md:max-h-[500px] ">
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              className="w-full h-full object-cover"
              src={waterlogging}
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full object-cover" src={cleaning} alt="" />
          </SwiperSlide>

          <SwiperSlide>
            <img className="w-full h-full object-cover" src={garbage} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* REPORT BY CATEGORY */}
      <section className="report-category  mt-32 pt-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Report By <span className="text-secondary">Category</span>
        </h2>
        <div className="bg-base-300 rounded-xl md:p-10 ">
          <ReportByCategory></ReportByCategory>
        </div>
      </section>

      {/* LATEST ISSUES */}
      <section className="latest-issues mt-32 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-10">
          Recent <span className="text-secondary">Complaints</span>
        </h2>
        <LatestIssueCards></LatestIssueCards>
      </section>

      {/* Community Stats */}
      <section className=" ">
        <h2 className="text-3xl md:text-4xl font-bold text-center mt-32 mb-10 md:mb-10">
          Community <span className="text-secondary">Stats</span>
        </h2>
        <div className="bg-base-300 p-10 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 justify-between">
            <div className="">
              <h3 className="text-3xl mb-5 md:text-4xl font-bold text-center">
                Total Registered <br />{" "}
                <span className="text-secondary">Users</span>
              </h3>
              <p className="font-bold text-6xl p-16 md:text-6xl text-center rounded-xl shadow-md hover:shadow-2xl bg-secondary text-white">
                <span>5000+</span>
              </p>
              <p></p>
            </div>
            <div className="">
              <h3 className="text-3xl mb-5 md:text-4xl font-bold text-center">
                Total Issues <br />{" "}
                <span className="text-secondary">Resolved</span>
              </h3>
              <p className="font-bold text-6xl p-16  text-center rounded-xl shadow-md hover:shadow-2xl bg-secondary text-white">
                <span>300+</span>
              </p>
              <p></p>
            </div>
            <div className="">
              <h3 className="text-3xl mb-5 md:text-4xl font-bold text-center">
                Total Pending <br />{" "}
                <span className="text-secondary">Issues</span>
              </h3>
              <p className="font-bold text-6xl p-16  text-center rounded-xl shadow-md hover:shadow-2xl bg-secondary text-white">
                <span>99+</span>
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
