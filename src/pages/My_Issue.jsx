import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../components/AuthContext";
import Swal from "sweetalert2";
import PageTitle from "../components/PageTitle";
import LoadingSpinner from "../components/LoadingSpinner";

const My_Issue = () => {
  const { user } = useContext(AuthContext);
  // const modalRef = useRef(null);
  const updateModalRef = useRef(null);
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const categoryRef = useRef(null);
  const statusRef = useRef();

  useEffect(() => {
    fetch(
      `https://community-cleanliness-server-gold.vercel.app/my-issues?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyIssues(data));
    setLoading(false);
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://community-cleanliness-server-gold.vercel.app/issue/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your issue has been deleted.", "success");
              setMyIssues(myIssues.filter((issue) => issue._id !== id));
            }
          });
      }
    });
  };

  const handleStatus = () => {
    setCurrentStatus(statusRef.current.value);
  };

  const handleCategoryChange = () => {
    console.log(categoryRef.current.value);
    setCurrentCategory(categoryRef.current.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(updateId);
    const title = e.target.title.value;
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const status = currentStatus;
    const category = currentCategory;

    const updatedIssue = {};

    if (title) updatedIssue.title = title;
    if (amount) updatedIssue.amount = amount;
    if (description) updatedIssue.description = description;
    if (status) updatedIssue.status = status;
    if (category) updatedIssue.category = category;

    if (Object.keys(updatedIssue).length === 0) {
      updateModalRef.current.close();
      Swal.fire({
        icon: "error",
        title: "Noting to Update",
        text: "Please add changes!",
      });
      return;
    }

    fetch(
      `https://community-cleanliness-server-gold.vercel.app/issue/update/${updateId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedIssue),
      }
    ).then(() => {
      updateModalRef.current.close();
      Swal.fire({
        title: "Updated Successfully",
        icon: "success",
        text: "Refresh to see Changes!",
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-2">
      <PageTitle title="My Issue" />

      <div>
        {loading ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              My Issues ({myIssues.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* Table Head */}
                <thead className="bg-base-300 text-sm md:text-base">
                  <tr>
                    <th className="text-center">SL</th>
                    <th>Issue</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {myIssues.map((contribution, idx) => (
                    <tr
                      key={contribution?._id}
                      className="hover:bg-base-200 transition-all duration-200"
                    >
                      {/* SL */}
                      <th className="text-center text-sm md:text-base py-3">
                        {idx + 1}
                      </th>

                      {/* Contributors */}
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <figure className="h-20 w-32">
                              <img
                                className=" "
                                src={contribution?.image || ""}
                                alt="issue poster"
                              />
                            </figure>
                          </div>
                          <div>
                            <p className="font-semibold  text-sm md:text-base max-w-[500px]">
                              {contribution?.title}
                            </p>
                            <p className="text-xs md:text-sm  truncate max-w-[120px] md:max-w-none">
                              {contribution?.date}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Issue */}
                      <td className="py-3">
                        <p className="font-medium  text-sm md:text-base truncate max-w-[140px] md:max-w-none">
                          {contribution?.category}
                        </p>
                      </td>

                      <td>{contribution.status}</td>

                      {/* Amount */}
                      <td className=" font-semibold text-secondary md:text-base py-3">
                        <span className="mr-1">৳</span>
                        {contribution?.amount}
                      </td>
                      {/* Actions*/}
                      <td className=" py-3 items-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              updateModalRef.current.showModal();
                              setUpdateId(contribution?._id);
                            }}
                            className="btn btn-sm bg-green-700 text-white"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(contribution?._id)}
                            className="btn btn-sm bg-red-700 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <dialog
                ref={updateModalRef}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box max-h-[80vh] overflow-y-auto p-6 md:p-10">
                  <form
                    onSubmit={handleUpdate}
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
                      />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                      <label className="label">Category</label>
                      <select
                        onChange={handleCategoryChange}
                        ref={categoryRef}
                        className="select w-full"
                      >
                        <option value={""}>Select Issue Category</option>
                        <option value="Garbage">Garbage</option>
                        <option value="Illegal Construction">
                          Illegal Construction
                        </option>
                        <option value="Broken Public Property">
                          Broken Public Property
                        </option>
                        <option value="Road Damage">Road Damage</option>
                      </select>
                    </div>

                    {/* Amount */}
                    <div className="flex flex-col">
                      <label className="label">Amount</label>
                      <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter Amount"
                        name="amount"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                      <label className="label">Description</label>
                      <textarea
                        type=""
                        className="text-area border border-gray-700 bg-base-100  w-full min-h-20 p-2"
                        placeholder="Enter Description"
                        name="description"
                      />
                    </div>

                    {/* Status */}
                    <div className="">
                      <label className="label">Status</label>
                      <select
                        onChange={handleStatus}
                        ref={statusRef}
                        className="select outline"
                      >
                        <option value={""}>Select Status</option>
                        <option value="On Going">On Going</option>
                        <option value="Ended">Ended</option>
                      </select>
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
        )}
      </div>
    </div>
  );
};

export default My_Issue;
