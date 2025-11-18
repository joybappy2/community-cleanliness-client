import { useEffect, useState } from "react";
import LatestIssueCard from "./LatestIssueCard";
import LoadingSpinner from "./LoadingSpinner";

const LatestIssueCards = () => {
  const [latestIssues, setLatestIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/latest-issues")
      .then((res) => res.json())
      .then((data) => {
        setLatestIssues(data);
        setLoading(false);
      });
  }, []);

  if (latestIssues.length === 0) {
    return (
      <p className=" font-bold text-center text-gray-500">
        No Complaints To Show
      </p>
    );
  }

  return (
    <div className="">
      {loading ? (
        <div className="w-full flex justify-center items-center h-[400px]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {latestIssues.map((issue) => (
            <LatestIssueCard key={issue?._id} issue={issue}></LatestIssueCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestIssueCards;
