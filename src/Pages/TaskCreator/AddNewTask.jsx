import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddNewTask = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, refetch] = useUser();
  const navigate = useNavigate();
  // //console.log(data?.coins);

  const [deadline, setStartDate] = useState(new Date());

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const task_quantity = parseInt(form.task_quantity.value);
    const payable_amount = parseInt(form.payable_amount.value);
    if (task_quantity * payable_amount > data?.coins) {
      return Swal.fire({
        position: "top-end",
        icon: "info",
        title: "Not available Coin. Purchase Coin",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const submission_info = form.submission_info.value;
    const task_image = form.task_image.files[0];

    const formData = new FormData();
    formData.append("image", task_image);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const task = {
        task_title,
        task_detail,
        task_quantity,
        payable_amount,
        submission_info,
        task_image: data.data.display_url,
        deadline,
        user: {
          name: user?.displayName,
          email: user?.email,
          photo_url: user?.photoURL,
          post_time: Date.now(),
        },
      };
      // const result = await axios.post('https://gigzoom-server.vercel.app/add-task', task)
      const result = await axiosSecure.post("/add-task", task);
      if (result.data.insertedId) {
        // const result = await axios.patch(`https://gigzoom-server.vercel.app/update-coin/${user?.email}`, { value: task_quantity * payable_amount })
        const result = await axiosSecure.patch(
          `/decrease-coin/${user?.email}`,
          { value: task_quantity * payable_amount }
        );
        //console.log(result);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your task has been saved in db",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        navigate("/dashboard/my-task");
      }
      // //console.log(result.data.insertedId);
    } catch (error) {
      //console.log(error);
    }

    // //console.log(task_title, task_detail, task_quantity, payable_amount, submission_info, task_image);
  };

  return (
    <div className="px-2">
      <form
        onSubmit={handleTaskSubmit}
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
              htmlFor="task_quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Quantity
            </label>
            <input
              name="task_quantity"
              type="text"
              id="task_quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Task Quantity"
              required
            />
          </div>
          <div>
            <label
              htmlFor="payable_amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Payable Amount
            </label>
            <input
              name="payable_amount"
              type="number"
              id="payable_amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Payable Amount"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
              name="submission_info"
              type="text"
              id="submission_info"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Task Submission Info"
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="task_image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Image
            </label>
            <input
              name="task_image"
              type="file"
              id="task_image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-4 ">
            <label htmlFor="deadline" className="block font-semibold mb-1">
              Deadline:
            </label>
            <DatePicker
              className="border p-2 rounded-md"
              selected={deadline}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
        <input
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          value="Add Task"
        />
      </form>
    </div>
  );
};

export default AddNewTask;
