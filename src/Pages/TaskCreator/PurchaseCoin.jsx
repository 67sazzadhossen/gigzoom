import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Component/Loading";

const PurchaseCoin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coinsData, isLoading } = useQuery({
    queryKey: ["payment-offer"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payment-offer");
      return data;
    },
  });

  //console.log(coinsData);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container p-4 mx-auto sm:p-10">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold uppercase leading-tight">
            {" "}
            Purchase Coins
          </h1>
        </div>
        <div className=" flex gap-4 justify-center">
          {coinsData.map((data) => (
            <Link to={`/dashboard/payment/${data._id}`} key={data._id}>
              <button className="btn text-lg">
                <p className="font-semibold">{data.coins} COINS =</p>
                <p className=" font-bold">{data.dollars}$</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurchaseCoin;
