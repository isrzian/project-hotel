import React, {useCallback, useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/UI/Loader";
import {useMessage} from "../hooks/message.hook";

export const EditRoom = () => {
    const [room, setRoom] = useState({
        title: '',
        description: '',
        cost: 0,
        square: 0,
        beds: 0,
        conveniences: []
    })
    const [roomConvenience, setRoomConvenience] = useState([])
    const [listAllConvenience, setListAllConvenience] = useState([])
    const [convenience, setConvenience] = useState({})
    const roomId = useParams().id
    const {request, loading} = useHttp()
    const message = useMessage()
    const history = useHistory()
    const getRoom = useCallback(async () => {
        try {
            const fetchedRoom = await request(`/api/room/${roomId}`, 'GET')
            setRoom(fetchedRoom)
            setRoomConvenience(fetchedRoom.conveniences)
        }
        catch (e) {}
    }, [roomId, request])

    const getListAllConvenience = useCallback(async () => {
        try {
            const listConvenience = await request('/api/convenience')
            setListAllConvenience(listConvenience)
        }
        catch (e) {}
    }, [request, setListAllConvenience])

    useEffect(() => {
        getRoom()
        getListAllConvenience()
    }, [getRoom, getListAllConvenience])

    useEffect(() => {
        window.M.updateTextFields()
        let tabs = document.querySelectorAll('.tabs')
        let select = document.querySelectorAll('select')
        window.M.Tabs.init(tabs)
        window.M.FormSelect.init(select)
    }, [])

    const changeHandlerForm = event => {
        setRoom({...room, [event.target.name]: event.target.value})
    }

    const changeHandlerConvenience = event => {
        setConvenience({...convenience, [event.target.name]: event.target.value})
    }

    const saveRoomHandler = async () => {
        try {
            let fullForm = room
            fullForm.conveniences = roomConvenience.map(list => ({
                _id: list._id,
                quantity: list.quantity,
                __v: list.__v
            }))
            const data = await request(`/api/room/edit/${fullForm._id}`, 'PUT', {...fullForm})
            message(data.message)
            history.push(`/room/${data.room._id}`)
        }
        catch (e) {}
    }

    const deleteConvenienceRoomHandler = (id) => {
        return () => {
            setRoomConvenience(roomConvenience.filter(c => c._id !== id))
        }
    }

    const addConvenienceHandler = () => {
        if (roomConvenience.find(c => c._id === convenience.convenience)) {
            return message('This attribute has already been added!')
        }
        if (!convenience.quantity) {
            return message('Enter the quantity!')
        }
        const selectConvenience = listAllConvenience.find(c => c._id === convenience.convenience)
        const fullConvenience = {
            _id: {
                _id: selectConvenience._id,
                title: selectConvenience.title,
                manufacturer: selectConvenience.manufacturer,
                __v: selectConvenience.__v
            },
            quantity: convenience.quantity
        }
        setRoomConvenience([...roomConvenience, fullConvenience])
    }

    if (loading) {
        return (
            <>
                <h1>Edit Page</h1>
                <Loader />
            </>
        )
    }

    return (
        <>
            <h1>Edit room {room.title}</h1>
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
                            <span>Title</span>
                            <input
                                placeholder="Enter the name of the room..."
                                id="title"
                                type="text"
                                name="title"
                                value={room.title}
                                autoComplete="off"
                                onChange={changeHandlerForm}
                            />
                        </div>
                        <div className="input-field">
                            <span>Description</span>
                    <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
                        value={room.description}
                        onChange={changeHandlerForm}
                    />
                        </div>
                        <div className="input-field">
                            <span>Square</span>
                            <input
                                placeholder="Enter the area of the room..."
                                id="square"
                                type="number"
                                name="square"
                                autoComplete="off"
                                value={room.square}
                                onChange={changeHandlerForm}
                            />
                        </div>
                        <div className="input-field">
                            <span>Cost</span>
                            <input
                                placeholder="Enter the room rate per night..."
                                id="cost"
                                type="number"
                                name="cost"
                                autoComplete="off"
                                value={room.cost}
                                onChange={changeHandlerForm}
                            />
                        </div>
                        <div className="input-field">
                            <span>Beds</span>
                            <input
                                placeholder="Enter the beds of room..."
                                id="beds"
                                type="number"
                                name="beds"
                                autoComplete="off"
                                value={room.beds}
                                onChange={changeHandlerForm}
                            />
                        </div>
                        <button
                            className="waves-effect waves-light btn pink darken-1"
                            onClick={saveRoomHandler}
                            disabled={loading}
                        >
                            Save room
                        </button>
                    </div>

                    <div id="convenience" className="col s12" style={{paddingTop: '30px'}}>
                        {
                            roomConvenience.length ?
                                <div className="collection">
                                    {
                                        roomConvenience.map((conv, index) =>
                                            <a key={index} href="#basic" className="collection-item">
                                    <span key={index + 5} className="badge">
                                        <i onClick={deleteConvenienceRoomHandler(conv._id)} style={{cursor: 'pointer'}}
                                           className="material-icons">clear</i>
                                    </span>
                                                {conv._id.title + ', ' + conv.quantity + ' units'}
                                            </a>)
                                    }
                                </div> : <p>Convenience not added.</p>
                        }
                        <div className="input-field" style={{padding: '15px 0 15px 0'}}>
                            <select defaultValue="DEFAULT" className="browser-default" onChange={changeHandlerConvenience} name="convenience" id="convenience">
                                <option defaultValue="DEFAULT" value="DEFAULT" disabled>Choose your option</option>
                                {listAllConvenience.map((conv, index) => <option key={index} value={conv._id}>{conv.title + ' ' + conv.manufacturer}</option>)}
                            </select>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Quantity..."
                                id="quantity"
                                type="number"
                                min={1}
                                name="quantity"
                                autoComplete="off"
                                onChange={changeHandlerConvenience}
                            />
                        </div>
                        <button
                            className="waves-effect waves-light btn pink darken-1"
                            onClick={addConvenienceHandler}
                            disabled={loading}
                        >
                            Add convenience
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}