import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loading from "../../../Component/Loading";

const CreatorState = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line no-unused-vars
  const { data: state, isLoading, refetch } = useQuery({
    queryKey: ["task-creator-home", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/task-creator-state/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  //   //console.log(state);

  return (
    <div className=" bg-base-200 rounded-lg flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium  truncate text-gray-400">
                  Available coins
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">
                  {state.coins}
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium  truncate text-gray-400">
                  Pending Task
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">
                  {state.pendingTask}
                </dd>
              </dl>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dl>
                <dt className="text-sm leading-5 font-medium  truncate text-gray-400">
                  {" "}
                  Total Payment
                </dt>
                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">
                  {state.total}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorState;
