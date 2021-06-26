import React from "react";

export const RoomCard = ({title, description, beds, cost, square, convenience, editHandler, deleteHandler}) => {
    return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Room {title}</span>
                            <p>{description}</p>
                            <p>Beds: {beds}</p>
                            <p>Cost: {cost}</p>
                            <p>Square: {square}</p>
                            <p>Convenience: </p>
                            {
                                convenience.length
                                    ?
                                    <ul>
                                        {convenience.map((conv, index) => <li key={index}>{conv.title + ' ' + conv.manufacturer}</li>)}
                                    </ul>
                                    : <p>Convenience is not added.</p>
                            }
                        </div>
                        <div className="card-action">
                            <button
                                className="waves-effect waves-light btn blue darken-1"
                                style={{marginRight: 20}}
                                onClick={editHandler}
                            >
                                Edit
                            </button>
                            <button
                                className="waves-effect waves-light btn pink darken-1"
                                onClick={deleteHandler}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}