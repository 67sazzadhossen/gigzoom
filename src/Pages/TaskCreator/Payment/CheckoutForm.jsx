/* eslint-disable react/prop-types */
// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// import '../styles/common.css';
import "./Common.css";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ payment }) => {
  // //console.log(payment.dollars);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  const [cardError, setCardError] = useState();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    //fetch client secret:/create-payment-intent

    if (payment?.dollars && payment?.dollars > 0) {
      getClientSecret({ price: payment?.dollars });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment?.dollars]);

  //get client secret

  const getClientSecret = async (price) => {
    const { data } = await axiosSecure.post("/create-payment-intent", price);
    //console.log("client secret from server", data);
    setClientSecret(data.clientSecret);
  };

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      //console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      //console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    //confirm payment
    const {
      error: confirmError,
      paymentIntent,
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      },
    });

    if (confirmError) {
      //console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      //console.log(paymentIntent);
      //no.1 create payment info obj
      const paymentInfo = {
        ...payment,
        paymentId: payment._id,
        transactionId: paymentIntent.id,
        email: user?.email,
        date: new Date(),
        time: Date.now(),
      };
      delete paymentInfo._id;
      //console.log(paymentInfo);
      try {
        //no.2 save payment info in booking collection db
        const res = await axiosSecure.patch(
          `/payment-success/coin-update/${user?.email}`,
          { coins: payment.coins }
        );
        //console.log(res.data.modifiedCount);
        if (res.data.modifiedCount) {
          const res1 = await axiosSecure.post("/confirm-payment", paymentInfo);
          queryClient.invalidateQueries(["data"]);
          navigate("/dashboard/payment-history");
          //console.log(res1);
        }
      } catch (error) {
        //console.log(error);
      }
    }

    setProcessing(false);
  };

  return (
    <>
      <form className="md:ml-2" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
            <ImSpinner9 size={24} className="animate-spin m-auto" />
          ) : (
            `Pay ${payment.dollars}$`
          )}
        </button>
      </form>
      {cardError && <p className="text-red-500 mt-2 ml-1">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
