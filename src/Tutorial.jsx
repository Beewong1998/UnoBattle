import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./css/Tutorial.module.css";

const videos = [
  "https://i.imgur.com/ZokGQsX.mp4",
  "https://i.imgur.com/UxcsXoY.mp4",
  "https://i.imgur.com/tm3ujHg.mp4",
  "https://i.imgur.com/s1iPVE0.mp4",
  "https://i.imgur.com/CN6d3ow.mp4",
  "https://i.imgur.com/0YKppo0.mp4",
  "https://i.imgur.com/OVVvT44.mp4",
];

const tutorialTitle = [
  "Tutorial",
  "Events",
  "Environments",
  "Environments",
  "End Game Round",
  "New Game Round",
  "Overall Winner",
];
const tutorialDescription = [
  'Press the "Play Card" button everytime you play a card in real life',
  "Events are triggered randomly. These must be resolved before continuing.",
  "Environments are sustained effects which alter how the game is played. (until it is replaced)",
  "Environment icon keeps track of which environment is currrently in play.",
  "Track points when someone wins the round. (Add up cards remaining in hand)",
  "Continue in a new round. The round number is tracked automatically.",
  "End game after a few rounds to reveal the overall winner!",
];

const Tutorial = ({ tutorialOpen, setTutorialOpen }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentPage(swiper.activeIndex);
  };

  const closeTutorial = () => {
    setTutorialOpen(false);
  };

  return (
    <>
      <div onClick={closeTutorial} className={styles.tutorialContainer}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.contentContainer}
        >
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
            {currentPage + 1 < videos.length ? (
              `${currentPage + 1} /  ${videos.length}`
            ) : (
              <button onClick={closeTutorial} className={styles.startButton}>
                Start Game!
              </button>
            )}
          </div>
        </div>

        {currentPage + 1 < videos.length ? (
          <button onClick={closeTutorial} className={styles.skipButton}>
            Skip Tutorial
          </button>
        ) : (
          <div className={`${styles.skipButton} !bg-transparent`} />
        )}
      </div>
    </>
  );
};

export default Tutorial;
