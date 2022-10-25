import React, { useEffect, useState, CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllPosts, orderPosts } from "../../../../redux/slices/post/ordenAndFilterActions";
import Select from "react-select";
export default function Order() {
  const [order, setOrder] = useState("default");
  const { filterType } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderPosts(filterType, order));
  }, [filterType, order]);
  const mts2Option = "Square meters";
  const yearOption = "Year";


  const GroupedOption = [
    {options:[{value:"default",label:"All"}],},
    {
      label: mts2Option,
      options: [
        { value: "small", label: "Smallest to" },
        { value: "large", label: "Largest to" },
      ],
    },
    {
      label: yearOption,
      options: [
        { value: "recent", label: "Recent to" },
        { value: "old", label: "Old to" },
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
