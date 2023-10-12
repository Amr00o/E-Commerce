import React from 'react'
import Slider from "react-slick";
import img1 from '../../Assets/image/41nN4nvKaAL._AC_SY200_.jpg'
import img2 from '../../Assets/image/61cSNgtEISL._AC_SY200_.jpg'
import img3 from '../../Assets/image/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import img4 from '../../Assets/image/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import img5 from '../../Assets/image/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'


function MainSlider() {

    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
  <div className="mainSlider mt-4 mb-5">
    <div className="row g-0 justify-content-center">
      <div className="col-md-3 p-0">
      <Slider {...settings} className='cursor-pointer'>
        <img className='w-' height={380} src={img1} />
        <img className='w-50' height={380} src={img2} />
        <img className='w-' height={380} src={img3} />
      </Slider>
      </div>
      <div className="col-md-3 p-0">
      <img className='w-100' height={190} src={img4} />
      <img className='w-100' height={190} src={img5} />
      </div>
    </div>
  </div>
  )
}

export default MainSlider