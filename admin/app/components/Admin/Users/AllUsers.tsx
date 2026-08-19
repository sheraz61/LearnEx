import React, { FC, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

  let rows: any[] = [];

  if (data) {
    if (isTeam) {
      rows = data.users.filter((item: any) => item.role === "admin");
    } else {
      rows = data.users;
    }
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      {isTeam && (
        <div className="w-full flex justify-end mb-6">
          <div
            className={`${styles.button} !w-[200px] !rounded-[10px] hero-glass dark:bg-[var(--hero-accent)]/80 hover:bg-[var(--hero-accent)] transition-colors !h-[40px] text-white`}
            onClick={() => setActive(!active)}
          >
            Add New Member
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C43]/60 backdrop-blur-md">
        <div className="w-full max-h-[75vh] overflow-auto custom-scrollbar">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead className="sticky top-0 bg-slate-100 dark:bg-[#1c2858] z-10 shadow-sm">
              <tr>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">ID</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Name</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Email</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Role</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Courses</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Joined At</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-center text-slate-700 dark:text-slate-300">Delete</th>
                <th className="p-4 font-Poppins font-semibold text-sm text-center text-slate-700 dark:text-slate-300">Email</th>
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
                  <td className="p-4 font-Poppins text-sm text-slate-800 dark:text-slate-200 font-medium">{row.name}</td>
                  <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400">{row.email}</td>
                  <td className="p-4 font-Poppins text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.role === 'admin' ? 'bg-[#45CBA0]/20 text-[#45CBA0]' : 'bg-blue-500/20 text-blue-500'}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="p-4 font-Poppins text-sm font-semibold text-slate-600 dark:text-slate-300">{row.courses.length}</td>
                  <td className="p-4 font-Poppins text-sm text-slate-500 dark:text-slate-400">{format(row.createdAt)}</td>
                  <td className="p-4 text-center">
                    <button 
                      className="inline-block p-2 rounded-full hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-colors"
                      onClick={() => {
                        setOpen(!open);
                        setUserId(row._id);
                      }}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <a href={`mailto:${row.email}`} className="inline-block p-2 rounded-full hover:bg-[var(--hero-accent)]/10 text-slate-500 hover:text-[var(--hero-accent)] transition-colors">
                      <AiOutlineMail size={20} />
                    </a>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 dark:text-slate-400 font-Poppins">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {active && (
        <Modal
          open={active}
          onClose={() => setActive(!active)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className={`${styles.title}`}>Add New Member</h1>
            <div className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className={`${styles.input}`}
              />
              <select
                name=""
                id=""
                className={`${styles.input} !mt-6`}
                onChange={(e: any) => setRole(e.target.value)}
              >
                <option
                  className="dark:bg-[#000] text-[#fff]"
                  value="admin"
                >
                  Admin
                </option>
                <option className="dark:bg-[#000] text-[#fff]" value="user">
                  User
                </option>
              </select>
              <br />
              <div
                className={`${styles.button} my-6 !h-[30px]`}
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </Box>
        </Modal>
      )}

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className={`${styles.title}`}>
              Are you sure you want to delete this user?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
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

export default AllUsers;
