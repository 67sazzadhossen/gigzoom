import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  //fetch user info using logged in user
  // TODO:Do it using axios secure
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/${user?.email}`);
      return data;
    },
  });

  return [data, isLoading, refetch];
};

export default useUser;
