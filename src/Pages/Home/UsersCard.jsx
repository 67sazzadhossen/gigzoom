import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Component/Loading";

const UsersCard = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topUsers, isLoading } = useQuery({
    queryKey: ["top-user-coin"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/users-coin");
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  //   //console.log(topUsers);
  return (
    <div className="bg-base-200 py-16">
      <h3 className="text-3xl font-bold text-center  underline">
        Our Top Earners
      </h3>
      <div className="container mx-auto py-6  grid grid-cols-1 px-4 md:grid-cols-2 gap-8 lg:grid-cols-3">
        {topUsers.map((user) => (
          <div
            key={user?._id}
            className="w-full py-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={user?.image}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user?.name}
              </h5>
              <div className="font-medium">
                <p>Available Coin: {user?.coins}</p>
                <p>Task Completion: 23</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersCard;
