import React from "react";
// import FuzzyText from "../../components/ui/fuzzy-text";
import { Link } from "react-router-dom";

// const hoverIntensity = 0.5;
// const enableHover = true;

const NotFound = () => {
  return (
    <div className='h-screen w-full  flex flex-col items-center justify-center'>
      {/* <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        color="#000000"
        fontSize="clamp(2rem, 5vw, 5rem)"
      > */}
      404 | Not Found
      {/* </FuzzyText> */}
      {/* this Link doesn't refresh the whole page */}
      {/* <a></a> tag refresh the whole page before rendering the page */}
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default NotFound;
