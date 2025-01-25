import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
// import { partners } from './Partenrs';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
};

function PartnersSlider({data}) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = document.documentElement.dir === 'rtl';
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getItemsPerView = useCallback(() => {
    if (window.innerWidth < 640) return 2;
    if (window.innerWidth < 1024) return 3;
    return 3;
  }, []);

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const totalSlides = Math.ceil(data.partners.length / itemsPerView);

  const navigateSlide = useCallback((newDirection) => {
    const adjustedDirection = isRTL ? -newDirection : newDirection;
    setDirection(adjustedDirection);
    setIsPaused(true);

    setCurrentIndex((prev) => {
      const next = adjustedDirection > 0
        ? (prev + 1) % totalSlides
        : (prev - 1 + totalSlides) % totalSlides;
      return next;
    });

    setTimeout(() => setIsPaused(false), 3000);
  }, [totalSlides, isRTL]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoplay(false);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      const newDirection = swipeDistance > 0 ? -1 : 1;
      navigateSlide(newDirection);
    }
    setIsAutoplay(true);
  };

  const getCurrentSlidePartners = useCallback(() => {
    const startIndex = currentIndex * itemsPerView;
    return data.partners.slice(startIndex, startIndex + itemsPerView);
  }, [currentIndex, itemsPerView]);

  useEffect(() => {
    if (data.partners && data.partners.length > 0) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerView]);

  useEffect(() => {
    if (!isAutoplay || isPaused) return;
    const timer = setInterval(() => navigateSlide(1), 3000);
    return () => clearInterval(timer);
  }, [isAutoplay, isPaused, navigateSlide]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse w-full max-w-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="select-none">
      <h3 className={`text-sm md:text-md font-semibold cairo text-center mb-2 
        ${isDarkMode ? 'text-white' : 'text-gray-900'}
        ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
        {t('ourPartners.title')}
      </h3>

      <div className="relative mt flex justify-center sm:left-0 sm:right-0 md:-left-5 md:-right-5 flex-col items-center lg:w-fit">
        <div className="relative flex justify-center items-center lg:justify-start w-full">
          <button
            onClick={() => navigateSlide(isRTL ? 1 : -1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 shadow-lg
              ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {isRTL ? <ChevronRight className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} /> 
                   : <ChevronLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />}
          </button>

          <div 
            className="flex mt-6 items-center justify-center touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2`}
              >
                {getCurrentSlidePartners().map((partner) => (
                  <motion.div
                    key={partner.id}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center"
                  >
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${partner.name}`}
                    >
                      <img
                        src={partner}
                        alt="subcode"
                        className="xs:w-24 xs:h-18 sm:h-20 md:w-24 aspect-square object-cover md:h-20 xl:h-24 rounded-md transition-transform duration-300"
                        loading="lazy"
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigateSlide(isRTL ? -1 : 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 shadow-lg
              ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {isRTL ? <ChevronLeft className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                   : <ChevronRight className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />}
          </button>
        </div>

        <div className="flex justify-center mt-3 mb-6 sm:mb-10 md:mb-14 xl:mb-18 gap-1">
          {[...Array(totalSlides)].map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300
                ${currentIndex === index 
                  ? (isDarkMode ? 'bg-blue-400 w-4' : 'bg-blue-500 w-4') 
                  : (isDarkMode ? 'bg-white/20' : 'bg-black/20')}`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PartnersSlider);
