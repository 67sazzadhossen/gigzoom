/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  // modal handler
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/user/role/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      // //console.log(data);
      Swal.fire("User Role Updated Successfully");
      setIsOpen(false);
    },
  });

  const handleDeleteUser = (id) => {
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
        const data = await axiosSecure.delete(`/user/delete/${id}`);
        if (data.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const modalHandler = async (selected) => {
    // //console.log('user role updated', selected);
    const user = {
      role: selected,
    };
    try {
      await mutateAsync(user);
    } catch (error) {
      // //console.log(error);
    }
  };

  return (
    <tr>
      <th className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img
              referrerPolicy="no-referrer"
              src={user.image}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        <div>
          <div className="font-bold"> {user.name}</div>
          <div className="text-sm opacity-50">{user.email}</div>
        </div>
      </th>
      <td className="">
        <span className="py-1 px-2 font-medium bg-green-200 rounded-xl">
          {" "}
          {user.role}
        </span>
      </td>
      <td className="font-medium">{user.coins}</td>
      <td>
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="btn hover:text-rose-400 transition-all duration-300 btn-circle"
        >
          <MdDelete className="text-xl" />
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        ></UpdateUserModal>
      </td>
    </tr>
  );
};

export default UserDataRow;
