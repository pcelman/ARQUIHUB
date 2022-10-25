import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewReports } from '../../../redux/slices/reviewReport/reviewReportActions'
import FilterReport from './filterReport/FilterReport'
import OrderReport from './orderReport/OrderReport'
import QueryReport from './queryReport/QueryReport'

export default function ReviewReportAdmin() {
  const {orderReviewReports} = useSelector(state=>state.reviewReport)

const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllReviewReports())
}, [dispatch])

  return (  
    
    <div>
     <QueryReport/>
     <OrderReport/>
     <FilterReport/>
      {orderReviewReports.map((e)=>{
      return(
        <div>
          <p>user thats report</p>
          <p>{e.user_id.nickname}</p>
          <p>review</p>
          <p>{e.review_id}</p>
          <p>user´s review</p>
          <p>{e.review_id.user_id.nickname}</p>
        </div>
      )
    }
    )}</div>
  )
}
