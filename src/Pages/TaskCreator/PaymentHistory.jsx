import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";
import PaymentRow from "./PaymentRow";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ["success", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `all-success-payment/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  //console.log(paymentData);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Transaction ID</th>
              <th>Buy Coins</th>
              <th>Dollar Cost</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((data, idx) => (
              <PaymentRow key={data._id} data={data} idx={idx}></PaymentRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
