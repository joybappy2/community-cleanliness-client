import React, { use, useEffect, useState } from "react";
import AuthContext from "../components/AuthContext";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyContribution = () => {
  const { user } = use(AuthContext);
  const [myContributions, setMyContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://community-cleanliness-server-gold.vercel.app/my-contributions?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMyContributions(data);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDownloadPdf = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    autoTable(pdf, {
      html: "#my-table",
      styles: {
        overflow: "linebreak",
        minCellHeight: 20,
      },
    });
    pdf.save("my-comtribution.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-2">
      <PageTitle title="My Contribution" />

      <div>
        {loading ? (
          <div className="w-full justify-center items-center flex h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              My <span className="text-secondary">Contribution</span>({myContributions.length})
            </h2>
            <div className="overflow-x-auto max-w-7xl mx-auto my-10">
              <table id="my-table" className="table w-full">
                {/* Table Head */}
                <thead className="bg-base-300 text-sm md:text-base">
                  <tr>
                    <th className="text-center">SL</th>
                    <th>Issue Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Payed Amount</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {myContributions.map((issue, idx) => (
                    <tr
                      key={issue?._id}
                      className="hover:bg-base-200 transition-all duration-200"
                    >
                      {/* SL */}
                      <th className="text-center text-sm md:text-base py-3">
                        {idx + 1}
                      </th>

                      {/* Contributors */}
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm max-w-[500px]">
                              {issue?.title}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Issue */}
                      <td className="py-3">
                        <p className="font-medium text-sm md:text-base truncate max-w-[140px] md:max-w-none">
                          {issue?.category}
                        </p>
                      </td>

                      {/* Actions*/}
                      <td className=" py-3 items-center">{issue?.date}</td>

                      {/* Amount */}
                      <td className=" font-semibold text-secondary md:text-base py-3">
                        <span className="mr-1">৳</span>
                        {issue?.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className=" w-full flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className=""
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default MyContribution;
