import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Loading from "../../Component/Loading";

const WorkerSubmission = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: submissionData, isLoading } = useQuery({
    queryKey: ["submission-data", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/work-submission/${user?.email}`);
      return data;
    },
  });
  //console.log(submissionData);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Task Creator</th>
            <th>Task Title</th>
            <th>Task Detail</th>
            <th>Submission Details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {submissionData.map((data) => (
            <tr key={data._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={data.creator_image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{data.creator_name}</div>
                    <div className="text-sm opacity-50">
                      {data.creator_email}
                    </div>
                  </div>
                </div>
              </td>
              <td>{data.task_title}</td>
              <td title={data.task_detail}>
                {" "}
                {data.task_detail.length > 50
                  ? data.task_detail.slice(0, 20) + "...."
                  : data.task_detail}
              </td>
              <td title={data.submission_details}>
                {" "}
                {data.submission_details.length > 20
                  ? data.submission_details.slice(0, 20) + "...."
                  : data.submission_details}
              </td>
              <th>{data.status}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerSubmission;
