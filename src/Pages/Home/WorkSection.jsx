import registerIcon from "../../assets/icons/icons8-register-100.png"; // Add the correct path for your icon
import completeTasksIcon from "../../assets/icons/icons8-task-completed-60.png"; // Add the correct path for your icon
import earnRewardsIcon from "../../assets/icons/icons8-cash-in-hand-48.png"; // Add the correct path for your icon

const WorkSection = () => {
  return (
    <section id="how-it-works" className="py-16  text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-800">How It Works</h2>
      <div className="flex flex-wrap justify-center">
        <div className="max-w-xs m-4 p-6 bg-white rounded-lg shadow-lg">
          <img
            src={registerIcon}
            alt="Register Icon"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Register
          </h3>
          <p className="text-gray-600">
            Sign up and create your account to start your journey. Choose your
            role as a Worker or Task-Creator.
          </p>
        </div>
        <div className="max-w-xs m-4 p-6 bg-white rounded-lg shadow-lg">
          <img
            src={completeTasksIcon}
            alt="Complete Tasks Icon"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Complete Tasks
          </h3>
          <p className="text-gray-600">
            Browse through available tasks, follow the instructions, and submit
            your work for review.
          </p>
        </div>
        <div className="max-w-xs m-4 p-6 bg-white rounded-lg shadow-lg">
          <img
            src={earnRewardsIcon}
            alt="Earn Rewards Icon"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2 text-gray-800">
            Earn Rewards
          </h3>
          <p className="text-gray-600">
            Get approved for completed tasks and earn coins. Withdraw your
            earnings securely.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
