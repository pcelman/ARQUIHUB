import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQueryReviewReport } from '../../../../redux/slices/reviewReport/reviewReportActions';

export default function QueryReport() {
const dispatch = useDispatch();
const {allReviewReports} = useSelector(state=>state.reviewReport)
const [query, setQuery] = useState("") 
  const handleChange = (e)=>{
      setQuery(e.target.value)
      dispatch(getQueryReviewReport(e.target.value))
  } 
  return (
    <div>QueryReport
      <input value={query} type="text" onChange={handleChange}/>
    </div>
  )
}
