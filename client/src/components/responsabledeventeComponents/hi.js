import "./App.css";
import SideMenu, { menuItems } from "./Menu/SideMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Commander from "./commander";
import Home from "./dashboard/Default/acceuil";
import MAJEC from "./majetatcom";
import Acqui from "./acqui"
function Rventes() {
  const [inactive, setInactive] = useState(false);
  const [active, setActive] = useState('');

  const handleCallback = (childData) =>{
    setActive(childData);
    console.log(childData);
}

  return (
    <div className="App">
      
      <SideMenu
          onCollapse={(inactive) => {
            setInactive(inactive);
          }}
          active
          parentCallback = {handleCallback}
        />
        {
        active==="Commander"?<Commander/>:
        active==="Mise à jour état commande"?<MAJEC/>:
        active==="Saisit acquit à caution"?<Acqui/>:


        <Home/>}
        
    </div>
  );
}

export default Rventes;
