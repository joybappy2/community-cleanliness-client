import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router";

const IssueCard = ({ issue }) => {
  const { title, image, description, category, date, location, amount, _id } =
    issue;

  return (
    <div>
      <div className="card shadow-md hover:shadow-2xl flex flex-col h-full transition-shadow duration-300 border  dark:border-gray-700 ">
        {/* Image */}
        <figure className="h-56 w-full overflow-hidden rounded-t-xl">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </figure>

        {/* Content */}
        <div className="card-body flex flex-col grow p-5">
          <h2 className="text-lg font-semibold leading-tight">{title}</h2>

          <p className="text-sm  mt-2 text-gray-500 line-clamp-3 grow">
            {`${description.slice(0, 150)}...`}
          </p>

          {/* Meta Info */}
          <div className="mt-4 text-sm">
            <span className="px-2 py-0.5 border border-gray-300  rounded-md ">
              {category}
            </span>{" "}
            <br />
            <br />
            <div className="flex flex-wrap gap-2">
              <span className=" flex gap-1">
                <FaLocationDot />
                <span>{location}</span>
              </span>
              <span className="px-2 flex gap-1">
                <FaRegCalendarAlt />
                <span>{date}</span>
              </span>
              <span className="px-2 py-0.5 flex items-center">
                <span className="text-xl -mt-1 flex items-center">
                  <TbCurrencyTaka />
                </span>
                <span>{amount}</span>
              </span>
            </div>
          </div>

          <Link to={`/issue-details/${_id}`}>
            {/* Button */}
            <button className="btn mt-4 text-white bg-secondary hover:bg-green-500 border-none w-full">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
