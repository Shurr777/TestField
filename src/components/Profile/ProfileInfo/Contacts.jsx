import c from "./ProfileInfo.module.css";
import React from "react";

export const Contacts = ({contactName, contactValue}) =>{
    return (
        <div className={c.contactItemsBlock}>
            <div className={c.contactItem}>{contactName}</div>
            <div className={c.contactItem}>{contactValue}</div>
        </div>
    )
};