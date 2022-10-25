import { ButtonBack, ButtonNext, ButtonPlay, CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { allPosts, order } from '../../../redux/slices/post/postSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from '../../loader/Loader';
import ContentCarousel from './content/ContentCarousel';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
let orderPostsRating = []

function Carousel() {
  const { allPosts } = useSelector((state) => state.post);
  useEffect(() => {
    const posts = [...allPosts]
    if(allPosts.length!==0){ 
/*       orderPostsRating = posts.filter(e=>e.reviews.length>5) */
      orderPostsRating = posts.sort((a, b) => (a.rating > b.rating ? -1 : 1))}
  }, [allPosts])
  


  if(orderPostsRating.length === 0) return <div className='w-full h-[50vw] flex justify-center items-center'><Loader/></div>
  return (
    <div className='w-full'>
      <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
      visibleSlides={1}
      infinite={true}
      isPlaying={true}
      className=""
      >
        <div className='relative'>
        <Slider className='h-[100vw] sm:h-[95vw] md:h-[80vw] lg:h-[60vw] xl:h-[45vw] 2xl:h-[43vw]'>
          <Slide index={0}><ContentCarousel data={orderPostsRating[0]}/></Slide>
          <Slide index={1}><ContentCarousel data={orderPostsRating[1]}/></Slide>
          <Slide index={2}><ContentCarousel data={orderPostsRating[2]}/></Slide>
        </Slider>
        {/* <div className='absolute top-0 w-full bg-black bg-opacity-60 p-4'><p className='text-gray-50'>Top rated</p></div> */}
        <ButtonBack className='absolute top-1/2 left-0 text-gray-50 mx-4'><FontAwesomeIcon className='text-3xl' height={300} icon={faAngleLeft}/></ButtonBack>
        <ButtonNext className='absolute top-1/2 right-0 text-gray-50 mx-4'><FontAwesomeIcon className='text-3xl' height={300} icon={faAngleRight}/></ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  )
}

export default Carousel