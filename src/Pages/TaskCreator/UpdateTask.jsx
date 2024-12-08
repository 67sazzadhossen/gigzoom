import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const UpdateTask = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const id = useParams().id;

  const { data: data, refetch } = useQuery({
    queryKey: ["singleData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-task/${id}`);
      return data;
    },
  });

  const handleUpdataTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const submission_info = form.submission_info.value;
    //console.log(task_title, task_detail, submission_info);
    const updateData = {
      task_title,
      task_detail,
      submission_info,
    };
    const result = await axiosSecure.patch(
      `/my-task/${data._id}?email=${user?.email}`,
      updateData
    );
    if (result.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your task has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  return (
    <div className="px-2">
      <form
        onSubmit={handleUpdataTask}
        className="lg:max-w-5xl h-full mx-auto pt-10"
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="task_title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Title
            </label>
            <input
              defaultValue={data?.task_title}
              name="task_title"
              type="text"
              id="task_title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Task Title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="task_detail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Detail
            </label>
            <input
              defaultValue={data?.task_detail}
              name="task_detail"
              type="text"
              id="task_detail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Your Task Detail"
              required
            />
          </div>

          <div>
            <label
              htmlFor="submission_info"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Submission Info
            </label>
            <input
              defaultValue={data?.submission_info}
              name="submission_info"
              type="text"
              id="submission_info"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Task Submission Info"
              required
            />
          </div>
        </div>

        <input
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          value="Update Task"
        />
      </form>
    </div>
  );
};

export default UpdateTask;
