import { useEffect, useState, useRef } from 'react';
import './MainDashboard.css';
import { FaFire } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { FaFirefox } from "react-icons/fa";
import { TbAwardFilled } from "react-icons/tb";
import axios from 'axios';

const MainDashboard = ({ member_id }) => {
    const [vata, setVata] = useState();
    const [pitta, setPitta] = useState();
    const [kapha, setKapha] = useState();
    const [healthTips, setHealthTips] = useState([]);


    // Slideshow
    const colors = ["#5F6F52", "#A9B388", "#FEFAE0", "#F9EBC7", "#B99470", "#C4661F", "#783D19", "#5F6F52", "#A9B388", "#FEFAE0"];
    const [index, setIndex] = useState(0);
    const delay = 4200;
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) =>
                prevIndex === colors.length - 1 ? 0 : prevIndex + 1
            ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/DailyHealthTips').then((data) => {
                setHealthTips([...data.data])
            }).catch(err => {
                console.log(err);
            })
        }
        catch (error) {
            console.error(error);
        }

        // return () => setHealthTips([...data.data]);
    }, []);
    console.log(healthTips);

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/latestDoshaScore', { member_id }).then((dosha) => {
                setVata(dosha.data.vatta);
                setPitta(dosha.data.pitta);
                setKapha(dosha.data.kapha);

            }).catch(err => {
                console.log(err);
            })
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className="col main pt-5 mt-2">
            <p></p>
            <div className="row mb-3">
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100" style={{ backgroundColor: "#9E523B", borderRadius: '20px' }}>
                        <div className="card-body" style={{ backgroundColor: "#9E523B", borderRadius: '20px' }}>
                            <div className="rotate">
                                {/* <i className="fa fa-solid fa-leaf fa-5x"></i> */}
                                <FaLeaf style={{ color: '#86DC3D', fontSize: '70px' }} />
                                <p></p>
                            </div>
                            <h6 className="text-uppercase">Kapha</h6>
                            <h1 className="display-4">{kapha}<span>/10</span></h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100" style={{ backgroundColor: "#B9030A", borderRadius: '20px' }}>
                        <div className="card-body" style={{ backgroundColor: "#B9030A", borderRadius: '20px' }}>
                            <div className="rotate">
                                <FaFire style={{ color: '#FCA510', fontSize: '70px' }} />
                                <p></p>
                            </div>
                            <h6 className="text-uppercase">Pitta</h6>
                            <h1 className="display-4">{pitta}<span>/10</span></h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-info h-100" style={{ backgroundColor: "#08254C", borderRadius: '20px' }}>
                        <div className="card-body" style={{ backgroundColor: "#08254C", borderRadius: '20px' }}>
                            <div className="rotate">
                                <FaFirefox style={{ color: '#D0EFFF', fontSize: '70px' }} />
                                <p></p>
                            </div>
                            <h6 className="text-uppercase">Vata</h6>
                            <h3 className="display-4">{vata}<span>/10</span></h3>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6 py-2">
                    <div class="card text-white bg-warning h-100" style={{ backgroundColor: "#481F01", borderRadius: '20px' }}>
                        <div className="card-body" style={{ backgroundColor: "#481F01", borderRadius: '20px' }}>
                            <div class="rotate">
                                <TbAwardFilled style={{ color: '#FFB300', fontSize: '70px' }} />
                                <p></p>
                            </div>
                            <h6 class="text-uppercase">Streaks</h6>
                            <h1 class="display-4">12</h1>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <h5 class="mt-3 mb-3 text-secondary">
                Health Tips
            </h5>


            <div className="slideshow">
                <div className="slideshowSlider"
                    style={{ transform: `translate3d(${-index * 700}px, 0, 0)` }}
                >
                    {colors.map((backgroundColor, index) => (
                        <div className="slide" key={index} style={{ backgroundColor }}>
                            <div className='slideshowText'>
                                {healthTips.length > 0 ?

                                    <div>
                                        <p className='testtt'>
                                            {healthTips[index].tip}
                                        </p>
                                    </div>
                                    :
                                    ''}
                                {console.log(healthTips)}

                            </div>



                        </div>
                    ))}
                </div>

                <div className="slideshowDots">
                    {colors.map((_, idx) => (
                        <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`}
                            onClick={() => { setIndex(idx); }}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default MainDashboard