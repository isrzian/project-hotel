import React, {Fragment} from "react";

export const RoomReview = ({room}) => {
    return (
        <Fragment>
            <h2>Room</h2>
            <p>Title: {room.title}</p>
            <p>Description: {room.description}</p>
            <p>Cost per night: {room.cost}</p>
            <p>Beds: {room.beds}</p>
            <p>Square: {room.square}</p>
            <p>Conveniences:</p>
            <ul className="collection">
                {room.conveniences.map((conv, index) => <li key={index} className="collection-item">{conv.title + ', ' + conv.quantity + ' units'}</li>)}
            </ul>
        </Fragment>
    )
}