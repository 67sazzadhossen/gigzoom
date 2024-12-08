import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import ManageTaskRow from "./ManageTaskRow";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();

  const { data: adminTask, isLoading, refetch } = useQuery({
    queryKey: ["admin-task"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-task");
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // //console.log(adminTask);
  return (
    <div className="my-14">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Task Title</th>
              <th>Creator Name</th>
              <th>Task Quantity</th>
              <th>Coin Needed</th>
              <th>Availability</th>
              <th>View Task</th>
              <th>Delete Task</th>
            </tr>
          </thead>
          <tbody>
            {adminTask.map((task) => (
              <ManageTaskRow
                key={task._id}
                task={task}
                refetch={refetch}
              ></ManageTaskRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTask;
