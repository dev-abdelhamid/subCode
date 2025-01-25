import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { PhoneIncoming } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PartnersSlider from './PartnersSlider';
import { useTheme } from '../../Context/ThemeContext';
import { API_BASE_URL } from '../api/apiConfig';
import axios from 'axios';
import parse from 'html-react-parser';


const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  }
};

const HeroContent = memo(function HeroContent( ) {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const isRTL = document.documentElement.dir === 'rtl';

  const scrollToContact = useCallback((e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const offsetPosition = contactSection.offsetTop - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const buttonStyles = useMemo(() => ({
    primary: `
      group relative px-4 py-2
      xs:rounded-xl rounded-2xl
      flex items-center justify-center
      bg-blue-500 hover:bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-400
      text-white cairo text-sm lg:text-md
      transform-gpu
    `,
    secondary: `
      px-4 py-2 rounded-2xl xs:rounded-xl
      shadow-lg bg-white text-blue-500 
      hover:bg-blue-100 hover:text-black
      cairo text-base text-sm lg:text-md
      transform-gpu
    `
  }), []);


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
    <>
      {
        loading ? "loading..."
          :
          <LazyMotion features={domAnimation}>
            <AnimatePresence>
              <motion.div
                variants={animations.container}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto relative"
                style={{
                  contain: 'content',
                  willChange: 'transform',
                  transform: 'translateZ(0)'
                }}
              >
                <div className={`
            sm:px-2 md:px-0 xl:px-2 sm:px-4 xs:px-2
            text-center ${isRTL ? 'md:text-right' : 'md:text-left'}
            sm:pt-4 xs:pt-1
          `}>
                  <motion.h1 variants={animations.item} className={` cairo text-5xl sm:text-6xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl
                md:py-4 sm:py-2 font-bold mb-3 
                ${isDarkMode ? 'text-white' : 'text-black'}
              `}
                  >
                    <p className="line-lg flexed-p">
                      <span className={`
                  block sm:inline-block
                  ${isRTL ? 'mt-2' : 'mt-0'}
                  font-tajawal text-blue-500
                `}>
                        {t('common.name')}
                      </span>
                      {/* <span className="font-mono sm:inline-block hidden">{'،'}</span> */}
                      {
                        parse(data.description)
                      }
                    </p>
                  </motion.h1>

                  <motion.div
                    variants={animations.item}
                    className="flex flex-row pt-3 gap-10 sm:pt-3 md:pt-0 my-10 font-semibold items-center justify-center md:justify-start md:gap-3"
                  >
                    <motion.button className={buttonStyles.primary}>
                      <Link to={`https://wa.me/${data.mobile || '+905528255694'}?text=${data.contactUsText}`} className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <span>{t('hero.buttons.start')}</span>
                        <PhoneIncoming className={` w-4 h-4 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-2' : '-rotate-90 group-hover:translate-x-2'}`}/>
                      </Link>
                    </motion.button>

                    <Link to="/gallery">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={buttonStyles.secondary}
                      >
                        {t('hero.buttons.work')}
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={animations.item}
                    className="cairo text-lg mx-4 mt-3 sm:mt-4 md:mt-3 lg:mt-5 xl:mt-6 2xl:mt-8"
                  >
                    <PartnersSlider data={data}/>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </LazyMotion>
      }
    </>
  );
});




export default HeroContent;
