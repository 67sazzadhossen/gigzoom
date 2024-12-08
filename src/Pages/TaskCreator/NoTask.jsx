
import { Link } from 'react-router-dom';
import image from '../../assets/images/ab0a2fad-2f7d-4c66-8fd2-d79a8bb19374.png'
const NoTask = () => {
    return (
        <section className="bg-white dark:bg-gray-900">

            <div className="container px-6 py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">You Have No Task Post</h1>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">Thank you for visiting our MY Task  Page. Currently, there are no task post  You have added. If you want to add a task please click the Add A Task Button </p>

                            <Link to={'/dashboard/add-task'}> <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Add A Task</button></Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full h-full lg:max-w-3xl"
                            src={image}
                            alt="Catalogue-pana.svg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoTask;