import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";

const Register = () => {
  const {
    createUser,
    signInWithGoogle,
    loading,
    setUser,
    setLoading,
    updateUserProfile,
  } = useContext(AuthContext);
  const location = useLocation();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const from = location?.state || "/dashboard";

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    let coins = 0;
    if (role === "Worker") {
      coins = 10;
    }
    if (role === "Task Creator") {
      coins = 50;
    }
    //console.log(coins);
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      // 1.upload image and get image url:DONE
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      //console.log(data.data.display_url);

      // 2.User Registration:
      const result = await createUser(email, password);
      //console.log(result);

      //3.Save user name and photo in firebase

      await updateUserProfile(name, data.data.display_url);
      setUser({
        ...result?.user,
        photoURL: data.data.display_url,
        displayName: name,
      });
      const user = {
        email: email,
        name: name,
        role: role,
        image: data.data.display_url,
        coins: parseInt(coins),
      };

      const res = await axios.put(
        "https://gigzoom-server.vercel.app/user",
        user
      );
      navigate(from, { replace: true });
      //console.log(res.data);
    } catch (error) {
      //console.log(error.message);
      //console.log(error);
      setError(error.message);

      setLoading(false);
    }
  };

  //handle google sign in
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithGoogle();
      //console.log(response);
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
      setError("");
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleRegister}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
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
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            {/* select worker / task provider */}
            <select
              name="role"
              required
              className="select select-bordered w-full max-w-xs"
              defaultValue=""
            >
              <option disabled value="">
                Select Role
              </option>
              <option value="Worker">Worker</option>
              <option value="Task Creator">Task Creator</option>
            </select>
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
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        {/* -------- */}
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        {/* --------- */}

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
