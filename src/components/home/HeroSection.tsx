// 메인 히어로 섹션 (이미지 배너)
import mainImage from "../../assets/main.png";
import Fade from "react-reveal/Fade";

export default function HeroSection() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-violet-100 via-purple-200 to-fuchsia-300 flex items-center justify-center min-h-[810px]">
        {/* main.png 이미지 배너 */}
        <Fade bottom duration={1500} delay={300}>
          <img
            src={mainImage}
            alt="Q+Rate 메인 배너"
            className="max-w-[1380px] w-full h-auto object-contain"
          />
        </Fade>
    </div>
  );
}
