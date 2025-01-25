import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import ArticleCard from './ArticleCard';
import { articles } from './BlogData';

// Animation variants
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  },
  underline: {
    initial: { width: 0 },
    whileInView: { width: '4rem' },
    transition: { duration: 0.6 }
  },
  stagger: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  }
};

const LatestArticles = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const currentLang = i18n.language;

  // Get only the first 3 articles
  const latestArticles = articles.slice(0, 3);

  return (
    <section
      id="latestarticles" 
      className={`relative cairo py-16 overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      {/* Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode 
            ? 'from-gray-950 via-gray-900 to-gray-950 opacity-50'
            : 'from-gray-50 via-white to-gray-50 opacity-70'
        }`}
      />

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          {...animations.fadeInUp}
        >
          <h2 className={`text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t('latestArticles.title')}
          </h2>

          <motion.div
            {...animations.underline}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />

          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          } text-lg mb-8 max-w-2xl mx-auto leading-relaxed`}>
            {t('latestArticles.description')}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          {...animations.stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleCard {...article} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          {...animations.fadeInUp}
          className="text-center"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-white
              bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
              shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <span className="text-lg">{t('latestArticles.viewAll')}</span>
            <ArrowRight 
              className={`w-5 h-5 transition-transform ${
                currentLang === 'ar' 
                  ? 'rotate-180 group-hover:-translate-x-1' 
                  : 'group-hover:translate-x-1'
              }`} 
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;
