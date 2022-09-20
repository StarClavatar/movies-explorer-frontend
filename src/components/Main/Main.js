import { useRef } from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main(props) {
  const aboutRef = useRef(null); 
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  const handleScroll = (ref) => {
    window.scrollTo({
        top: ref.current.offsetTop-10,
        left: 0,
        behavior: "smooth",
    });
    };

  return (
    <div>
      <Promo aboutRef={aboutRef} techsRef={techsRef} aboutMeRef={aboutMeRef} handleScroll={handleScroll}/>
      <AboutProject aboutRef={aboutRef}/>
      <Techs techsRef={techsRef}/>
      <AboutMe aboutMeRef={aboutMeRef}/>
      <Portfolio />
    </div>
  );
}

export default Main;
