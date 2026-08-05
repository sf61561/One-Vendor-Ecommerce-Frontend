import img_1 from "../../assets/images/Slider/pg-1.png";
import img_2 from "../../assets/images/Slider/pg-2.png";
import img_3 from "../../assets/images/Slider/pg-3.png";
import img_4 from "../../assets/images/Slider/pg-4.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination} from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    return (
        <Swiper className="w-full h-[calc(100vh-80px)]" loop={true} slidesPerView={1} navigation={true} keyboard mousewheel modules={[Navigation, Pagination,Autoplay]} pagination={{clickable:true}} autoplay={{delay:3000}}>
            <SwiperSlide><img src={img_1} className="w-full h-full object-cover" alt="Image 1" /></SwiperSlide>
            <SwiperSlide><img src={img_2} className="w-full h-full object-cover" alt="Image 2" /></SwiperSlide>
            <SwiperSlide><img src={img_3} className="w-full h-full object-cover" alt="Image 3" /></SwiperSlide>
            <SwiperSlide><img src={img_4} className="w-full h-full object-cover" alt="Image 4" /></SwiperSlide>
        </Swiper>
    );
};

export default Slider;