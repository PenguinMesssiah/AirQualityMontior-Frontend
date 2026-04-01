import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AEUCarousel from '@/Components/AEUCarousel';
import AirQualityCurriculum from '@/Components/AirQualityCurriculum';
import CommunityVoices from '@/Components/CommunityVoices';

function AboutUs() {
    return (
            <>
                <div className='font-sans text-indigo-900'>
                    <Tabs
                        defaultActiveKey="Us"
                        id="AboutUsTab"
                        className="mb-3 font-sans"
                        fill
                    >
                        <Tab eventKey="Us" title="Overview | Who Are We?">
                            <p className="flex font-bold text-2xl">A Proactive Community of Intergenerational Learners</p>
                            
                            <AEUCarousel></AEUCarousel>                        
                            
                            <p className='pt-3'>
                                In the summer of 2023, residents of the <b>Greenfield, Hazelwood, and Glen-Hazel</b> neighborhoods came together in collaboration with the local arts organization, <b>Arts Excursion Unlimited</b>, and Carnegie Mellon University's <b>Social Haptics Robotics & Education Lab</b>.
                                After multiple discussions, community members shared that the Greater Hazelwood neighborhood experiences persistent environmental issues concerning clean air due to the current continuation of steel manufacturing by the Clairton Coke Works and the Irvin and Edgar Thomson steel mills, dating back to Pittsburgh’s history as a leading steel producer during the Industrial Revolution (Phelps, 2024).    
                            </p>
                            <p className='font-bold'>Together, we built a unified air quality monitoring system to support everyone in making more informed decisions for their safety and well-being.</p>
                            
                        </Tab>
                        <Tab eventKey="Project" title="Description | What is this Project?">
                            <p className="flex pt-1 font-semibold text-3xl">Community-Driven Air Quality Tracking Using EPA AQI Standards</p>
                            <p>
                                This workshop series served local community members, regardless of age, to learn fundamental engineering
                                and software concepts to develop a cluster of air quality monitoring units to better
                                assess and record their environment to make more informed decisions about their health
                                and safety.
                            </p>

                            <AirQualityCurriculum></AirQualityCurriculum>

                            <p>
                                This series started with a discussion of fundamental principles that dictate the behavior of electricity, such as current, voltage, and resistance, mapping these concepts to electronics by breadboarding a simple LED circuit with the aforementioned microcontroller in the Arduino IDE. These concepts were reinforced in the following weeks, as participants were gradually exposed to the sensors, creating breadboard circuits with each sensor independent of the others. We paused in the assembly to create space to explore additional concepts around the code libraries used to communicate with the sensors. These broader discussions focused on open source code and object-oriented coding, with matching activities to support our transition from Windows machines to Linux-based laptops.
                            </p>

                            <hr></hr>
                            <p className="flex pt-1 font-semibold text-3xl">Results</p>
                            <CommunityVoices></CommunityVoices>
                        </Tab>
                        <Tab eventKey="How" title="Resources | How did we do it?">
                            Tab content for Slides & Assembly Photos 
                        </Tab>
                    </Tabs>
                </div>
            </>
        )
};

export default AboutUs;