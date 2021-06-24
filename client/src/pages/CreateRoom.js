import React, {useEffect, useState} from "react";

export const CreateRoom = () => {
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
        window.M.Tabs.init(tabs)
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
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
                            onChange={changeHandler}
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
                            onChange={changeHandler}
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
                            onChange={changeHandler}
                        />
                        <label htmlFor="cost">Cost</label>
                    </div>
                </div>

                <div id="convenience" className="col s12">
                    {form.convenience.length ? null : <p>Convenience have not been added yet.</p>}
                </div>

            </div>
        </div>
    )
}