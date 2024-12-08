import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading";
import TableRow from "./TableRow";

const WithdrawReq = () => {
  const axiosSecure = useAxiosSecure();

  const { data: withdraw_request, isLoading, refetch } = useQuery({
    queryKey: ["withdraw-request"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-home-request");
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  //console.log(withdraw_request);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Worker Info</th>
            <th>Withdraw Coin</th>
            <th>Withdraw Amount</th>
            <th>Payment Number</th>
            <th>Payment System</th>
            <th>Withdraw Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {withdraw_request.map((withdraw) => (
            <TableRow
              key={withdraw._id}
              withdraw={withdraw}
              refetch={refetch}
            ></TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawReq;
