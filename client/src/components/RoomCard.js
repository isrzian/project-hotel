import React from "react";

export const RoomCard = ({title, description, beds, cost, square, conveniences, editHandler, deleteHandler, detail, key}) => {
    return (
            <div className="row">
                <div className="col s12 m6">
                    <div key={key} className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span onClick={detail} style={{cursor: 'pointer'}} className="card-title">{title}</span>
                            <p>{description}</p>
                            <p>Beds: {beds}</p>
                            <p>Cost: {cost}</p>
                            <p>Square: {square}</p>
                            <p>Convenience: </p>
                            {
                                conveniences.length ?
                                    <ul key={key+5}>
                                        {conveniences.map((conv, index) => <li key={index + 8}>{conv._id.title + ', ' + conv.quantity + ' units'}</li>)}
                                    </ul> : <p>Conveniences not added.</p>
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