import React, { useEffect, useState } from "react";
import IssueCard from "../components/IssueCard";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";

const All_Issue = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [loadingAllIssues, setLoadingAllIssues] = useState(true);
  const [filteredIssues, setFilteredIssues] = useState([]);

  useEffect(() => {
    fetch("https://cleanliness-api.vercel.app/all-issues")
      .then((res) => res.json())
      .then((data) => {
        setAllIssues(data);
        setFilteredIssues(data);
        setLoadingAllIssues(false);
      });
  }, []);

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value.toLowerCase().split(" ").join("");
    if (selectedCategory === "none" || !selectedCategory) {
      setFilteredIssues(allIssues);
      return;
    }
    const filteredCategories = allIssues.filter(
      (issue) =>
        issue.category.toLowerCase().split(" ").join("") === selectedCategory
    );
    setFilteredIssues(filteredCategories);
  };

  const handleStatusFilter = (e) => {
    const selectedStatus = e.target.value.toLowerCase().split(" ").join("");
    console.log(selectedStatus);
    if (selectedStatus === "none") {
      return;
    }
    const filteredStatus = allIssues.filter(
      (issue) =>
        issue.status.toLowerCase().split(" ").join("") === selectedStatus
    );
    setFilteredIssues(filteredStatus);
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <PageTitle title="Explore All Issues" />

      <h2 className="my-10 text-3xl md:text-4xl font-bold text-center">
        All{" "}
        <span className="text-secondary">
          Issues <span>({filteredIssues.length})</span>
        </span>
      </h2>

      {/* Category Sorting */}
      <div className="w-full px-3 md:pr-3 my-4 rounded-lg flex justify-end">
        <select
          onChange={handleCategoryFilter}
          className="select outline-secondary outline"
        >
          <option value="none">Select a Category</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      {/* Status Sorting */}
      <div className="w-full px-3 md:pr-3 my-4 rounded-lg flex justify-end">
        <select
          onChange={handleStatusFilter}
          className="select outline-secondary outline"
        >
          <option value="none">Sort by Status</option>
          <option value="On Going">On Going</option>
          <option value="Ended">Ended</option>
        </select>
      </div>

      <div>
        {loadingAllIssues ? (
          <div className="w-full flex justify-center items-center h-[200px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue?._id} issue={issue}></IssueCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default All_Issue;
