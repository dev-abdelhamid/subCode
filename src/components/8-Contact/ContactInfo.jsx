import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { contactInfo } from "../../config/contactConfig";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import SocialLinks from "../shared/SocialLinks";

const ContactInfo = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {contactInfo.map((item, index) => {
        const Icon = Icons[item.icon];
        return (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300
              ${isDarkMode ? 'bg-gray-900/50 hover:bg-gray-800/50' : 'bg-gray-50 hover:bg-gray-100'}
              border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className={`p-3 rounded-xl bg-blue-500/20 text-blue-500`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              {item.link ? (
                <div>
                  <a href={item.link} className={`font-medium hover:underline ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {item.text}
                  </a>
                  <p className={`text-sm mt-1 ${isDarkMode ? "text-white" : "text-black"} `}>{t(item.subtextKey)}</p>
                </div>
              ) : (
                <div>
                  {Array.isArray(item.textKey) ? (
                    <div className="space-y-1">
                      <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {t(item.textKey[0])}
                      </h4>
                      <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {t(item.textKey[1])}
                      </h4>
                    </div>
                  ) : (
                    <>
                      <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {item.textKey ? t(item.textKey) : item.text}
                      </h4>
                      <p className="text-gray-500 text-sm mt-1">{t(item.subtextKey)}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
      <SocialLinks />
    </motion.div>
  );
};

export default ContactInfo;
