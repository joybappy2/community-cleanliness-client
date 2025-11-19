import React from "react";

const ReportByCategory = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
      {/* Card */}
      <div className="card">
        <div className="card-body">
          <h2 className=" md:text-3xl text-2xl font-bold  text-center">
            Garbage
          </h2>
          <p className="md:text-cen text-2xlter"></p>
        </div>
        <figure className="">
          <img
            className="rounded-2xl h-[300px] w-full object-cover"
            src="https://c8.alamy.com/comp/2H39CY7/non-exclusive-people-recycle-non-biodegradable-waste-at-a-garbage-dump-in-dhaka-to-be-used-in-the-recycling-industry-in-urban-areas-of-bangladesh-ar-2H39CY7.jpg"
            alt=""
          />
        </figure>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className=" md:text-3xl text-2xl font-bold  text-center">
            Illegal Construction
          </h2>
          <p className="text-center"></p>
        </div>
        <figure className="">
          <img
            className="rounded-2xl h-[300px] w-full object-cover"
            src="https://cdn.bdnews24.com/bdnews24/media/bdnews24-english/import/media/2019/02/18/eviction-burigonga-bosila-mzo-20012019-04.jpg"
            alt=""
          />
        </figure>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className=" md:text-3xl text-2xl font-bold  text-center">
            Broken Public Property
          </h2>
          <p className="text-center"></p>
        </div>
        <figure className="">
          <img
            className="rounded-2xl h-[300px] w-full object-cover"
            src="https://thefederal.com/h-upload/2025/07/17/548919-rayhous.webp"
            alt=""
          />
        </figure>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className=" md:text-3xl text-2xl font-bold  text-center">
            Broken Road
          </h2>
          <p className="text-center"></p>
        </div>
        <figure className="">
          <img
            className="rounded-2xl h-[300px] w-full object-cover"
            src="https://ecdn.dhakatribune.net/contents/cache/images/800x450x1/uploads/dten/2017/07/bandarban.jpg"
            alt=""
          />
        </figure>
      </div>
    </div>
  );
};

export default ReportByCategory;
