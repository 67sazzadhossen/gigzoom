import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";
import NoTask from "./NoTask";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import useUser from "../../hooks/useUser";

const MyTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // const [data, isLoading, refetch] = useUser()

  const { data: tableData, isLoading, refetch } = useQuery({
    queryKey: ["my-task", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-task/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (tableData.length === 0) {
    return <NoTask></NoTask>;
  }

  const handleDeleteTask = (id, task_quantity, payable_amount) => {
    //console.log(id, task_quantity, payable_amount);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.delete(`/all-task/${id}`);
        if (result.data.deletedCount > 0) {
          const increaseResult = await axiosSecure.patch(
            `/increase-coin/${user?.email}`,
            { value: task_quantity * payable_amount }
          );
          //console.log(increaseResult);
          refetch();
          queryClient.invalidateQueries(["data"]);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="text-lg">
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Task Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Task Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Payable Amount
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Delete
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data) => (
                  <tr key={data._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {data.task_title}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {data.task_quantity}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {data.payable_amount} coin
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() =>
                          handleDeleteTask(
                            data._id,
                            data.task_quantity,
                            data.payable_amount
                          )
                        }
                        className="btn btn-circle hover:text-rose-500 transition-all duration-200"
                      >
                        <MdDelete className="text-xl " />
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <Link
                        to={`/dashboard/update-task/${data._id}`}
                        className="btn btn-circle hover:text-green-500 transition-all duration-200"
                      >
                        <FiEdit className="text-xl " />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
