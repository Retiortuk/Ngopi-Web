import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollHandler({ setActiveSection }) {
    const location = useLocation();
    useEffect(() => {
        if(location.hash) {
            const elementID = location.hash.substring(1);
            const element = document.getElementById(elementID);

            if(element) {
                setActiveSection(element)
                element.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
    },[location, setActiveSection])
}

export default ScrollHandler;