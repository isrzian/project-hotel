import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const CreateRoom = () => {
    const history = useHistory()
    const message = useMessage()
    const {request, loading, error, clearErrors} = useHttp()

    const [list, setList] = useState([]) // load all convenience for select
    const [listConvenienceRoom, setListConvenienceRoom] = useState([]) // list convenience for form
    const [convenience, setConvenience] = useState({})  // value for add convenience

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message, clearErrors])

    const [form, setForm] = useState({
        title: '',
        description: '',
        cost: 0,
        square: 0,
        beds: 0,
        conveniences: []
    })

    useEffect(() => {
        window.M.updateTextFields()
        let tabs = document.querySelectorAll('.tabs')
        let select = document.querySelectorAll('select');
        window.M.Tabs.init(tabs)
        window.M.FormSelect.init(select)
    }, [])

    const getListConvenience = useCallback(async () => {
        try {
            const listConvenience = await request('/api/convenience')
            setList(listConvenience)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        getListConvenience()
    }, [getListConvenience])

    const changeHandlerForm = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const changeHandlerConvenience = event => {
        setConvenience({...convenience, [event.target.name]: event.target.value})
    }

    const createRoomHandler = async () => {
        try {
            let fullForm = form
            fullForm.conveniences = listConvenienceRoom.map(list => ({
                _id: list._id,
                quantity: list.quantity,
                __v: list.__v
            }))
            const data = await request('/api/room/create', 'POST', {...fullForm})
            message(data.message)
            history.push(`/room/${data.room._id}`)
        }
        catch (e) {}
    }

    const addConvenienceHandler = () => {
        if (listConvenienceRoom.find(c => c._id === convenience.convenience)) {
            return message('This attribute has already been added!')
        }
        const selectConvenience = list.find(c => c._id === convenience.convenience)
        selectConvenience.quantity = convenience.quantity
        setListConvenienceRoom([...listConvenienceRoom, selectConvenience])
    }

    const deleteConvenienceRoomHandler = (id) => {
        return () => {
            setListConvenienceRoom(listConvenienceRoom.filter(c => c._id !== id))
        }
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
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="title">Name of room</label>
                    </div>
                    <div className="input-field">
                    <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
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
                            onChange={changeHandlerForm}
                        />
                        <label htmlFor="beds">Beds</label>
                    </div>
                    <button
                        className="waves-effect waves-light btn pink darken-1"
                        onClick={createRoomHandler}
                        disabled={loading}
                    >
                        Create room
                    </button>
                </div>

                <div id="convenience" className="col s12">
                    {
                        listConvenienceRoom.length ?
                            <div className="collection">
                                {
                                    listConvenienceRoom.map((conv, index) =>
                                    <a key={index} href="#basic" className="collection-item">
                                    <span key={index + 5} className="badge">
                                        <i onClick={deleteConvenienceRoomHandler(conv._id)} style={{cursor: 'pointer'}}
                                           className="material-icons">clear</i>
                                    </span>
                                        {conv.title + ', ' + conv.quantity + ' units'}
                                    </a>)
                                }
                            </div> : <p>Convenience not added.</p>
                    }
                    <div className="input-field" style={{padding: '15px 0 15px 0'}}>
                        <select defaultValue="DEFAULT" className="browser-default" onChange={changeHandlerConvenience} name="convenience" id="convenience">
                            <option defaultValue="DEFAULT" value="DEFAULT" disabled>Choose your option</option>
                            {list.map((conv, index) => <option key={index} value={conv._id}>{conv.title + ' ' + conv.manufacturer}</option>)}
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
                        <label htmlFor="quantity">Quantity</label>
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
    )
}