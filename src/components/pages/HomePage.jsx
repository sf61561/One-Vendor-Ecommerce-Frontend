import UserNavbar from "../shared/UserNavbar";
import Slider from "../ui/Slider";


const HomePage = () => {
    return (
        <div className="flex flex-col">
            <UserNavbar />
            <Slider />
        </div>
    );
};

export default HomePage;