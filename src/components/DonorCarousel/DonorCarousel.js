import React from 'react';
import Slider from 'react-slick';
import { randomDonors } from '../../utils/randomDonors';
import './DonorCarousel.css';

const DonorCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="donor-carousel-container">
      <h2 className="carousel-title">✨ Our Generous Donors ✨</h2>
      <Slider {...settings}>
        {randomDonors.map((donor) => (
          <div key={donor.id} className="donor-card">
            <div className="donor-name">{donor.displayName}</div>
            <div className="donor-amount">${donor.amount}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DonorCarousel;