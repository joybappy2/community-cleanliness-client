import { formatDate } from "date-fns";
import { use, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import AuthContext from "../components/AuthContext";
import Swal from "sweetalert2";
import { FaLocationDot } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";

const IssueDetails = () => {
  const [issue, setIssue] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://cleanliness-api.vercel.app/issue-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
      });
  }, [id]);

  const { category, title, date, amount, location, description, image, _id } =
    issue || {};

  const modalRef = useRef(null);
  const today = formatDate(new Date(), "yy-MM-dd");
  const { user } = use(AuthContext);

  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://cleanliness-api.vercel.app/issue/${id}/contributions`)
      .then((res) => res.json())
      .then((data) => {
        setContributions(data);
        setLoading(false);
      });
  }, [id]);

  const handleModalSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const amount = parseInt(e.target.amount.value);
    const contributorName = e.target.contributorName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const date = e.target.date.value;
    const additional = e.target.additional.value;
    const issueId = _id;
    const contributorImage = user?.photoURL;

    const newContribution = {
      title,
      amount,
      contributorName,
      email,
      phone,
      address,
      date,
      additional,
      issueId,
      category,
      contributorImage,
      issueImage: image,
    };

    fetch("https://cleanliness-api.vercel.app/add-contribution", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newContribution),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          const updateContribution = [...contributions, newContribution];
          setContributions(updateContribution);

          Swal.fire({
            title: "Your  Have Contributed Successfully",
            icon: "success",
          });
        }
      });
    e.target.reset();
    modalRef.current.close();
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-2">
      <PageTitle title={`Details | ${title}`} />

      {loading ? (
        // <LoadingSpinner />
        ""
      ) : (
        <div>
          <div className=" mx-auto my-10 px-4 lg:px-0">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold  mb-5">{title}</h1>
            <p className="mb-2">
              {" "}
              <span className="font-semibold">Category: </span>{" "}
              <span className="text-gray-500 font-semibold">{category}</span>
            </p>

            {/* Featured Image */}
            <div className=" overflow-hidden mb-6">
              <img
                src={image}
                alt="Garbage Overflow"
                className="max-w-full h-[350px] md:h-[450px] object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose max-w-none  leading-relaxed">
              <div className="flex gap-10">
                <p className="mb-4 flex gap-1 items-center">
                  <span className="-mt-1">
                    <FaLocationDot />
                  </span>{" "}
                  <span className="font-semibold">{location}</span>
                </p>
                <p className="mb-4 flex gap-1 items-center">
                  <span className="-mt-1">
                    <FaRegCalendarAlt />
                  </span>{" "}
                  <span className="font-semibold">{date}</span>
                </p>
                <p className="mb-4 flex gap-1 items-center">
                  <span className="-mt-1 text-xl">
                    <TbCurrencyTaka />
                  </span>{" "}
                  <span className="font-semibold">{amount}</span>
                </p>
              </div>

              <p className="mb-4">{description}</p>
            </div>

            {/* Action Button */}
            <div className="mt-10">
              {/* Button */}
              <button
                onClick={() => modalRef.current.showModal()}
                className="btn mt-4 bg-secondary hover:bg-green-500 text-white border-none"
              >
                Pay Cleanup Contribution
              </button>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <dialog
                ref={modalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box max-h-[80vh] overflow-y-auto p-6 md:p-10">
                  <form
                    onSubmit={handleModalSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="label">Issue Title</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Your Issue Title"
                        name="title"
                        defaultValue={title}
                        readOnly
                        required
                      />
                    </div>

                    {/* Contributor Name */}
                    <div className="flex flex-col">
                      <label className="label">Contributor Name</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Your Name"
                        name="contributorName"
                        required
                      />
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col">
                      <label className="label">Amount</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Amount"
                        name="amount"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="label">Phone</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Phone"
                        name="phone"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="label">Address</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Your Address"
                        name="address"
                        required
                      />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                      <label className="label">Additional Information</label>
                      <input
                        type="text"
                        className="input w-full"
                        name="additional"
                      />
                    </div>

                    {/* Date */}
                    <div className="flex flex-col">
                      <label className="label">Date</label>
                      <input
                        defaultValue={today}
                        readOnly
                        type="text"
                        className="input w-full"
                        name="date"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="label">Email</label>
                      <input
                        defaultValue={user?.email}
                        readOnly
                        type="email"
                        className="input w-full"
                        name="email"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                      <button className="btn bg-secondary hover:bg-green-500 text-white border-none mt-4 w-full">
                        Submit
                      </button>
                    </div>
                  </form>

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mt-20 mb-10">
              Contributions On This Issue ({contributions.length})
            </h2>

            <div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* Table Head */}
                  <thead className="bg-base-300 text-sm md:text-base">
                    <tr>
                      <th className="text-center">SL</th>
                      <th>Contributor</th>
                      <th>Issue</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {contributions.map((contribution, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-base-200 transition-all duration-200 "
                      >
                        {/* SL */}
                        <th className="text-center text-sm md:text-base py-3">
                          {idx + 1}
                        </th>

                        {/* Contributors */}
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <figure className="h-12 w-12">
                                <img
                                  className=" rounded-full w-full h-full"
                                  src={
                                    contribution?.contributorImage ||
                                    "https://cdn-icons-png.flaticon.com/512/9815/9815472.png"
                                  }
                                  alt="user profile avatar"
                                />
                              </figure>
                            </div>
                            <div>
                              <p className="font-semibold  text-sm md:text-base">
                                {contribution.contributorName}
                              </p>
                              <p className="text-xs md:text-sm  truncate max-w-[120px] md:max-w-none">
                                {contribution.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Issue */}
                        <td className="py-3">
                          <p className="font-medium  text-sm md:text-base truncate max-w-[140px] md:max-w-none">
                            {contribution.title}
                          </p>
                        </td>

                        {/* Amount */}
                        <td className="text-right font-semibold text-secondary md:text-base py-3">
                          <span className="mr-1">৳</span>
                          {contribution.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetails;
