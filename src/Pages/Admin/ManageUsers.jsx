import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import UserDataRow from "./UserDataRow";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // //console.log(users);

  return (
    <div className="my-14 px-2">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Info</th>
              <th>User Role</th>
              <th>Coin</th>
              <th>Delete</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserDataRow
                key={user._id}
                refetch={refetch}
                user={user}
              ></UserDataRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
