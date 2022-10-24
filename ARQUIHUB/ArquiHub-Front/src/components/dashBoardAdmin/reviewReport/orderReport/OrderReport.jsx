import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { orderReviewReport } from '../../../../redux/slices/reviewReport/reviewReportActions';

export default function OrderReport() {

  const [order, setOrder] = useState("default");
  const { filterReviewReports } = useSelector((state) => state.reviewReport);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderReviewReport(filterReviewReports, order));
  }, [filterReviewReports, order]);
  const alphabetical = "alphabetical";


  const GroupedOption = [
    {options:[{value:"default",label:"All"}],},
    {
      label: alphabetical,
      options: [
        { value: "Az", label: "a to z" },
        { value: "Za", label: "z to a" },
      ],
    },
  ];

  const handleOrder = ({value}) => {
    setOrder(value);
  };

  return (
    <div>
      <Select
        placeholder="Order..."
        options={GroupedOption}
        onChange={handleOrder}
        value={order.value}
      />
    </div>
  );

}
