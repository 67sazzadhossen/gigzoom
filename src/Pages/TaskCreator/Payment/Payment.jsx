import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import Loading from "../../../Component/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { data: payment, isLoading } = useQuery({
    queryKey: ["single-pay"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`payment/${id}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  //console.log(payment);

  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm payment={payment}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
