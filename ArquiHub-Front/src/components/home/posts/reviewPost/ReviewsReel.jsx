import {
  faEllipsisVertical,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReview, deleteReview,updateReview} from "../../../../redux/slices/review/reviewActions";
import { getPost } from "../../../../redux/slices/post/postActions";
import { createReviewReport, deleteReviewReport } from "../../../../redux/slices/reviewReport/reviewReportActions";
import { changeShowSingIn } from "../../../../redux/slices/header/headerActions";
import {CreateReviewValidation} from "./createReview/CreateReviewValidation";
import  AvatarUser  from "../../../avatarUser/AvatarUser"

export default function ReviewsReel() {
  const { review } = useSelector((state) => state.review);
  const { response } = useSelector((state) => state.review);
  const {modalSignIn} = useSelector((state)=>state.header);
  const responseReport = useSelector((state) => state.reviewReport.response);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [report, setReport] = useState("");
  const [modify, setModify] = useState("");
  const copyReview = [...review];
  const reviewR = copyReview.reverse();
  const [page, setPage] = useState(1);
  const indexLastCard = 3 * page;
  const newsPaginado = reviewR.slice(0, indexLastCard);
  const [error, setError] = useState("second")
  const [formReviews, setformReviews] = useState({
    value: 0,
    comment: "",
  });

  const [hover, setHover] = useState(null);
  function paginado() {
    setPage(page + 1);
  }

  const getDate = (date) => {
    const format = date.createdAt
      .split("T", 1)[0]
      .split("-")
      .reverse()
      .join("/");
    return format;
  };

  const openReport = (i) => {
    setReport(i);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReview(id, "post"));
  }, [responseReport]);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getReview(id, "post"));
  }, [dispatch, response]);

  const handleUnReport = (e) => {
    dispatch(deleteReviewReport(e._id));
    setReport("");
  };

  const handleReport = (e) => {
    dispatch(createReviewReport({ user_id: user._id, review_id: e }));
    setReport("");
  };
  
  const handleDelete = (e) => {
    dispatch(deleteReview(e));
    setReport("");
  };

  const handleChange = (e) => {
    setformReviews({ ...formReviews, [e.target.name]: e.target.value });
  };
  const handleModify = (e) => {
    setformReviews({value : e.value, comment: e.comment})
    setModify(e._id);
    setReport("");
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    setError(CreateReviewValidation(formReviews));
    const errors = CreateReviewValidation(formReviews);
    if (Object.keys(errors).length === 0) {
      dispatch(updateReview(modify,formReviews));
      setModify("")
    }
  }
  const toggleSignIn = (e) => {
    e.preventDefault();
    dispatch(changeShowSingIn(!modalSignIn));
  };
  if (review.length) {
    return (
      <div className="overflow-y-hidden">
        {newsPaginado.map((e, index) => {
          return (
            <div
              key={index}
              className={`rounded-md  ${modify === e._id ? "bg-white mx-1 p-2 rounded-md shadow-lg lg:p-4" : "bg-gray-50"} shadow-md p-2 my-4 pt-4 flex flex-col gap-1 overflow-y-hidden xl:p-4`}
            >
              <div className="w-full flex items-center justify-between">
                <div className=" flex items-center gap-3">
                  <AvatarUser className="w-8 h-8 lg:w-10 lg:h-10" img={e.user_id.avatar}/>
                  <p>{e.user_id.nickname}</p>
                </div>

                {modify!==e._id? <div
                  onClick={(e)=>user._id ? openReport(index): toggleSignIn(e)}
                  className="text-gray-500 w-8 h-8 flex justify-center items-center cursor-pointer rounded-full lg:hover:bg-gray-200 lg:text-xl"
                ><FontAwesomeIcon icon={faEllipsisVertical} />
                </div>:<></>}
                  
                {report === index ? 
                  (
                    <div
                      className="absolute z-40 w-3/5 right-0 mt-20 mx-6 rounded-lg
                    sm:w-2/5
                    md:mx-10 md:w-2/6
                    lg:mx-16 lg:w-1/4
                    xl:mx-32 xl:w-2/12
                    2xl:mx-64 2xl:w-2/12
                    "
                    >
                      <div className="w-full bg-white text-base p-2 shadow-md rounded-lg text-black ">
                        {user && user._id !== e.user_id._id ? <p
                          onClick={() =>{ !e.reports.find((r) => r.user_id == user._id && r.review_id == e._id)?handleReport(e._id):handleUnReport(e.reports.find((r) => r.user_id == user._id && r.review_id == e._id))}}
                          className="p-1 pl-2 cursor-pointer hover:text-gray-400"
                        >
                          {!e.reports.find((r) => r.user_id == user._id && r.review_id == e._id)? "Flag as inappropriate": "Cancel report"}
                        </p>:<div> 
                        <p
                          onClick={()=>handleModify(e)}
                          className="p-1 pl-2 cursor-pointer hover:text-gray-400"
                        >
                          Modify comment
                        </p><p
                          onClick={()=>handleDelete(e._id)}
                          className="p-1 pl-2 cursor-pointer hover:text-gray-400"
                        >
                          Delete comment
                        </p></div>
                       }
                      </div>
                    </div>
                  ) :<></>}
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  {modify=== e._id?[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  className="hidden"
                  type="radio"
                  value={formReviews.value}
                  onClick={() =>
                    handleChange({
                      target: { value: ratingValue, name: "value" },
                    })
                  }
                />
                <FontAwesomeIcon
                  className={`text-gray-800 text-base`}
                  icon={
                    ratingValue <= (formReviews.value || hover)
                      ? solid
                      : regular
                  }
                  onMouseOver={() => setHover(ratingValue)}
                  onMouseOut={() => setHover(null)}
                />
              </label>
            );
          }):[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <FontAwesomeIcon
                          className="text-gray-800 text-xs"
                          icon={ratingValue <= e.value ? solid : regular}
                        />
                      </label>
                    );
                  })}
                </div>
                <p className="text-sm text-gray-500">{getDate(e)}</p>
              </div>
              { modify=== e._id
                ?<>
                  <input
                  className={` bg-white border-b-2 border-gray-600 w-full py-1.5 px-2 focus:outline-none
                  lg:${formReviews.comment && "w-3/4"}
                  ${error.comment && "border-2 focus:border-danger border-danger"} `}
                  type="text"
                  onChange={(e) => handleChange(e)}
                  name="comment"
                  value={formReviews.comment}
                  placeholder="Add your review..."
                  />
                  <div className="mt-2 flex flex-col md:flex-row gap-3">
                  <button
                    className={`w-full p-1.5 bg-gray-800 text-gray-100 flex justify-center items-center gap-4
                    md:w-1/4 `}
                    onClick={handleSubmit}
                  >
                  <p>Send</p>
                </button>
                <button
                  className={`w-full p-1.5 bg-danger text-gray-100 flex justify-center items-center gap-4
                  md:w-1/4 `}
                  onClick={()=>setModify("")}
                >
                  <p>Cancel</p>
                  </button>
                </div>
                </>
                :<p>{e.comment} </p>}
            </div>
          );
        })}
        {newsPaginado.length !== review.length ? (
          <div
            className=" text-base my-9 font-semibold flex flex-row-reverse cursor-pointer"
            onClick={(e) => paginado(e)}
          >
            See more...
          </div>
        ) : (
          <></>
        )}
        {report !== "" && (
          <div
            onClick={() => setReport("")}
            className="overflow-y-hidden fixed z-20 top-0 left-0 w-screen h-screen"
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full text-center p-12">
        <p className="text-gray-500 font-medium">
          {" "}
          Be the first to leave a comment!
        </p>
      </div>
    );
  }
}
