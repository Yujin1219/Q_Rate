// 메인 히어로 섹션 (이미지 배너)
import mainImage from "../../assets/main.png";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full overflow-hidden bg-gradient-to-br from-violet-100 via-purple-200 to-fuchsia-300 flex items-center justify-center min-h-[810px]"
    >
      <img
        src={mainImage}
        alt="Q+Rate 메인 배너"
        className="max-w-[1380px] w-full h-auto object-contain"
      />
    </motion.div>
  );
}
