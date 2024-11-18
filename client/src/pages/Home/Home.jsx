import React from "react";
import HomeSection1 from "./components/HomeSection1";
import HomeSection2 from "./components/HomeSection2";
import HomeSection3 from "./components/HomeSection3";
import Main from "./components/Main";

function Home() {
  return (
    <>
      <div className="flex flex-col gap-8">
        <Main />
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
      </div>
    </>
  );
}

export default Home;
