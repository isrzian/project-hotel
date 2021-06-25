import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const CreateRoom = () => {
    const history = useHistory()
    const message = useMessage()
    const {request, loading, error, clearErrors} = useHttp()

    const [list, setList] = useState([]) // all convenience

    const [listConvenience, setListConvenience] = useState({  //convenience for form
        _id: '', quantity: 0
    })

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
        convenience: []
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
        setListConvenience({...listConvenience, [event.target.name]: event.target.value})
        console.log(listConvenience)
    }

    const createRoomHandler = async () => {
        try {
            const data = await request('/api/room/create', 'POST', {...form})
            message(data.message)
            console.log(data.room)
            history.push(`/api/room/${data.room._id}`)
        }
        catch (e) {}
    }

    const addConvenienceHandler = () => {
        setForm(form.convenience.push(listConvenience))
        console.log('New form -', form)
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
                    <div className="collection">
                        {
                            form.convenience.map((conv, index) => <a href="#!" className="collection-item"><span className="badge">1</span>Alan</a>)
                        }
                    </div>
                    <div className="input-field" style={{padding: '15px 0 15px 0'}}>
                        <select defaultValue="DEFAULT" className="browser-default" onChange={changeHandlerConvenience} name="_id" id="_id">
                            <option defaultValue="DEFAULT" value="DEFAULT" disabled>Choose your option</option>
                            {list.map((conv, index) => <option key={index} value={conv._id}>{conv.title + ' ' + conv.manufacturer}</option>)}
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