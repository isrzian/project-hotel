import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/UI/Loader";

export const EditRoom = () => {
    const [room, setRoom] = useState({})
    const [roomConvenience, setRoomConvenience] = useState([])
    const [listAllConvenience, setListAllConvenience] = useState([])
    const roomId = useParams().id
    const {request, loading} = useHttp()
    const getRoom = useCallback(async () => {
        try {
            const fetchedRoom = request(`/api/room/${roomId}`, 'GET', null)
            setRoom(fetchedRoom)
            setRoomConvenience(fetchedRoom.conveniences)
        }
        catch (e) {}
    }, [roomId, request])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    const getListAllConvenience = useCallback(async () => {
        try {
            const listConvenience = await request('/api/convenience')
            setListAllConvenience(listConvenience)
        }
        catch (e) {}
    }, [request, setListAllConvenience])

    useEffect(() => {
        getListAllConvenience()
    }, [getListAllConvenience])

    const changeHandlerForm = event => {
        setRoom({...room, [event.target.name]: event.target.value})
    }

    const changeHandlerConvenience = event => {
        setRoomConvenience({...roomConvenience, [event.target.name]: event.target.value})
    }

    const addConvenienceRoomHandler = () => {

    }

    const putRoomHandler = () => {

    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="col s12">
                    <ul className="tabs" style={{paddingBottom: '2rem'}}>
                        <li className="tab col s3"><a className="active" href="#basic">Basic parameters</a></li>
                        <li className="tab col s3"><a href="#convenience">Convenience</a></li>
                    </ul>
                </div>
                <div id="basic" className="col s12">
                    <div className="input-field">
                        <input
                            placeholder="Enter the name of the room..."
                            id="title"
                            type="text"
                            name="title"
                            autoComplete="off"
                            value={room.title}
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="title">Name of room</label>
                    </div>
                    <div className="input-field">
                    <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
                        value={room.description}
                        onChange={changeHandlerForm}
                    />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Enter the area of the room..."
                            id="square"
                            type="number"
                            name="square"
                            autoComplete="off"
                            value={room.square}
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="square">Area in m2</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Enter the room rate per night..."
                            id="cost"
                            type="number"
                            name="cost"
                            autoComplete="off"
                            value={room.cost}
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="cost">Cost</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Enter the beds of room..."
                            id="beds"
                            type="number"
                            name="beds"
                            autoComplete="off"
                            value={room.beds}
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="beds">Beds</label>
                    </div>
                    <button
                        className="waves-effect waves-light btn pink darken-1"
                        onClick={putRoomHandler}
                        disabled={loading}
                    >
                        Edit room
                    </button>
                </div>

                <div id="convenience" className="col s12">
                    <div className="collection">
                        {
                            room.conveniences.map((conv, index) => <a key={index} href="#!" className="collection-item"><span key={index + 5} className="badge">{conv.quantity}</span>Alan</a>)
                        }
                    </div>
                    <div className="input-field" style={{padding: '15px 0 15px 0'}}>
                        <select defaultValue="DEFAULT" className="browser-default" onChange={changeHandlerConvenience} name="_id" id="_id">
                            <option defaultValue="DEFAULT" value="DEFAULT" disabled>Choose your option</option>
                            {listAllConvenience.map((conv, index) => <option key={index} value={conv._id}>{conv.title + ' ' + conv.manufacturer}</option>)}
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Quantity..."
                            id="quantity"
                            type="number"
                            name="quantity"
                            autoComplete="off"
                            onChange={changeHandlerConvenience}
                        />
                        <label htmlFor="quantity">Quantity</label>
                    </div>
                    <button
                        className="waves-effect waves-light btn pink darken-1"
                        onClick={addConvenienceRoomHandler}
                        disabled={loading}
                    >
                        Add convenience
                    </button>
                </div>
            </div>
        </div>
    )
}