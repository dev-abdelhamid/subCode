import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/ThemeContext';
import { 
  Users, Clock, Star, MessageCircle, 
  CheckCircle
} from 'lucide-react';

const BANNER_DATA = [
  {
    id: 1,
    image: '/images/web-dev-1.jpg',
    title: 'تطوير مواقع احترافية',
    subtitle: 'نحول أفكارك إلى واقع رقمي متميز'
  },
  {
    id: 2, 
    image: '/images/web-dev-2.jpg',
    title: 'تصميم عصري متجاوب',
    subtitle: 'واجهات مستخدم جذابة تناسب جميع الأجهزة'
  },
  {
    id: 3,
    image: '/images/web-dev-3.jpg', 
    title: 'أداء عالي وسرعة فائقة',
    subtitle: 'تحسين كامل للأداء ومحركات البحث'
  }
];

const SERVICE_DATA = {
  title: 'تطوير المواقع الإلكترونية',
  description: 'نقدم خدمات تطوير مواقع احترافية متكاملة مع التركيز على تجربة المستخدم وأحدث التقنيات',
  features: [
    {
      icon: '⚡',
      title: 'أداء عالي',
      description: 'تحسين كامل للسرعة والأداء'
    },
    {
      icon: '📱', 
      title: 'تصميم متجاوب',
      description: 'يعمل على جميع الأجهزة'
    },
    {
      icon: '🔍',
      title: 'SEO متقدم',
      description: 'تحسين لمحركات البحث'
    },
    {
      icon: '🛡️',
      title: 'حماية متكاملة', 
      description: 'أعلى معايير الأمان'
    }
  ],
  stats: {
    rating: 4.9,
    projects: 150,
    experience: 5
  },
  additionalFeatures: [
    'دعم فني مجاني لمدة 3 أشهر',
    'ضمان جودة العمل',
    'تسليم سريع',
    'تعديلات مجانية',
    'تحسين محركات البحث',
    'تصميم متجاوب'
  ]
};

const ServiceDetails = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % BANNER_DATA.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('مرحباً، أرغب في الاستفسار عن خدمة تطوير المواقع');
    window.open(`https://wa.me/+905528255694?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Banner Slider */}
      <div className="relative h-[80vh] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 h-full"
          style={{ transform: `translateX(${-currentSlide * 100}%)` }}
        >
          {BANNER_DATA.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-white space-y-6"
                >
                  <h1 className="text-5xl md:text-6xl font-bold">{slide.title}</h1>
                  <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {BANNER_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Service Content - Centered */}
      <div className="container mx-auto px-4 py-12">
        {/* Centered Service Information */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            {SERVICE_DATA.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            {SERVICE_DATA.description}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Features and Stats */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {SERVICE_DATA.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-center"
            >
              <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{SERVICE_DATA.stats.rating}</div>
              <div className="text-sm text-gray-500">تقييم العملاء</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-center"
            >
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{SERVICE_DATA.stats.projects}+</div>
              <div className="text-sm text-gray-500">مشروع منجز</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg text-center"
            >
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{SERVICE_DATA.stats.experience}+</div>
              <div className="text-sm text-gray-500">سنوات خبرة</div>
            </motion.div>
          </div>
          </div>

          {/* Right Column - Contact and Additional Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl sticky top-28"
            >
              <div className="relative mb-8">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full transform rotate-2 animate-pulse">
                  عرض خاص
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppClick}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center gap-3
                         hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                <span>احصل على استشارة مجانية</span>
              </motion.button>

              <div className="mt-8 space-y-4">
                <div className="text-lg font-bold text-center mb-6">
                  مميزات حصرية
                </div>
                {SERVICE_DATA.additionalFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceDetails);