import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const CreateRoom = () => {
    const message = useMessage()
    const {request, loading, error, clearErrors} = useHttp()
    const [conveniences, setConvenience] = useState({
        id: '', quantity: 0
    })
    const [form, setForm] = useState({
        title: '',
        description: '',
        cost: 0,
        square: 0,
        beds: 0,
        convenience: []
    })

    const [listConv, setListConv] = useState([])

    const loadListHandler = async () => {
        try {
            const listConvenience = await request('/api/convenience')
            message(listConvenience.message)
            setListConv(listConvenience)
        }
        catch (e) {}
    }

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message, clearErrors])

    useEffect(() => {
        window.M.updateTextFields()
        let tabs = document.querySelectorAll('.tabs')
        let modal = document.querySelectorAll('.modal')
        let select = document.querySelectorAll('select');
        window.M.Tabs.init(tabs)
        window.M.Modal.init(modal)
        window.M.FormSelect.init(select)
    }, [])

    const createRoomHandler = () => {

    }

    const addConvenienceHandler = () => {
        setForm(form.convenience.push())
    }

    const changeHandlerConvenience = event => {
        setForm({...conveniences, [event.target.name]: event.target.value})
    }

    const changeHandlerForm = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="col s12">
                    <ul className="tabs" style={{paddingBottom: '2rem'}}>
                        <li className="tab col s3"><a className="active" href="#basic">Basic parameters</a></li>
                        <li onClick={loadListHandler} className="tab col s3"><a href="#convenience">Convenience</a></li>
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
                        id="textarea1"
                        className="materialize-textarea"
                        name="description"
                    />
                        <label htmlFor="textarea1">Description</label>
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
                    {form.convenience.length ? null : <p>Convenience have not been added yet.</p>}
                    <div className="input-field" style={{padding: '15px 0 15px 0'}}>
                        <select defaultValue="DEFAULT" id="select">
                            <option defaultValue="DEFAULT" value="DEFAULT" disabled>Choose your option</option>
                            {listConv.map((conv, index) => <option key={index} value={conv.title}>{conv.title + ' ' + conv.manufacturer}</option>)}
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Quantity..."
                            id="quantity"
                            type="number"
                            name="quantity"
                            autoComplete="off"
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