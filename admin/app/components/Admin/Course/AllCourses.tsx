import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  let rows: any[] = [];
  if (data) {
    rows = data.courses;
  }

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full mt-4">
      <div className="w-full overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C43]/60 backdrop-blur-md">
        <div className="w-full max-h-[75vh] overflow-auto custom-scrollbar">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 dark:bg-[#1c2858] z-10 shadow-sm">
              <tr>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">ID</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Course Title</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Ratings</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Purchased</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Created At</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-center text-slate-700 dark:text-slate-300">Edit</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-center text-slate-700 dark:text-slate-300">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr 
                  key={row._id} 
                  className={`
                    border-b border-slate-200/50 dark:border-white/5 transition-colors
                    hover:bg-slate-50 dark:hover:bg-white/5
                    ${index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30 dark:bg-black/10'}
                  `}
                >
                  <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400 max-w-[100px] truncate">{row._id}</td>
                  <td className="p-4 font-Poppins text-sm text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px]">{row.name}</td>
                  <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400">{row.ratings}</td>
                  <td className="p-4 font-Poppins text-sm font-semibold text-slate-600 dark:text-slate-300">{row.purchased}</td>
                  <td className="p-4 font-Poppins text-sm text-slate-500 dark:text-slate-400">{format(row.createdAt)}</td>
                  <td className="p-4 text-center">
                    <Link href={`/admin/edit-course/${row._id}`} className="inline-block p-2 rounded-full hover:bg-[var(--hero-accent)]/10 text-slate-500 hover:text-[var(--hero-accent)] transition-colors">
                      <FiEdit2 size={20} />
                    </Link>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      className="inline-block p-2 rounded-full hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-colors"
                      onClick={() => {
                        setOpen(!open);
                        setCourseId(row._id);
                      }}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 dark:text-slate-400 font-Poppins">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className={`${styles.title}`}>
              Are you sure you want to delete this course?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                onClick={() => setOpen(!open)}
              >
                Cancel
              </div>
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllCourses;
