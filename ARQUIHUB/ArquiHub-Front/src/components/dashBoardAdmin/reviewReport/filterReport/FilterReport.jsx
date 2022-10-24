import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterReviewReport } from '../../../../redux/slices/reviewReport/reviewReportActions';

export default function FilterReport() {
  const [filter, setFilter] = useState("default");
  const { queryReviewReports } = useSelector((state) => state.reviewReport);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterReviewReport( queryReviewReports, filter));
  }, [queryReviewReports, filter]);


  const GroupedOption = [
    {options:[{value:"default",label:"All"},{ value: "on hold", label: "on hold" },{ value: "accepted", label: "accepted" },,{ value: "rejected", label: "rejected" },],},
  ];

  const handleFilter = ({value}) => {
    setFilter(value);
  };

  return (
    <div>
      <Select
        placeholder="Filter..."
        options={GroupedOption}
        onChange={handleFilter}
        value={filter.value}
      />
    </div>
  );

}
