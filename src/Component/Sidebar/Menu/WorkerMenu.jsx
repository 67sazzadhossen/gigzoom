import { FaTasks } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { GoChecklist } from "react-icons/go";
import { GiTakeMyMoney } from "react-icons/gi";


const WorkerMenu = () => {
    return (
        <div>
            <MenuItem label={'Task List'} address={'/dashboard/task-list'} icon={FaTasks} />
            <MenuItem label={'My Submission'} address={'/dashboard/my-submission'} icon={GoChecklist} />
            <MenuItem label={'Withdrawals'} address={'/dashboard/withdrawals'} icon={GiTakeMyMoney} />
        </div>
    );
};

export default WorkerMenu;