/* eslint-disable react/prop-types */

import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Notify = ({ notify, refetch }) => {
  const date = new Date(notify.time);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format if needed
  hours = hours % 12 || 12;

  const timeString = `${hours}:${minutes} ${amOrPm}`;

  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient();

  const handleStatusChanged = async (id) => {
    const data = await axiosSecure.patch(`/notification/${id}`, {
      status: "read",
    });
    //console.log(data);
    refetch();
    queryClient.invalidateQueries(["count"]);
  };

  return (
    <div className="bg-slate-100 text-sm mb-2 px-2 py-1 rounded-2xl">
      <p>{notify.message}</p>
      <div className="flex justify-between">
        <p>Date: {new Date(notify?.date).toLocaleDateString()}</p>
        <p>Time: {timeString}</p>
        {notify.status === "unread" && (
          <button
            onClick={() => handleStatusChanged(notify._id)}
            className="underline text-green-500"
          >
            Read
          </button>
        )}
      </div>
    </div>
  );
};

export default Notify;
