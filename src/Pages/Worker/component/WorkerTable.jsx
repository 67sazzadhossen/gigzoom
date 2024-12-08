import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loading from "../../../Component/Loading";


const WorkerTable = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: workerData, isLoading } = useQuery({
        queryKey: ['worker-table', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/worker-submission/${user?.email}`)
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Payable Amount</th>
                        <th>Creator Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        workerData.map((data,idx) => <tr key={data._id}>
                            <th>{idx + 1}</th>
                            <td>{data.task_title}</td>
                            <td>{data.payable_amount} coin</td>
                            <td>{data.creator_name}</td>
                            <td><span className="bg-green-200 px-2 py1{data.status}
                             rounded-xl font-medium">{data.status}</span></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default WorkerTable;