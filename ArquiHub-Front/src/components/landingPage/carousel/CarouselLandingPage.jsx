import React, { useEffect, useState } from 'react'
import CarouselLandingPageData from './carouselData/CarouselLandingPageData'
import infoCarousel from '../../../api/carouselData'

function CarouselLandingPage() {
  const aleatorio = Math.round(Math.random()* 8)
  const [selectedIndex, setSelectedIndex] = useState(aleatorio)
  const [selectedComponent, setSelectedComponent] = useState(infoCarousel[aleatorio])
  const [loaded, setLoaded] = useState(true)
  const {arch, quotes, img, description, buildingName} = infoCarousel[selectedIndex]

  useEffect(()=>{
    const interval = setInterval(()=>{
      selectNewComponent(selectedIndex, infoCarousel)
    },7000)
    return () => clearInterval(interval);
  })

  const selectNewComponent = (index, component, next = false) => {
    setLoaded(false)
    setTimeout(() => {
    const condition = next ? selectedIndex < infoCarousel.length - 1 : selectedIndex > 0;
    const nextIndex = next 
      ? condition ? selectedIndex + 1 : 0
      : condition ? selectedIndex - 1 : infoCarousel.length - 1
      setSelectedComponent(infoCarousel[nextIndex])
      setSelectedIndex(nextIndex)
      setLoaded(true)
    }, 500);
  }

  return (
    <div className={` absolute mx-32 transition-all duration-1000 opacity-0 ${loaded ? 'opacity-100': ''}`}>
      <CarouselLandingPageData 
      arch={arch} 
      quotes={quotes}
      img={img}
      description={description}
      buildingName={buildingName}
      />
    </div>
  )
}

export default CarouselLandingPage