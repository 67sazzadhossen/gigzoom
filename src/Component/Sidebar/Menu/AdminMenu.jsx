
import { FaUsersCog } from 'react-icons/fa';
import { RiFileEditFill } from 'react-icons/ri';
import MenuItem from './MenuItem';

const AdminMenu = () => {
    return (
        <div>
            <MenuItem label={'Manage Users'} address={'/dashboard/manage-users'} icon={FaUsersCog} />
            <MenuItem label={'Manage Task'} address={'/dashboard/manage-task'} icon={RiFileEditFill} />
        </div>
    );
};

export default AdminMenu;