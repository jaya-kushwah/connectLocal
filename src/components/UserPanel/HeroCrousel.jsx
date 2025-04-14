import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Style/HeroCrousel.css"

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00421489-mceyjpzyuk-landscape.jpg",
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00400505-zfbgvbsvdv-landscape.jpg",
    "https://www.teaminnovation.co.in/Images/upcoming-events/karan-aujla.jpg",
    "https://assets-in.bmscdn.com/discovery-catalog/events/et00435077-rsgcnrjbjh-landscape.jpg",
    "https://thumbs.dreamstime.com/b/night-dance-party-music-night-poster-template-electro-style-concert-disco-club-party-event-flyer-invitation-night-dance-party-118147281.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12 offset-md-1">
          {/* Main carousel container with improved styling */}
          <div
            className="position-relative mx-auto carousel-container"
            style={{
              width: "69rem",
              height: "400px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
              marginTop: "-1.2rem",
            }}
          >
            {/* Images container with smooth transitions */}
            <div
              className="d-flex h-100"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-100 flex-shrink-0 position-relative">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Optional overlay for better text contrast */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)",
                      pointerEvents: "none"
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Improved navigation buttons */}
            <button
              className="position-absolute start-0 top-50 translate-middle-y border-0 d-flex align-items-center justify-content-center"
              onClick={prevSlide}
              style={{
                left: "1rem",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                transition: "transform 0.2s, background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="position-absolute end-0 top-50 translate-middle-y border-0 d-flex align-items-center justify-content-center"
              onClick={nextSlide}
              style={{
                right: "1rem",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
                transition: "transform 0.2s, background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Enhanced dot indicators */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  className="p-0 border-0 "
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: currentIndex === index ? "white" : "rgba(255,255,255,0.5)",
                    transition: "all 0.3s ease",
                    transform: currentIndex === index ? "scale(1.2)" : "scale(1)",
                    boxShadow: currentIndex === index ? "0 0 4px rgba(255,255,255,0.8)" : "white"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;