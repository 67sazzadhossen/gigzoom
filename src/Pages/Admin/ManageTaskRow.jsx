/* eslint-disable react/prop-types */

import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageTaskRow = ({ task, refetch }) => {
  const axiosPublic = useAxiosPublic();

  //console.log(task);
  const modalId = `modal_${task._id}`;

  const handleDeleteTask = () => {
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
        const data = await axiosPublic.delete(`/admin-task-delete/${task._id}`);
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

  return (
    <tr>
      <td>{task.task_title}</td>
      <td>{task.user.name}</td>
      <td>{task.task_quantity}</td>
      <td>{task.task_quantity * task.payable_amount}</td>
      <td>{task.task_quantity === 0 ? "false" : "true"}</td>
      <td onClick={() => document.getElementById(modalId).showModal()}>
        <FaRegEye className="text-xl text-green-700" />
        <dialog id={modalId} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Task Detail</h3>
            <p className="py-4">{task.task_detail}</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </td>
      <td onClick={() => handleDeleteTask(task._id)}>
        <MdDelete className="text-xl hover:text-rose-500 transition-all duration-200" />
      </td>
    </tr>
  );
};

export default ManageTaskRow;
