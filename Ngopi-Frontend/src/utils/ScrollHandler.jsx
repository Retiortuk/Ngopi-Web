import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollHandler({ setActiveSection }) {
    const location = useLocation();
    useEffect(() => {
        if(location.hash) {
            const elementID = location.hash.substring(1);
            setActiveSection(elementID)

            const timer = setTimeout(() => {
                const element = document.getElementById(elementID);
                if(element) {
                    element.scrollIntoView({behavior: 'smooth', block: 'start'});
                }
            },50);

            return () => clearTimeout(timer)
        }
    },[location, setActiveSection])

    return null;
}

export default ScrollHandler;