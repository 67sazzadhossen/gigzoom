import useRole from "../hooks/useRole";
import AdminHome from "./Admin/AdminHome";
import TaskCreatorHome from "./TaskCreator/Home/TaskCreatorHome";
import WorkerHome from "./Worker/WorkerHome";

const DashboardHome = () => {
  const [role] = useRole();

  return (
    <div className="p-2">
      {role === "Worker" && <WorkerHome></WorkerHome>}
      {role === "Task Creator" && <TaskCreatorHome></TaskCreatorHome>}
      {role === "admin" && <AdminHome></AdminHome>}
    </div>
  );
};

export default DashboardHome;
