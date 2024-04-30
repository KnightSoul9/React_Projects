// it is for the repetitve use of the button 
import React from "react";
// we pass children as input it is just a text and nothing 
export default function Button({
    // here we are passing the default arguments in it and when we are using this component than we can pass custom argument 
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",//here class name is empty coz we can add different class as per need 
    ...props //this is for spreading the props other than mentioned above   
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
