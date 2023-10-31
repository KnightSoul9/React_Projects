import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProfilePic from "./components/ProfilePic";
import Introduction from "./components/Introduction"; 
import About from "./components/About";
import Services from "./components/Services";
import ProgressBar from "./components/ProgressBar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="ml-[100px] grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2"><Introduction/>
        <About/></div>
        <div className="hidden md:block">
          <ProgressBar/>
          <ProfilePic/>
          </div>
        <div><Services/>
        </div>
      </div>
    </>
  );
}

export default App;
