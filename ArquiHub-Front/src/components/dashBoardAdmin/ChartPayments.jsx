import { useEffect } from "react";
import { getAllPayments } from "../../redux/slices/payment/paymentActions";
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

function ChartPayments () {
  const allPayments = useSelector(state => state.payment.allPayment)
  const dispatch = useDispatch()
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
      }},
      scales: {
        y: {
          min:0,
          max:10,
          beginAtZero: true,
          ticks: {
            stepSize: 1
        }
        }
      }
    };
    useEffect(() => {
      dispatch(getAllPayments())
    },[dispatch])
  
  const score = []        // aca tengo que pushear la cantidad de pagos por dia
  const labels = []        // aca tnego que tener todos los dias del mes
  
  for (let i = 1; i < 31; i++) {
      labels.push(i)
      score.push(0)    
  }
  //"2022-10-18T02:40:32.253Z"
//  allPayments.length && allPayments.map((pay) => {
//     labels.push(pay.createdAt.slice(8, -14) + `-10 $`)
//     })
  for (let i = 0; i < allPayments.length; i++) {
    for (let j = 0; j < labels.length; j++) {
      if (allPayments[i].createdAt.slice(8, -14) == labels[j]) {
        score[j]++
      }
    }
  }
//  for (let i = 0; i < score.length; i++) {
//     if (score[i] !== 0){
//       labels[i] =  ` $${score[i]*10}- ` + labels[i]
//     } 
//  }
  const data = {
        datasets: [
            {
              data: score,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(11, 18, 27)",
            }],
        labels,
    }
    return (
        <div className="w-96">
          <p className="font-bold my-2 ml-16">Payments October: ${allPayments.length} </p>
          <Bar data={data} options={options}/>
        </div>
      )
}

export default ChartPayments