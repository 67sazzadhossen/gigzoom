import coins from "../../assets/icons/icons8-coin-60.png";
import secure from "../../assets/icons/icons8-secure-payment-64.png";
import community from "../../assets/icons/icons8-community-50.png";
import customer_support from "../../assets/icons/icons8-customer-support-48.png";
import user_friendly from "../../assets/icons/icons8-user-friendly-64.png";
import track_progress from "../../assets/icons/icons8-progress-50.png";

const Features = () => {
  return (
    <section className="bg-base-200">
      <div className="py-8 px-4 mx-auto sm:py-16 sm:px-20">
        <div className=" mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Discover the Power of Our Platform
          </h2>
          <p className="text-gray-500  ">
            Explore the key features that make our platform the ultimate tool
            for managing tasks and earning rewards. Each feature is designed to
            enhance your experience, streamline your workflow, and ensure secure
            transactions. From earning coins by completing tasks to managing
            your to-do lists and connecting with a vibrant community, our
            platform offers everything you need to stay organized and motivated.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div className="">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={coins} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">
              Earn Coins by Completing Tasks
            </h3>
            <p className="text-gray-500 ">
              Engage in various tasks and earn coins as rewards. Our platform
              offers a wide range of tasks that you can complete to earn coins,
              which can later be redeemed for exciting rewards or used for other
              services within the platform.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={secure} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">Secure Payments</h3>
            <p className="text-gray-500 ">
              Enjoy peace of mind with our secure payment system. We prioritize
              your security and privacy, ensuring that all transactions are
              encrypted and protected against fraud.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={community} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">
              Connect with a Community
            </h3>
            <p className="text-gray-500 ">
              Join a vibrant community of like-minded individuals. Share tips,
              collaborate on tasks, and find support from other users who are
              also working towards their goals.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={customer_support} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">24/7 Customer Support</h3>
            <p className="text-gray-500 ">
              Get assistance whenever you need it with our 24/7 customer
              support. Our dedicated team is always ready to help you with any
              questions or issues you may encounter.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={user_friendly} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">User-Friendly Interface</h3>
            <p className="text-gray-500 ">
              Navigate our platform with ease, thanks to its user-friendly
              design. Our interface is crafted to be intuitive and
              straightforward, making it accessible for users of all tech skill
              levels.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
              <img src={track_progress} alt="" />
            </div>
            <h3 className="mb-2 text-xl font-bold ">Track Your Progress</h3>
            <p className="text-gray-500 ">
              Monitor your task completion and coin earnings with our detailed
              progress tracking. Stay motivated by seeing your achievements and
              setting new goals to reach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
