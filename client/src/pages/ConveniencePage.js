import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Loader} from '../components/UI/Loader'

export const ConveniencePage = () => {
    const message = useMessage()
    const {loading, error, request, clearErrors} = useHttp()
    const [form, setForm] = useState({
        title: '', manufacturer: ''
    })

    const [list, setList] = useState([])

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message, clearErrors])

    useEffect(() => {
        window.M.updateTextFields()
        let tabs = document.querySelector('.tabs')
        window.M.Tabs.init(tabs)
    }, [])

    const getListConvenience = useCallback(async () => {
        try {
            const listConvenience = await request('/api/convenience')
            setList(listConvenience)
        }
        catch (e) {}
    }, [request, setList])

    useEffect(() => {
        getListConvenience()
    }, [getListConvenience])

    const deleteConvenienceHandler = (id) => {
        return async () => {
            try {
                const data = await request(`/api/convenience/delete/${id}`, 'DELETE', {...form})
                setList(list.filter(c => c._id !== id))
                message(data.message)
            }
            catch (e) {}
        }
    }

    const createConvenienceHandler = async () => {
        try {
            const data = await request('/api/convenience/create', 'POST', {...form})
            setList([...list, form])
            setForm({title: '', manufacturer: ''})
            message(data.message)
        }
        catch (e) {}
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="col s12">
                    <ul className="tabs" style={{paddingBottom: '2rem'}}>
                        <li className="tab col s3"><a className="active" href="#add">Add convenience</a></li>
                        <li className="tab col s3"><a href="#list">List of convenience</a></li>
                    </ul>
                </div>
                <div id="add" className="col s12">
                    <div className="input-field">
                        <input
                            placeholder="Enter title convenience..."
                            id="title"
                            type="text"
                            name="title"
                            autoComplete="off"
                            value={form.title}
                            onChange={changeHandler}
                        />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Enter manufacturer..."
                            id="manufacturer"
                            type="text"
                            name="manufacturer"
                            autoComplete="off"
                            value={form.manufacturer}
                            onChange={changeHandler}
                        />
                        <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <button
                        className="waves-effect waves-light btn pink darken-1"
                        onClick={createConvenienceHandler}
                        disabled={loading}
                    >
                        Create
                    </button>
                </div>
                <div id="list" className="col s12">
                    {loading && list.length ? <Loader /> : <ul className="collection">
                        {list.length && !loading ? list.map((convenience, index) => {
                            return (
                                <li className="collection-item" key={index}>
                                    {convenience.title} - {convenience.manufacturer}
                                    <span className="badge"><i onClick={deleteConvenienceHandler(convenience._id, index)} style={{cursor: 'pointer'}} className="material-icons">clear</i></span>
                                </li>
                            )
                        }) : <p>Conveniences have not been added yet.</p>}
                    </ul>}

                </div>
            </div>
        </div>
    )
}