import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TaskDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const id = useParams().id;

  const { data: data } = useQuery({
    queryKey: ["singleData"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/single-task/${id}`);
      return data;
    },
  });

  let current_date = Date.now();

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submission_Details = form.submission_Details.value;
    //console.log(submission_Details);
    const submissionData = {
      task_id: data._id,
      task_title: data.task_title,
      task_detail: data.task_detail,
      task_img_url: data.task_image,
      payable_amount: data.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      worker_image: user?.photoURL,
      submission_details: submission_Details,
      creator_name: data.user.name,
      creator_email: data.user.email,
      creator_image: data.user.photo_url,
      current_date,
      status: "Pending",
    };

    //console.log(submissionData);
    const result = await axiosSecure.post("/worker-submission", submissionData);
    //console.log(result.data);
    if (result.data.insertedId) {
      const notification = {
        message: `you have message from ${user?.displayName} for completing ${data.task_title}`,
        status: "unread",
        toEmail: data.user.email,
        date: new Date(),
        time: Date.now(),
      };
      const notifi = await axiosSecure.post("/notification", notification);
      //console.log(notifi);
      //console.log(notification);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/my-submission");
    }
  };

  return (
    <div className="max-w-5xl border md:mx-auto overflow-hidden font-raleway p-2 mx-4 my-14 bg-white rounded-lg shadow-md mt-5">
      <img
        className=" w-full md:h-[500px]"
        src={data?.task_image}
        alt="Article"
      />

      <form onSubmit={handleSubmitTask}>
        <div className="p-6">
          <div className="space-y-1 ">
            <p className="text-lg font-medium text-blue-600 uppercase dark:text-blue-400">
              {data?.task_title}
            </p>
            <p className="text-xl font-medium  dark:text-blue-400">
              {data?.task_detail}
            </p>
            <p>Task Quantity: {data?.task_quantity}</p>
            <p>Payable Amount: {data?.payable_amount} coin</p>
            <p>
              Completion Date: {new Date(data?.deadline).toLocaleDateString()}
            </p>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Submission Info: {data?.submission_info}
            </p>
          </div>

          <div className="mt-5 h-36">
            <textarea
              name="submission_Details"
              required
              className="textarea border border-rose-400 border-opacity-40 bg-pink-50 w-full h-full textarea-bordered"
              placeholder="Submission Details"
            ></textarea>
          </div>

          <div className="flex  justify-between items-center">
            <div className="mt-4">
              <div className="flex gap-5 items-center">
                <div>
                  <img
                    className="object-cover w-14 h-14 rounded-full"
                    src={data?.user?.photo_url}
                    alt="Avatar"
                  />
                </div>
                <div>
                  <p>{data?.user?.name}</p>
                  <p>{data?.user?.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="inline-flex px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
