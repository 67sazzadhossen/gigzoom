import { MdAddTask, MdOutlineWorkHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
import { BiTask } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";


const TaskCreator = () => {
    return (
        <div>
            <MenuItem label={'Add New Tasks'} address={'/dashboard/add-task'} icon={MdAddTask} />
            <MenuItem label={'My Tasks'} address={'/dashboard/my-task'} icon={BiTask} />
            <MenuItem label={'Purchase Coin'} address={'/dashboard/purchase-coin'} icon={FaSackDollar} />
            <MenuItem label={'Payment history'} address={'/dashboard/payment-history'} icon={MdOutlineWorkHistory} />
        </div>
    );
};

export default TaskCreator;