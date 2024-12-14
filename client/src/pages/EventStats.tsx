import React, { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSearchParams } from "react-router-dom";
import { getParticipants } from "../api/eventApi.ts";
import { ChartOptions } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const EventStats: React.FC = () => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [search] = useSearchParams();
  const eventId = search.get("id");

  const fetchData = async () => {
    try {
      const response = await getParticipants(Number(eventId));
      setParticipants(response?.data?.participants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  // Calculate Stats
  const totalRegistered = participants.length;
  const totalAttended = participants.filter((p) => p.hasAttended).length;

  // Year Distribution with proper year labels
  const yearMapping: Record<string, string> = {
    "1": "1st Year",
    "2": "2nd Year",
    "3": "3rd Year",
    "4": "4th Year"
  };

  const yearDistribution = participants.reduce((acc: Record<string, number>, p) => {
    const year = p.academicInfo?.year?.toString() || "Unknown";
    const mappedYear = yearMapping[year] || year;
    acc[mappedYear] = (acc[mappedYear] || 0) + 1;
    return acc;
  }, {});

  const yearLabels = Object.keys(yearDistribution);
  const yearData = Object.values(yearDistribution);

  // Pie Chart Configuration
  const pieData = {
    labels: yearLabels,
    datasets: [
      {
        label: "Year-wise Participation",
        data: yearData,
        backgroundColor: [
          "rgba(134, 99, 255, 0.6)",
          "rgba(76, 162, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 255, 156, 0.6)"
        ],
        borderColor: [
          "rgba(134, 99, 255, 1)",
          "rgba(76, 162, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 255, 156, 1)"
        ],
        borderWidth: 1
      },
    ],
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Gradient Animations */}
      <div className="absolute z-0 inset-0 overflow-hidden animate-gradient-move">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-700/30 rounded-full filter blur-3xl animate-gradient-move" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-3xl animate-gradient-move delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full filter blur-3xl animate-gradient-move delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Event Stats Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          Event Statistics
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">Total Registered</h2>
            <p className="text-4xl font-bold text-purple-400">{totalRegistered}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">Total Attended</h2>
            <p className="text-4xl font-bold text-green-400">{totalAttended}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-300">Attendance Rate</h2>
            <p className="text-4xl font-bold text-blue-400">
              {totalRegistered > 0
                ? `${((totalAttended / totalRegistered) * 100).toFixed(1)}%`
                : '0%'
              }
            </p>
          </div>
        </div>

        {/* Year-wise Participation Chart */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-200">
            Year-wise Participation
          </h2>
          <div className="h-96 w-full md:w-2/3 lg:w-1/2 mx-auto">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
          <h2 className="text-2xl font-bold p-6 pb-0 text-gray-200">Participants</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  {["Name", "Roll Number", "Email", "Year", "Attendance"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => {
                  const rollNumber = p.academicInfo?.rollNo || "N/A";
                  const year = p.academicInfo?.year?.toString() || "Unknown";
                  const mappedYear = yearMapping[year] || year;
                  const hasAttended = p.hasAttended ? "Yes" : "No";

                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{p.user?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.academicInfo?.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.user?.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{p.academicInfo?.year}</td>
                      <td className={`px-6 py-4 whitespace-nowrap ${p.hasAttended ? 'text-green-400' : 'text-red-400'}`}>
                        {hasAttended}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStats;
