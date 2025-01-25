import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, isDarkMode = true }) => {
  const cardAnimation = {
    hover: { scale: 1.01 },
    tap: { scale: 0.99 }
  };

  return (
    <motion.div
      variants={cardAnimation}
      whileHover="hover"
      whileTap="tap"
      className={`
        w-full h-[220px]  max-w-auto rounded-2xl
        ${isDarkMode 
          ? 'bg-gradient-to-br from-blue-950 to-gray-900 text-white' 
          : 'bg-white text-gray-800'
        }
        shadow-lg relative overflow-hidden
      `}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 blur-2xl" />
      </div>

      {/* quote  */}
      <Quote 
        size={24} 
        className="absolute right-2 top-3 opacity-60 text-blue-400"
      />

      <div className="relative p-5 h-full flex flex-col gap-5">
        {/* header */}
        <div className="flex items-center gap-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20   rounded-lg object-cover shadow-md"
          />
          
          <div className="text-right">
            <h3 className="text-lg font-bold mb-1">{testimonial.name}</h3>
            <p className="text-sm text-blue-400">{testimonial.jobTitle}</p>
          </div>
        </div>

        {/* content */}
        <div className="flex-grow">
          <p className="text-sm leading-relaxed text-right line-clamp-5 ">
            {testimonial.comment}
          </p>
        </div>

        {/* footer */}
        <div className={`flex justify-between pt-3 border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'}`}>
          <div className="flex flex-row-reverse items-center gap-1">
            <Calendar size={14} className="text-blue-400" />
            <span className="text-xs text-gray-400">{testimonial.createdAt}</span>
          </div>
          <div className="flex flex-row-reverse items-center gap-1">
            <MapPin size={14} className="text-blue-400" />
            <span className="text-xs text-gray-400">{testimonial.country}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  isDarkMode: PropTypes.bool,
  isRTL: PropTypes.bool
};

export default TestimonialCard;
