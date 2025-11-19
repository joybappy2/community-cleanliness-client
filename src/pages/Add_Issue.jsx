import React, { use } from "react";
import AuthContext from "../components/AuthContext";
import { formatDate } from "date-fns";
import Swal from "sweetalert2";
import PageTitle from "../components/PageTitle";

const Add_Issue = () => {
  const { user } = use(AuthContext);
  const today = formatDate(new Date(), "yy-MM-dd");

  const handleAddIssue = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const location = e.target.location.value;
    const amount = parseInt(e.target.amount.value);
    const description = e.target.description.value;
    const image = e.target.image.value;
    const status = e.target.status.value;
    const date = e.target.date.value;
    const email = e.target.email.value;
    const newIssue = {
      title,
      category,
      location,
      amount,
      description,
      image,
      status,
      date,
      email,
    };

    fetch("https://community-cleanliness-server-gold.vercel.app/add-issue", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Your Issue Added Successfully",
          icon: "success",
        });
        e.target.reset();
      });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageTitle title="Add Your Issue" />

      <div className="md:grid grid-cols-2 min-h-[calc(100vh-350px)] my-20">
        <div className=" flex justify-center items-center">
          <h2 className="text-3xl md:text-7xl font-bold text-center leading-snug">
            Add <br /> Your Complaint To Fix It 🔜
          </h2>
        </div>
        <div className=" md:flex w-full mx-auto justify-center items-center my-10 px-4 ">
          <form
            onSubmit={handleAddIssue}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl p-10 shadow-2xl bg-base-300"
          >
            {/* Title */}
            <div className="flex flex-col">
              <label className="label">Issue Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter Your Issue Title"
                name="title"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="label">Category</label>
              <select
                className="select w-full"
                name="category"
                defaultValue=""
                required
              >
                <option disabled value="">
                  Select Issue Category
                </option>
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

            {/* Location */}
            <div className="flex flex-col">
              <label className="label">Location</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter Location"
                name="location"
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

            {/* Description (full width) */}
            <div className="flex flex-col md:col-span-2">
              <label className="label">Description</label>
              <textarea
                type=""
                className="text-area border border-gray-700 bg-base-100  w-full min-h-20 p-2"
                placeholder="Enter Description"
                name="description"
                required
              />
            </div>

            {/* Image */}
            <div className="flex flex-col md:col-span-2">
              <label className="label">Image</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter Image URL"
                name="image"
                required
              />
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="label">Status</label>
              <input
                defaultValue="On Going"
                readOnly
                type="text"
                className="input w-full"
                name="status"
                required
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

            <div className="md:col-span-2">
              <button className="btn bg-secondary text-white hover:bg-green-500 mt-4 w-full">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Issue;
