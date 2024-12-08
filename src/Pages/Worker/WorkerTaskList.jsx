import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Component/Loading";
import TaskListComponent from "./TaskListComponent";
import { useState } from "react";

import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const WorkerTaskList = () => {
  const axiosSecure = useAxiosSecure();

  const [itemsPerPage, setItemPerPage] = useState(10); //new
  const [currentPage, setCurrentPage] = useState(0);

  const { data: allTask, isLoading } = useQuery({
    queryKey: ["all-task", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/all-task?page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  // new
  const { data: taskCount, isLoading: countLoading } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/taskCount`);
      return data;
    },
  });

  if (isLoading || countLoading) {
    //new
    return <Loading></Loading>;
  }

  // -------------
  // const itemsPerPage = 10;
  const numberOfPages = Math.ceil(taskCount?.count / itemsPerPage);
  //console.log(numberOfPages, 'hello world');

  const pages = [...Array(numberOfPages).keys()];

  const handleItemPerPage = (e) => {
    const value = parseInt(e.target.value);
    setItemPerPage(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // ---------

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 px-2 md:px-10 my-14">
        {allTask.map((task) => (
          <TaskListComponent key={task._id} task={task}></TaskListComponent>
        ))}
      </div>
      <div className="flex justify-center my-5 gap-5">
        <button onClick={handlePrevPage}>
          <GrLinkPrevious></GrLinkPrevious>
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`btn btn-primary ${
              currentPage === page ? "bg-orange-400 text-black" : undefined
            }`}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage}>
          <GrLinkNext></GrLinkNext>
        </button>
        <select onChange={handleItemPerPage} value={itemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default WorkerTaskList;
