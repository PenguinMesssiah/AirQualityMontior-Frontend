import { Carousel, Image } from "react-bootstrap";

const ImageSetOne = [
    {   name: "System Assembly | Soldering", 
        src: "/photos/PXL_20250322_213921735.jpg", 
        caption: "Workshops center hands-on task-oriented activities, commmunity members build their own air quality monitors.", },
    {   name: "Server Design Discussion", 
        src: "/photos/PXL_20250315_202302757.jpg", 
        caption: "Group discussion on basic server operations and API design for our air quality monitoring sensors", },
    {   name: "System Assembly | \n Pin Layout", 
        src: "/photos/PXL_20250322_213904817.MP.jpg", 
        caption: "Soldering and pin congifuration are core activites practiced by community members", },    
    {   name: "Knowledge Transfer", 
        src: "/photos/PXL_20250315_202309417.jpg",
        caption: "Engaged community memebers learning fundamental server operations including endpoint creation", },
    {   name: "System Assembly | \n PM2.5 Sensor", 
        src: "/photos/20260403_181654.jpg", 
        caption: "Soldering and pin congifuration are core activites practiced by community members", },
    {   name: "System Assembly | \n BME280 Integration", 
        src: "/photos/20260403_183933.jpg", 
        caption: "Soldering and pin congifuration are core activites practiced by community members", 
    },    
]

function AEUCarousel() {
    return (
    <>
        <div className="font-sans">            
            <Carousel>
            {/* Carousel */}
                {ImageSetOne.map((item, index) => 
                    <Carousel.Item interval={4000} key={index}>
                        <Image src={item.src} rounded></Image>
                        <Carousel.Caption>
                            <p className="font-bold text-4xl">{item.name}</p>
                            <p className="font-semibold">{item.caption}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    </>
    )
}

export default AEUCarousel;