import { useEffect } from "react";
import { getAllUsers } from "../../redux/slices/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartUsers() {
  const users = useSelector((state) => state.user.allUsers);
  const options = {
    fill: false, //pinta de color por debajo de las lineas
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        beginAtZero: false,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };
  const dispatch = useDispatch();
  let active = 0;
  let inactive = 0;
  let banned = 0;
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  users.map((user) => {
    user.status === "active" && active++;
    user.status === "inactive" && inactive++;
    user.status === "banned" && banned++;
  });

  const score = [users.length, active, inactive, banned];
  const labels = [
    `Total: ${users.length}`,
    `Active: ${active}`,
    `Inactive: ${inactive}`,
    `Banned: ${banned}`,
  ];

  const data = {
    datasets: [
      {
        label: "Users",
        data: score,
        // tension: 0.1,
        borderColor: "rgb(75, 192, 192)",
        // pointRadius: 6,
        pointBackgroundColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
      },
    ],
    labels,
  };
  return (
    <div className="">
      <div className="w-96">
        <p className="font-bold mt-2 mb-7 ml-16">Users</p>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartUsers;
