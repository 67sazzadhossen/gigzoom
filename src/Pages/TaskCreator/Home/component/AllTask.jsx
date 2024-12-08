import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Component/Loading";
import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";
import TaskRow from "./TaskRow";

const AllTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: allTaskSubmission, isLoading, refetch } = useQuery({
    queryKey: ["all-sub-task", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task-submission/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        {allTaskSubmission.length === 0 ? (
          <div className="text-lg font-bold md:text-6xl text-center h-96 flex flex-col justify-center">
            No Task To Review
          </div>
        ) : (
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Worker Details</th>
                  <th>Task Title</th>
                  <th>Payable Amout </th>
                  <th>Submission</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {allTaskSubmission.map((task) => (
                  <TaskRow
                    key={task._id}
                    task={task}
                    refetch={refetch}
                  ></TaskRow>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTask;
