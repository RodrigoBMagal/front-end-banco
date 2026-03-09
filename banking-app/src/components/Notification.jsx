import React from "react";
import{ FaCheckCircle, FaExclamationCircle, FaInfoCircle} from "react-icons/fa";

const Notification = ({ message, type, onClose}) => {
    if (!message) return null;
    const icons = {
        success: <FaCheckCircle />,
        error: <FaExclamationCircle />,
        info: <FaInfoCircle />
    };
    return (
        <div className={`notification notification-${type}`}>
            <div className="notification-icon">{icons[type]}</div>
            <div className="notification-content">
                <div dangerouslySetInnerHTML={{ __html: message}}>
            </div>
            <button className="notification-close" onClick={onClose}>x</button>
            </div>
        </div>
    );
};

export default Notification;