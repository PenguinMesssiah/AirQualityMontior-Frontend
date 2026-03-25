import { Carousel, Image } from "react-bootstrap";

const ImageSetOne = [
    {   name: "System Assembly | Soldering", 
        src: "src/assets/photos/PXL_20250322_213921735.jpg", 
        caption: "Workshops center hands-on task-oriented activities, commmunity members build their own air quality monitors.", },
    {   name: "Server Design Discussion", 
        src: "src/assets/photos/PXL_20250315_202302757.jpg", 
        caption: "Group discussion on basic server operations and API design for our air quality monitoring sensors", },
    {   name: "System Assembly | \n Pin Layout", 
        src: "src/assets/photos/PXL_20250322_213904817.MP.jpg", 
        caption: "Soldering and pin congifuration are core activites practiced by community members", },    
    {   name: "Knowledge Transfer", 
        src: "src/assets/photos/PXL_20250315_202309417.jpg",
        caption: "Engaged community memebers learning fundamental server operations including endpoint creation", },
    {   name: "Peer Support", 
        src: "src/assets/photos/PXL_20250315_203646393.MP.jpg",
        caption: "Concise explinations supported by peers, grounded in direct application",
    },
]

function AEUCarousel() {
    return (
    <>
        <div className="font-mono">            
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