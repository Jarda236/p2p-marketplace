import {FC} from "react";
import {NavLink} from "react-router-dom";

interface PopupProps {
    text: string;
    success: boolean,
    fallbackUrl: string
}

const Popup:FC<PopupProps> = ({text, success, fallbackUrl}) => {
    return <div style={{
        position: "fixed",
        left: "0",
        right: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(150 150 150 / 80%)"}}>
        <div style={{
            position: "absolute",
            width: "50%",
            height: "50%",
            left: "25%",
            top: "10%",
            color: success ? "green" : "red",
            backgroundColor: "grey"
        }}>
            <span>Operation unsuccessfull.</span>
            <span>{text}</span>
            <NavLink to={fallbackUrl}>Back</NavLink>
        </div>
    </div>
}

export default Popup;