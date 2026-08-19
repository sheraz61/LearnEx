import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import Loader from "../../Loader/Loader";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 0 ? "success" : "error"}
        thickness={4}
        style={{ color: value && value > 0 ? '#45CBA0' : '#ff4d4f' }}
      />
    </Box>
  );
};

const MetricCard = ({ title, value, percentage, icon: Icon }: any) => (
  <div className="w-full hero-glass dark:bg-[#111C43]/60 bg-white/80 rounded-xl shadow-lg border border-slate-200 dark:border-white/10 p-6 transition-transform hover:scale-[1.02] duration-300">
    <div className="flex items-center justify-between">
      <div>
        <div className="p-3 bg-[var(--hero-accent)]/10 rounded-lg inline-block mb-4">
          <Icon className="text-[var(--hero-accent)] text-3xl" />
        </div>
        <h5 className="font-Poppins text-slate-500 dark:text-slate-400 text-sm tracking-wide uppercase font-medium">
          {title}
        </h5>
        <h3 className="font-Poppins font-bold text-slate-800 dark:text-white text-3xl mt-1">
          {value}
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <CircularProgressWithLabel value={percentage > 0 ? 100 : 0} />
        <span className={`text-sm font-semibold mt-3 ${percentage > 0 ? 'text-[#45CBA0]' : 'text-red-500'}`}>
          {percentage > 0 ? "+" : ""}{percentage?.toFixed(2)}%
        </span>
      </div>
    </div>
  </div>
);

const DashboardWidgets: FC = () => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (!isLoading && !ordersLoading && data && ordersData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange = usersPreviousMonth !== 0
          ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100;
        const ordersPercentChange = ordersPreviousMonth !== 0
          ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

        setuserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrdersComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  if (isLoading || ordersLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen pb-10">
      
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <MetricCard 
          title="Sales Obtained" 
          value={ordersComparePercentage?.currentMonth || 0} 
          percentage={ordersComparePercentage?.percentChange || 0} 
          icon={BiBorderLeft} 
        />
        <MetricCard 
          title="New Users" 
          value={userComparePercentage?.currentMonth || 0} 
          percentage={userComparePercentage?.percentChange || 0} 
          icon={PiUsersFourLight} 
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* User Analytics Chart */}
        <div className="w-full">
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Orders Analytics Chart */}
        <div className="w-full">
          <OrdersAnalytics isDashboard={true} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex flex-col">
        <h5 className="text-xl font-semibold font-Poppins text-slate-800 dark:text-white mb-4">
          Recent Transactions
        </h5>
        <div className="w-full">
          <AllInvoices isDashboard={true} />
        </div>
      </div>

    </div>
  );
};

export default DashboardWidgets;
