import React, {Fragment, useEffect} from "react";

useEffect(() => {
    window.M.updateTextFields()
    let tabs = document.querySelectorAll('.tabs')
    window.M.Tabs.init(tabs)
}, [])

export const RoomCard = ({room}) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-content">
                    <p>{room.title}</p>
                    <p>{room.description}</p>
                </div>
                <div className="card-tabs">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab"><a className="active" href="#basic">Basic information</a></li>
                        <li className="tab"><a href="#convenience">Conveniences</a></li>
                    </ul>
                </div>
                <div className="card-content grey lighten-4">
                    <div id="basic">
                        <p>Beds: {room.beds}</p>
                        <p>Cost: {room.cost}</p>
                        <p>Square: {room.square}</p>
                    </div>
                    <div id="convenience">Test conveniences</div>
                </div>
            </div>
        </Fragment>
    )
}