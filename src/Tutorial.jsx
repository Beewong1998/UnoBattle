import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./css/Tutorial.module.css";

const videos = [
  "https://i.imgur.com/ZokGQsX.mp4",
  "https://i.imgur.com/pKteGVg.mp4",
  "https://i.imgur.com/CN6d3ow.mp4",
  "https://i.imgur.com/vlI74JD.mp4",
];

const tutorialTitle = ["Tutorial", "Events", "Winner", "End Game"];
const tutorialDescription = [
  'Press the "Play Card" button everytime you play a card in real life',
  "Events are triggered randomly",
  "Track points when someone wins.",
  "End game to reveal the winner with the least amount of points! Enjoy!",
];

const Tutorial = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentPage(swiper.activeIndex);
  };

  return (
    <div className={styles.tutorialContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.title}>{tutorialTitle[currentPage]}</div>
        <div className={styles.tutorialVideo}>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <div className={styles.slide}>
                  <ReactPlayer
                    url={video}
                    playing={true}
                    loop={true}
                    muted={true}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.tutorialDescription}>
            {tutorialDescription[currentPage]}
          </div>
        </div>
        <div className={styles.pageCounter}>
          {currentPage + 1} / {videos.length}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
