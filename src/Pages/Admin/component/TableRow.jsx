/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TableRow = ({ withdraw, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const date = new Date(withdraw.withdraw_time);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format if needed
  hours = hours % 12 || 12;

  const timeString = `${hours}:${minutes} ${amOrPm}`;

  const handlePaymentSuccess = async (id, email) => {
    // //console.log(id, email);
    const result = await axiosSecure.patch(`/user-coin-deducted/${email}`, {
      withdraw: withdraw.coin_to_withdraw,
    });
    // //console.log(result);
    if (result.data.modifiedCount > 0) {
      const result1 = await axiosSecure.delete(`/withdraw-delete/${id}`);
      //console.log(result1);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={withdraw.worker_image}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{withdraw.worker_name}</div>
            <div className="text-sm opacity-50">{withdraw.worker_email}</div>
          </div>
        </div>
      </td>
      <td>{withdraw.coin_to_withdraw}</td>
      <td>{withdraw.withdraw_amount}</td>
      <td>{withdraw.withdraw_number}</td>
      <td>{withdraw.payment_method}</td>
      <td>{timeString}</td>
      <th>
        <button
          onClick={() =>
            handlePaymentSuccess(withdraw._id, withdraw.worker_email)
          }
          className="btn btn-primary btn-xs"
        >
          Payment Success
        </button>
      </th>
    </tr>
  );
};

export default TableRow;
