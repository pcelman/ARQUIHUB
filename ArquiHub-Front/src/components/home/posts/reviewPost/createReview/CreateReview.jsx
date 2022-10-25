import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../../../../redux/slices/review/reviewActions";
import { changeShowSingIn } from "../../../../../redux/slices/header/headerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faStar as solid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { CreateReviewValidation } from "./CreateReviewValidation";
import AvatarUser from "../../../../avatarUser/AvatarUser";
export default function CreateReview() {
  const [error, setError] = useState({ initial: "" });
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formReviews, setformReviews] = useState({
    post_id: id,
    value: 0,
    comment: "",
  });
  const [succes, setSucces] = useState(false);
  const [hover, setHover] = useState(null);
  const { modalSignIn } = useSelector((state) => state.header);
  /* useEffect(() => {
  dispatch(getPost(id));
}, [])
 */
  const handleChange = (e) => {
    setformReviews({ ...formReviews, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setError(CreateReviewValidation(formReviews));
    const errors = CreateReviewValidation(formReviews);
    if (Object.keys(errors).length === 0) {
      dispatch(createReview({ ...formReviews, user_id: user._id }));
      setformReviews({
        post_id: id,
        value: 0,
        comment: "",
      });
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 5000);
    }
  };

  const toggleSignIn = (e) => {
    e.preventDefault();
    dispatch(changeShowSingIn(!modalSignIn));
  };

  return (
    <div className="bg-white mx-1 p-2 rounded-md shadow-lg lg:p-4">
      <div>
        {user._id ? (
          <div className="flex items-center gap-2">
            {/* <img className="w-8 rounded-full lg:w-9" src={user.avatar} alt="" /> */}
            <AvatarUser className="w-10 h-10 lg:w-14 lg:h-14" img={user.avatar}/>
            <p className="text-base text-gray-900 font-medium">
              {user.nickname}
            </p>
          </div>
        ) : (
          <div className="">
            <img
              className="w-10 rounded-full"
              src={"https://cdn-icons-png.flaticon.com/512/1946/1946429.png"}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="pt-2">
          {[...Array(5)].map((star, i) => {
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
          })}
          {error.value && <span className="error-text">{error.value}</span>}
        </div>
        <div className="pb-4">
          <div className="w-full flex flex-col gap-3 md:flex-row">
            <input
              className={` bg-white border-b-2 border-gray-600 w-full py-1.5 px-2 focus:outline-none
            md:${formReviews.comment && "w-3/4"}
            ${error.comment && "border-2 focus:border-danger border-danger"} `}
              type="text"
              onChange={(e) => handleChange(e)}
              name="comment"
              value={formReviews.comment}
              placeholder="Add your review..."
            />

            {formReviews.comment && (
              <button
                className={`w-full p-1.5 bg-gray-800 text-gray-100 flex justify-center items-center gap-4
            md:w-1/4 
            `}
                onClick={(e) => user._id ? handleClick(e):toggleSignIn(e)}
              >
                <p>Send</p>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            )}
          </div>
          {error.comment && (
            <span className="error-text w-full">{error.comment}</span>
          )}
        </div>
        {/*  <button onClick={()=>user.length===0?handleClick():hola}>Comment</button> */}
      </div>
      {succes && (
        <div
          id="toast-success"
          className="fixed bottom-0 right-0 z-30 flex items-center p-4 mb-4 w-full max-w-xs text-gray-900 bg-white rounded-lg shadow sm:mr-8"
          role="alert"
        >
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            Comment created successfully.
          </div>
          <button
            onClick={() => setSucces(false)}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
