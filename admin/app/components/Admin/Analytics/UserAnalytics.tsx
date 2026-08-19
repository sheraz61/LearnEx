import { styles } from "@/app/styles/style";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { FC } from "react";
import Loader from "../../Loader/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];
  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  const chartData = {
    labels: analyticsData.map((item: any) => item.name),
    datasets: [
      {
        fill: true,
        label: 'Users Joined',
        data: analyticsData.map((item: any) => item.count),
        borderColor: '#7c5cff',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(124, 92, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(124, 92, 255, 0)');
          return gradient;
        },
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: '#7c5cff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7c5cff',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? 'rgba(17, 28, 67, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme === 'dark' ? '#fff' : '#000',
        bodyColor: theme === 'dark' ? '#cbd5e1' : '#475569',
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          }
        }
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: theme === 'dark' ? '#94a3b8' : '#64748b',
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
          },
          precision: 0,
        }
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`w-full ${!isDashboard ? "mt-0" : "mt-0 hero-glass dark:bg-[#111C43]/60 bg-white/80 border border-slate-200 dark:border-white/10 shadow-lg pb-5 rounded-xl"}`}>
          <div className={`${isDashboard ? "p-6 pb-2" : ''}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px] font-semibold text-slate-800 dark:text-white'} ${!isDashboard && 'px-5'} !text-start`}>
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data
              </p>
            )}
          </div>

          <div className={`w-full ${isDashboard ? 'h-[300px] px-4' : 'h-[400px] mt-6 px-10'}`}>
             <Line data={chartData} options={options} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;