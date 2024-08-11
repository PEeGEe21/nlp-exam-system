import React, { useState } from "react";
import SocialButton from "./SocialButton";

const SocialLogin = () => {
    const socials = [
        {
            name: "google",
            icon: "/images/socials-img/google.png",
        },
        {
            name: "apple",
            icon: "/images/socials-img/apple.png",
        },
        {
            name: "facebook",
            icon: "/images/socials-img/facebook.png",
        },
        {
            name: "twitter",
            icon: "/images/socials-img/twitter.png",
        }
    ];

    return (
        <>
            {socials.map((social, index) => (
                <SocialButton
                    disabled={
                            "opacity-50 cursor-pointer"
                    }
                    social={social}
                    key={index}
                ></SocialButton>
            ))}
        </>
    );
};

export default SocialLogin;
