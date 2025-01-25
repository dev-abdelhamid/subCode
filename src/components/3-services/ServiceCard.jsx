import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ service, isDarkMode, isLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    navigate(`/services/${service.id}`);
  };

  if (isLoading) {
    return (
      <div className={`
        relative rounded-xl backdrop-blur-lg border cursor-pointer
        ${isDarkMode ? 'border-white/20' : 'border-blue-600/70'}
        overflow-hidden
      `}>
        <div className="animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
          
          <div className="p-6 space-y-4">
            <div className="h-8 w-3/4 mx-auto rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" />
            
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index}
                  className={`h-4 rounded bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800
                    ${index === 1 ? 'w-5/6' : index === 2 ? 'w-4/6' : 'w-full'} mx-auto`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className={`
        relative rounded-xl backdrop-blur-lg border cursor-pointer
        ${isDarkMode ? 'border-white/20' : 'border-blue-600/70'}
        group hover:shadow-2xl hover:shadow-blue-500/10 
        transition-all duration-500 hover:-translate-y-1
      `}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-br 
        ${isDarkMode 
          ? 'from-blue-500/20 to-indigo-400/20'
          : 'from-blue-300/30 via-sky-400/20 to-indigo-300/20'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl
      `} />

      <div className="relative overflow-hidden aspect-video rounded-t-xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
        )}
        <img
          src={service.image}
          alt={service.title}
          onLoad={() => setImageLoaded(true)}
          className={`
            w-full h-full object-cover object-center transform 
            transition-transform duration-700 group-hover:scale-105
            ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
          `}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
          opacity-0 group-hover:opacity-100 transition-all duration-300
          flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-8 py-3 bg-blue-600 text-white rounded-full
            flex items-center gap-3 hover:bg-blue-700 
            transform translate-y-4 opacity-0 group-hover:translate-y-0 
            group-hover:opacity-100 transition-all duration-500
            hover:scale-105 active:scale-95 shadow-lg">
            <Eye size={20} />
            <span className="font-semibold">{t('services.viewDetails')}</span>
          </span>
        </div>
      </div>

      <div className="relative z-10 p-6">
        <h3 className={`
          text-2xl text-center font-bold mb-4 
          group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r
          ${isDarkMode 
            ? 'text-white from-blue-400 to-sky-400' 
            : 'text-gray-900 from-blue-600 to-sky-600'
          } transition-all duration-500
        `}>
          {service.title}
        </h3>

        <div className={`
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          leading-relaxed text-center line-clamp-3
        `}>
          {parse(service.description || '')}
        </div>
      </div>
    </motion.div>
  );
};
ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }),
  isDarkMode: PropTypes.bool,
  isLoading: PropTypes.bool
};


export default memo(ServiceCard);
