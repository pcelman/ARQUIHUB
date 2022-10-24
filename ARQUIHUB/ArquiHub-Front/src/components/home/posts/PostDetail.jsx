import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPostDetail } from "../../../redux/slices/post/ordenAndFilterActions";
import { getPost } from "../../../redux/slices/post/postActions";
import Loader from "../../loader/Loader";
import FavouritePost from "./favouritePost/FavouritePost";
import Features from "./Features";
import CreateReview from "./reviewPost/createReview/CreateReview";
import ReviewsReel from "./reviewPost/ReviewsReel";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStarHalfStroke as half, faStar as solid } from "@fortawesome/free-solid-svg-icons";
import  {faStar as regular} from '@fortawesome/free-regular-svg-icons';
import Modal from "../../modal/Modal";
function PostDetail() {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(false)
  const [overlay, setOverlay] = useState(0)
  const [overlayImg, setOverlayImg] = useState(null)
  const [startClick, setStartClick] = useState(0)
  const { id } = useParams();
  const postDetail = useSelector((state) => state.post.post);
  const date = new Date()
  const current_year = date.getFullYear()
  const current_month = date.getMonth()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPost(id));
    return () => {
      dispatch(clearPostDetail());
    };
  }, [dispatch]);

  const toggleOverlay = (e) => {
    e.preventDefault()
    setOverlay(!overlay)
  }
  
  if(postDetail.length === 0) return <div className="w-full h-screen flex justify-center items-center"><Loader/></div>
  const {image, title, created_by_data, description, bathrooms, mts2, rooms, year, authors, rating} = postDetail
  let currentYear = Math.abs(year.split("-")[2] - current_year)
  if(currentYear === 1) currentYear+= " Year ago"
  if(currentYear > 1) currentYear += " Years ago"
  let currentMonth
  if(currentYear === 0) {
    currentMonth = Math.abs(year.split("-")[1] - current_month) 
    if(currentMonth > 1) currentMonth += " Months ago"
    else{currentMonth += " Month ago"}

    console.log(postDetail);
  }
  return (
    <div className="mx-4 flex flex-col gap-4 overflow-x-hidden select-text
    md:mx-8
    lg:mx-16
    xl:mx-32
    2xl:mx-64
    ">
      <div className=''>
        
      </div>
      <div className="flex flex-col gap-2 ">
        <div className=""><img className="w-full h-[100vw] object-cover object-bottom sm:h-[95vw] md:h-[80vw] lg:h-[58vw] xl:h-[45vw] 2xl:h-[42vw]" src={image[0]} alt="" /></div>
        {/* <div className="flex flex-row w-1/2"> */}
        {image.length > 1 &&
          <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={image.length - 1}
          visibleSlides={2}
          infinite={true}
          className="flex flex-col"
          >
          <div 
          onMouseDown={()=> setStartClick(new Date())} 
          onMouseUp={() => setStartClick(new Date() - startClick)} 
          onClick={() => startClick < 100 && startClick > 0 ? [setStartClick(0), setOverlay(!overlay),] : setStartClick(0)}
          >
          <Slider className="h-[40vw] md:h-[35vw] lg:h-[30vw] xl:h-[25vw] 2xl:h-[20vw] cursor-grab active:cursor-grabbing">
            {image.map((e,i) => i!== 0 && <Slide key={i} index={i}>
              <img onClick={()=> setOverlayImg(i)} className="h-[40vw] w-full md:h-[35vw] lg:h-[30vw] xl:h-[25vw] object-cover object-bottom" src={e} alt="" />
              <Modal active={overlay} toggle={toggleOverlay}>
                  <img className="w-full h-[90vw] sm:h-[60vw] md:h-[50vw] xl:h-[30vw] 2xl:h-[25vw] object-cover object-center" src={image[overlayImg]} alt="" />
                </Modal>
              </Slide>)}
          </Slider>
          </div>
          <ButtonBack className="absolute left-0 text-xl min-h-[40vw]  float-left text-gray-400  bg-black mx-4 bg-opacity-50 
          md:mx-8 md:min-h-[35vw] md:px-1
          lg:mx-16 lg:min-h-[30vw]
          xl:mx-32 xl:min-h-[25vw]
          2xl:mx-64 2xl:min-h-[20vw]
          ">
            <FontAwesomeIcon icon={faChevronLeft}/>
          </ButtonBack>
          <ButtonNext className="absolute right-0 text-xl min-h-[40vw] float-right text-gray-400  bg-black mx-4 bg-opacity-50 
          md:mx-8 md:min-h-[35vw] md:px-1
          lg:mx-16 lg:min-h-[30vw]
          xl:mx-32 xl:min-h-[25vw]
          2xl:mx-64 2xl:min-h-[20vw]
          ">
            <FontAwesomeIcon icon={faChevronRight}/>
          </ButtonNext>
        </CarouselProvider>
      }
      </div>
      {/* <CarrouselDetail/> */}
      <div className="text-gray-900">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold lg:text-2xl">{title}</p>
          <div className="hidden sm:flex justify-between items-center gap-8">
            <div>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <FontAwesomeIcon
                      className="text-gray-800 text-base lg:text-lg xl:text-xl"
                      icon={ratingValue<=Math.ceil(rating)?ratingValue===rating || ratingValue<=rating?solid:ratingValue-0.5<=rating?half:regular:regular}
                    />
                  </label>
                );
              })}
            </div>
            <div className="text-xl text-black xl:text-2xl"><FavouritePost/></div>
          </div>
        </div>
        <p className="text-base font-semibold lg:text-lg">{`${created_by_data[0].name} ${created_by_data[0].lastname}`}</p>
        <div className="text-gray-800">
        {/* <p className="text-base font-light">Collaborators: </p> */}
        <div className="text-sm font-light lg:text-base text-black">{authors.map((e,i) => <p className="py-0.5" key={i}>{`${e.nickname}`}</p>)}</div>
        </div>
      </div>
      <div className="flex justify-between items-center sm:hidden">
        <div>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <FontAwesomeIcon
                  className="text-gray-800 text-base"
                  icon={ratingValue<=Math.ceil(rating)?ratingValue===rating || ratingValue<=rating?solid:ratingValue-0.5<=rating?half:regular:regular}
                />
              </label>
            );
          })}
        </div>
        <div className="text-lg"><FavouritePost/></div>
      </div>
      <div>
        <div className="flex gap-4 py-2 xl:hidden ">
        <p onClick={() => setDesc(false)} className={`text-xl font-medium border-b-2 border-white ${!desc && "border-gray-700"}`}>Features</p>
        <p onClick={() => setDesc(true)} className={`text-xl font-medium border-b-2 border-white ${desc && "border-gray-700"}`}>Description</p>
        </div>
        <div className="w-full bg-gray-100 p-2 shadow-lg lg:p-4 xl:hidden">
          {!desc 
          ? <Features bathrooms={bathrooms} mts2={mts2} rooms={rooms} date={currentYear === 0 ? currentMonth : currentYear}   /> 
          : <p  className="text-base leading-7 lg:text-lg">{description}</p>}
        </div>
        <div className="hidden xl:block">
          <p className="text-xl font-medium xl:text-2xl">Features</p>
          <div className="p-4">
            <Features bathrooms={bathrooms} mts2={mts2} rooms={rooms} date={currentYear === 0 ? currentMonth : currentYear}/>
          </div>
        </div>
        <div className="hidden xl:block mt-8">
          <p className="text-xl font-medium xl:text-2xl">Description</p>
          <div className="p-4">
            <p className="text-lg">{description}</p>
          </div>
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-4 bg-white px-2">
        <p className="text-xl font-medium">Ratings and reviews</p>
        <CreateReview/>
        {/* <div>Aca van los filtros</div> */}
        <ReviewsReel/>
      </div>
      
    </div>
  );
}

export default PostDetail;