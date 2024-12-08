import CreatorState from "./CreatorState";
import AllTask from "./component/AllTask";


const TaskCreatorHome = () => {
    return (
        <div>
            {/* here is state component */}
            <CreatorState></CreatorState>

            {/* here is table component */}
            <AllTask></AllTask>


        </div>
    );
};

export default TaskCreatorHome;