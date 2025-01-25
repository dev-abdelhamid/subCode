import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import BackgroundEffects from '../0-Background/BackgroundEffects';
import HeroContent from './HeroContent';
import { API_BASE_URL } from '../api/apiConfig';

import axios from 'axios';

function HeroSection() {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // spring configuration
  const springConfig = {
    stiffness: 500,
    damping: 200,
    mass: 1
  };

  const scale = useSpring(
    useTransform(scrollYProgress, [0, .8], [1, 0.95]),
    springConfig
  );

  const y = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [0, -30]),
    springConfig
  );

  // Smooth image loading animation
  const imageAnimation = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 100
      }
    }
  };

  //  floating animation
  const subtleFloat = {
    animate: {
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.4, 0, 0.2, 1]
        }
      }
    }
  };

  //  corner decorations
  const cornerVariants = {
    initial: {
      scale: 0.9,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 50,
        delay: 0.2
      }
    }
  };

  //  badge animation
  const badgeAnimation = {
    initial: {
      y: -30,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 50
      }
    }
  };




  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API with Axios
    const headers = {
      'Accept-Language': `${i18n.language}`, // Change language dynamically based on state
    };
    axios.get(`${API_BASE_URL}/header`
      , {
        headers: headers,
      }).then(response => {
        setData(response.data.data);  // Set the response data to state
        setLoading(false);  // Set loading to false

      })
      .catch(error => {
        setError(error);  // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false)
      });

  }, []);  // Run this effect whenever the `language` changes


  return (
    <section id='home' ref={sectionRef} className="h-full  md:h-screen w-full relative overflow-hidden">
      <BackgroundEffects />

      <motion.div
        style={{ scale, y }}
        className="relative z-10 container mt-6   mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
      >
        <div className="flex flex-col max-w-8xl mx-auto">
          <div className="flex flex-col ">
            {/* Badge */}
            <motion.div
              className="flex  justify-center w-full"
              variants={badgeAnimation}
              initial="initial"
              animate="animate"
            >
              <div className="custom-badge   mb-4 sm:mb-6  lg:mb-4  xs:mt-6 sm:mt-4 md:mt-0">
                <div className={`
                  badge-content
                  inline-flex items-center gap-1.5 
                  border border-violet-500/30
                  px-3 py-2
                  backdrop-blur-xl
                  ${isDarkMode ? 'bg-gray-900/40 text-white' : 'bg-white/40 text-black'}
                `}>
                  <ShieldCheck className={`
                    w-4 h-5 z-10 
                    ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}
                  `} />
                  <span className="z-10 font-cairo text-sm font-medium ">
                    {t('hero.badge')}
                  </span>
                  <div className="hover-effect">
                    <div className="gradient-circle"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 lg:gap-4">
              <motion.div className="order-1 md:order-2 relative">
                <div>
                  {/* corner decorations */}
                  <div className={`
                      absolute -top-3 -right-3 w-24 h-24
                      border-t-3 border-r-3
                      ${isDarkMode ? 'border-blue-500' : 'border-blue-500'}
                      rounded-tr-3xl
                    `}
                  />

                  <div className={`
                      absolute -bottom-3 -left-3 w-24 h-24
                      border-b-3 border-l-3
                      ${isDarkMode ? 'border-blue-500' : 'border-blue-500'}
                      rounded-bl-3xl
                    `}
                  />

                  <div className="relative p-2 md:mt-12 md:p-2  lg:mt-10  aspect-w-16 2xl:aspect-h-16 2xl:p-6 2xl:m-16"
                  >
                    {
                      loading ? null :
                        <img
                          src={data.slider}
                          alt="Hero"
                          className="w-full h-full  object-cover object-center rounded-xl shadow-lg"
                          loading="eager"
                          onLoad={() => setImageLoaded(true)}
                        />
                    }
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <HeroContent />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

  );
}

export default HeroSection;
