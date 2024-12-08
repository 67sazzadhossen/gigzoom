import { Outlet } from "react-router-dom";
import Sidebar from "../Component/Sidebar/Sidebar";
import Footer from "../Component/Navbar/Footer";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Component/Loading";
import { CiBitcoin } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Notify from "./Notify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const DashboardLayout = () => {
  const { loading, user } = useContext(AuthContext);
  const aixosPublic = useAxiosPublic();

  const { data: notification, isLoading, refetch } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/notification/${user?.email}`);
      return data;
    },
  });
  const { data: count, isLoading: loadingCount } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await aixosPublic.get(
        `/notification-count/new/${user?.email}`
      );
      return data;
    },
  });

  const [data] = useUser();
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <Loading></Loading>;
  }

  if (isLoading || loadingCount) {
    return <Loading></Loading>;
  }

  return (
    <div className="md:flex">
      <div>
        <Sidebar></Sidebar>
      </div>

      <div className="flex-1 md:ml-64">
        <div className=" bg-base-200 py-2 flex gap-10 pr-5 items-center justify-end">
          <div>
            <div className="flex gap-5">
              <p className="flex items-center gap-1">
                <span>Coin: {data?.coins} </span>
                <CiBitcoin className="text-xl text-amber-500" />{" "}
              </p>
              <div className="avatar">
                <div className="w-11 rounded-full">
                  <img src={data?.image} />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <p>{data?.role}</p>
              <p>||</p>
              <p>{data?.name}</p>
            </div>
          </div>

          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="relative"
          >
            <svg
              className="w-8 h-8 text-teal-600 animate-wiggle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 21"
            >
              <path
                fill="none"
                stroke="currentColor"
                d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
              />
            </svg>
            <div className="px-1 bg-teal-500 rounded-full text-center text-white text-sm absolute -top-3 -end-2">
              {count.count}
              <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
            </div>
          </button>

          <dialog id="my_modal_2" className="modal">
            <div className="modal-box max-h-[50vh] overflow-y-auto">
              <p className="text-xl font-medium underline mb-2">
                Your Notification:
              </p>
              {!notification.length && (
                <p>You Have No Notification.Stay with us.</p>
              )}
              <div>
                {notification.map((notify) => (
                  <Notify
                    key={notify._id}
                    notify={notify}
                    refetch={refetch}
                  ></Notify>
                ))}
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* --------- */}
        </div>
        <div className="min-h-[660px]">
          <Outlet></Outlet>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
