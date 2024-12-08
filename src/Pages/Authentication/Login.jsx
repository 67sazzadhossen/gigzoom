import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";

const Login = () => {
  const { signIn, loading, setLoading, signInWithGoogle } = useContext(
    AuthContext
  );
  const location = useLocation();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const from = location?.state || "/dashboard";
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        //console.log(res);
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        //console.log(err.message);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithGoogle();
      //console.log(response);
      navigate(from, { replace: true });
      const user = {
        email: response.user.email,
        name: response.user.displayName,
        image: response.user.photoURL,
        role: "Worker",
        coins: parseInt(10),
      };
      const res = await axios.put(
        "https://gigzoom-server.vercel.app/user",
        user
      );
      //console.log(res.data);
      //console.log(user);
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-20 items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSignIn}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div>
            <button
              disabled={loading}
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/sign-up"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
