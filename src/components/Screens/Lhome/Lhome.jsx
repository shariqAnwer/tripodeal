import "./Lhome.css"
import { BookingForm } from "../../DHome/BookingForm";
import { Deals } from "../../DHome/Deals";
import { ExclusiveDeals } from "../../DHome/ExclusiveDeals";
import { Gicons } from "../../DHome/Gicons";
import { Slider2 } from "../../DHome/Slider2";
import { Slider2images } from "../../DHome/Slider2images";

const Home = () => {
    return (
        <>
            <div >
                <BookingForm />
                <Gicons />
                <Deals />
                <Slider2 slides={Slider2images} />
                <ExclusiveDeals />
            </div>
            

        </>
    )
}


export default Home