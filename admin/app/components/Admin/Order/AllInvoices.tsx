import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { AiOutlineMail } from "react-icons/ai";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (data && usersData && coursesData) {
      const temp = data.orders.map((item: any) => {
        const user = usersData.users.find((u: any) => u._id === item.userId);
        const course = coursesData.courses.find((c: any) => c._id === item.courseId);
        return {
          id: item._id,
          userName: user?.name || "Unknown",
          userEmail: user?.email || "N/A",
          title: course?.name || "Unknown Course",
          price: course?.price ? `$${course.price}` : "Free",
          created_at: format(item.createdAt),
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  if (isLoading) return <Loader />;

  return (
    <div className={`w-full overflow-hidden rounded-xl shadow-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C43]/60 backdrop-blur-md ${!isDashboard ? "mt-[50px] max-h-[85vh]" : "h-full"}`}>
      <div className="w-full h-full overflow-auto custom-scrollbar">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="sticky top-0 bg-slate-100 dark:bg-[#1c2858] z-10 shadow-sm">
            <tr>
              <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">ID</th>
              <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Name</th>
              {!isDashboard && <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Email</th>}
              {!isDashboard && <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Course</th>}
              <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Price</th>
              {isDashboard ? (
                <th className="p-4 font-Poppins font-semibold text-sm text-slate-700 dark:text-slate-300">Date</th>
              ) : (
                <th className="p-4 font-Poppins font-semibold text-sm text-center text-slate-700 dark:text-slate-300">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {orderData.map((row, index) => (
              <tr 
                key={row.id} 
                className={`
                  border-b border-slate-200/50 dark:border-white/5 transition-colors
                  hover:bg-slate-50 dark:hover:bg-white/5
                  ${index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30 dark:bg-black/10'}
                `}
              >
                <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400 max-w-[100px] truncate">{row.id}</td>
                <td className="p-4 font-Poppins text-sm text-slate-800 dark:text-slate-200 font-medium">{row.userName}</td>
                {!isDashboard && <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400">{row.userEmail}</td>}
                {!isDashboard && <td className="p-4 font-Poppins text-sm text-slate-600 dark:text-slate-400 truncate max-w-[200px]">{row.title}</td>}
                <td className="p-4 font-Poppins text-sm font-semibold text-[var(--hero-accent-2)]">{row.price}</td>
                {isDashboard ? (
                  <td className="p-4 font-Poppins text-sm text-slate-500 dark:text-slate-400">{row.created_at}</td>
                ) : (
                  <td className="p-4 text-center">
                    <a href={`mailto:${row.userEmail}`} className="inline-block p-2 rounded-full hover:bg-[var(--hero-accent)]/10 text-slate-500 hover:text-[var(--hero-accent)] transition-colors">
                      <AiOutlineMail size={20} />
                    </a>
                  </td>
                )}
              </tr>
            ))}
            {orderData.length === 0 && (
              <tr>
                <td colSpan={isDashboard ? 4 : 6} className="p-8 text-center text-slate-500 dark:text-slate-400 font-Poppins">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllInvoices;