import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Component/Loading";


const AdminStat = () => {
    const axiosSecure = useAxiosSecure()

    const { data: adminStat,isLoading } = useQuery({
        queryKey: ['admin-state'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin/state')
            return data
        }
    })
    if (isLoading) {
        return<Loading></Loading>
    }
    return (
        <div className="bg-gray-200  flex justify-center items-center">

            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:py-4 lg:px-8">

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-4">
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium  truncate text-gray-400">Total Users</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">{adminStat.totalUser}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium  truncate text-gray-400">Total Coin</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">{adminStat.totalCoin}
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium  truncate text-gray-400"> Total Payments
                                </dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold  text-indigo-400">{adminStat.totalPay}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStat;