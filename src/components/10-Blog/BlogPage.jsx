import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import { useTranslation } from 'react-i18next';
import ArticleCard from './ArticleCard';
import { articles, blogCategories, blogTags } from './BlogData';

const BlogPage = () => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  
  const isRTL = i18n.language === 'ar';

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredArticles = articles.filter(article => {
    const title = i18n.language === 'ar' ? article.title : article.titleEn;
    const excerpt = i18n.language === 'ar' ? article.excerpt : article.excerptEn;
    
    const matchesSearch = (title + excerpt).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags[i18n.language].includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className={`min-h-screen mt-20 font-cairo ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-3xl font-bold text-center mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {i18n.language === 'ar' ? 'مدونتنا' : 'Our Blog'}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '4rem' }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4"
          />
          <p className={`text-center max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {i18n.language === 'ar' 
              ? 'استكشف مقالاتنا في مجالات التكنولوجيا والأعمال والتطوير الرقمي'
              : 'Explore our articles in technology, business, and digital development'
            }
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pb-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <aside className={`hidden lg:block lg:col-span-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-lg font-semibold mb-4">
                  {i18n.language === 'ar' ? 'بحث' : 'Search'}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full p-2 ${isRTL ? 'pr-10' : 'pl-10'} rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-900 border-gray-700 text-white'
                        : 'bg-white border-gray-200'
                    }`}
                    placeholder={i18n.language === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
                  />
                  <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-2.5 w-5 h-5 text-gray-400`} />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-2.5`}
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {i18n.language === 'ar' ? 'التصنيفات' : 'Categories'}
                  </h3>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {i18n.language === 'ar' ? 'مسح' : 'Clear'}
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {blogCategories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-${isRTL ? 'right' : 'left'} px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : isDarkMode
                            ? 'hover:bg-gray-800'
                            : 'hover:bg-gray-100'
                      }`}
                    >
                      {i18n.language === 'ar' ? category.name : category.nameEn}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {i18n.language === 'ar' ? 'الوسوم' : 'Tags'}
                  </h3>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {i18n.language === 'ar' ? 'مسح الكل' : 'Clear All'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogTags[i18n.language].map((tag, index) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700'
                            : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  {...article} 
                  index={index}
                  currentLang={i18n.language}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
