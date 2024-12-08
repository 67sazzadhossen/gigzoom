import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  //fetch user info using logged in user
  // TODO:Do it using axios secure
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `https://gigzoom-server.vercel.app/user/${user?.email}`
      );
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
