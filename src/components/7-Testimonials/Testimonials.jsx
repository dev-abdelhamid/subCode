import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext';
import { testimonialsData } from './testimonialsdata';
import TestimonialCard from './TestimonialCard';
import CornerLights from '../0-Background/CornerLights';
import axios from 'axios';
import { API_BASE_URL } from '../api/apiConfig';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
};

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const dragX = useMotionValue(0);
  const isRTL = i18n.dir() === 'rtl';

  const [state, setState] = useState({
    currentIndex: 0,
    direction: 1,
    itemsPerView: typeof window !== 'undefined' ? 
      (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3) : 3,
    isAnimating: false
  });
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/testsmoinal`);
        setData(response.data.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [error]);

  const totalPages = Math.ceil(testimonialsData.length / state.itemsPerView);


  const handleSlideChange = useCallback((direction) => {
    if (state.isAnimating) return;
    
    const adjustedDirection = isRTL ? -direction : direction;
    
    setState(prev => ({
      ...prev,
      isAnimating: true,
      direction: direction,
      currentIndex: (prev.currentIndex + adjustedDirection + totalPages) % totalPages
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, isAnimating: false }));
    }, 500);
  }, [totalPages, state.isAnimating, isRTL]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const dragThreshold = 50;

    if (Math.abs(offset) > dragThreshold) {
      const direction = offset > 0 ? -1 : 1;
      handleSlideChange(direction);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setState(prev => ({
        ...prev,
        itemsPerView: window.innerWidth < 640 ? 1 : 
                      window.innerWidth < 1024 ? 2 : 3
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNavigationButton = (direction) => (
    <button
      onClick={() => handleSlideChange(direction)}
      className={`absolute top-1/2 -translate-y-1/2 z-10 
        w-12 h-12 flex items-center justify-center rounded-full 
        bg-white/90 shadow-lg hover:bg-white/100 transition-all
        ${isDarkMode ? 'text-gray-800' : 'text-gray-900'}`}
      style={{
        [direction > 0 ? 'right' : 'left']: '-3rem'
      }}
    >
      {isRTL ?
        (direction > 0 ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />) :
        (direction > 0 ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />)
      }
    </button>
  );

  if (loading) return null;

  return (
    <section className={`py-10 relative cairo overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="absolute inset-0 opacity-50 w-full h-full">
        <CornerLights />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('testimonials.title')}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('testimonials.description')}
          </p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {renderNavigationButton(-1)}

          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ x: dragX }}
            className="touch-pan-y"
          >
            <AnimatePresence initial={false} custom={state.direction} mode="wait">
              <motion.div
                key={state.currentIndex}
                custom={state.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 2000, damping: 200 },
                  opacity: { duration: 0.1 },
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                {data.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {renderNavigationButton(1)}

          <div className="flex justify-center items-center gap-1 mt-10">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const direction = index > state.currentIndex ? 1 : -1;
                  handleSlideChange(direction);
                }}
                className="relative h-2 transition-all duration-200"
                style={{ width: state.currentIndex === index ? '2rem' : '0.65rem' }}
              >
                <div
                  className={`absolute inset-0 rounded-full ${
                    state.currentIndex === index
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700'
                      : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Testimonials);
