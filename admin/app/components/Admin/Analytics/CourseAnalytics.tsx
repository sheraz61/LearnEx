import React from "react";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];
  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  const chartData = {
    labels: analyticsData.map((item: any) => item.name),
    datasets: [
      {
        label: 'Courses Created',
        data: analyticsData.map((item: any) => item.count),
        backgroundColor: '#3faf82',
        borderRadius: 4,
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
        <div className="w-full mt-0 hero-glass dark:bg-[#111C43]/60 bg-white/80 border border-slate-200 dark:border-white/10 shadow-lg pb-5 rounded-xl">
          <div className="p-6 pb-2">
            <h1 className={`${styles.title} !text-[20px] font-semibold text-slate-800 dark:text-white !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label}`}>
              Last 12 months analytics data
            </p>
          </div>

          <div className="w-full h-[400px] mt-6 px-10">
             <Bar data={chartData} options={options} />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;