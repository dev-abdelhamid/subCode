import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Eye, Share2, ImageOff, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../Context/ThemeContext';
import PropTypes from 'prop-types';
import CardSkeleton from './CardSkeleton';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { 
    y: -5,
    transition: { duration: 0.2 }
  }
};

const ArticleCard = ({ 
  title, titleEn, excerpt, excerptEn, date, slug, thumbnail, 
  index, category, categoryEn, views, tags = [], tagsEn = [], isLoading 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();

  const currentTitle = isRTL ? title : titleEn;
  const currentExcerpt = isRTL ? excerpt : excerptEn;
  const currentCategory = isRTL ? category : categoryEn;
  const currentTags = isRTL ? tags : tagsEn;

  useEffect(() => {
    const img = new Image();
    img.src = thumbnail;
    img.onerror = () => setImageError(true);
  }, [thumbnail]);

  if (isLoading) return <CardSkeleton />;

  const handleCardClick = () => navigate(`/blog/${slug}`);
  
  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentTitle,
          text: currentExcerpt,
          url: `${window.location.origin}/blog/${slug}`
        });
      } catch (err) {
        console.error('Sharing failed:', err);
      }
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`
        relative p-4 rounded-2xl cursor-pointer
        ${isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 to-gray-900/80 border border-gray-800/50' 
          : 'bg-gradient-to-b from-white to-gray-50/90 border border-gray-100'}
        overflow-hidden group
        hover:shadow-xl hover:shadow-blue-500/10
        transition-all duration-300
        w-full h-[400px]
      `}
    >
      {/* Glass Effect Background */}
      <div className={`
        absolute inset-0 
        ${isDarkMode ? 'bg-gray-900/20' : 'bg-white/20'}
        backdrop-blur-sm z-0
      `} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/9]">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                <ImageOff className="w-8 h-8 text-gray-400" />
              </div>
            ) : (
              <img 
                src={thumbnail}
                alt={currentTitle}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}
          </div>

          {/* Category Badge and Actions */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <span className={`
              px-3 py-1.5 text-xs font-medium rounded-lg
              ${isDarkMode 
                ? 'bg-gray-900/90 text-blue-400 border border-blue-500/20' 
                : 'bg-white/95 text-blue-600 border border-blue-100'}
              backdrop-blur-sm shadow-lg
            `}>
              {currentCategory}
            </span>
            
            <div className="flex gap-2">
              <button 
                onClick={handleBookmark}
                className={`
                  p-2 rounded-lg backdrop-blur-sm shadow-lg
                  ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/95'}
                  ${isBookmarked ? 'text-yellow-500' : 'text-gray-500'}
                  hover:scale-110 transition-transform duration-200
                `}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button 
                onClick={handleShare}
                className={`
                  p-2 rounded-lg backdrop-blur-sm shadow-lg
                  ${isDarkMode ? 'bg-gray-900/90' : 'bg-white/95'}
                  text-gray-500 hover:text-blue-500
                  hover:scale-110 transition-all duration-200
                `}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {date}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-500" />
            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-US').format(views)}
            </span>
          </span>
        </div>

        {/* Title */}
        <h3 className={`
          text-lg font-bold mb-2.5 
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
          line-clamp-2 leading-tight
          group-hover:text-blue-500 transition-colors duration-200
        `}>
          {currentTitle}
        </h3>

        {/* Excerpt */}
        <p className={`
          text-sm leading-relaxed mb-4
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
          line-clamp-3
        `}>
          {currentExcerpt}
        </p>

        {/* Tags */}
        {currentTags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {currentTags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className={`
                  text-[11px] px-2.5 py-1 rounded-lg
                  ${isDarkMode 
                    ? 'bg-gray-800/80 text-gray-300 hover:bg-blue-500/20 hover:text-blue-400' 
                    : 'bg-gray-100/80 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}
                  transition-colors duration-200
                `}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-auto">
          <span className={`
            inline-flex items-center gap-1.5 text-sm font-medium
            ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}
            group-hover:gap-3 transition-all duration-300
          `}>
            {t('readMore')}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </div>
    </motion.article>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  titleEn: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  excerptEn: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  categoryEn: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  tagsEn: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool
};

export default ArticleCard;
