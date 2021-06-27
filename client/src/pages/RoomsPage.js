import React, {useEffect, useState, useCallback} from "react";
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/UI/Loader";
import {RoomCard} from "../components/RoomCard";
import {useMessage} from "../hooks/message.hook";

export const RoomsPage = () => {
    const history = useHistory()
    const message = useMessage()
    const [rooms, setRooms] = useState([])
    const {request, loading} = useHttp()
    const getRoom = useCallback(async () => {
        try {
            const fetchedRooms = await request(`/api/room/`, 'GET', null)
            console.log(fetchedRooms)
            setRooms(fetchedRooms)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    const editRoomHandler = (id) => {
        return async () => {
            history.push(`/api/room/edit/${id}`)
        }
    }

    const deleteRoomHandler = (id) => {
        return async () => {
            try {
                console.log('Rooms -', rooms)
                const data = await request(`/api/room/delete/${id}`, 'DELETE', {...rooms})
                setRooms(rooms.filter(c => c._id !== id))
                message(data.message)
            }
            catch (e) {}
        }
    }

    // if (loading) {
    //     return <Loader />
    // }

    return (
        <div>
            <h1>Rooms Page</h1>
            {
                rooms.length ?
                    rooms.map((room, index) =>
                        <RoomCard
                            title={room.title}
                            square={room.square}
                            description={room.description}
                            beds={room.beds}
                            cost={room.cost}
                            convenience={room.convenience}
                            deleteHandler={deleteRoomHandler(room._id)}
                            editHandler={editRoomHandler(room._id)}
                        />)
                            : <p>Rooms is not added.</p>
            }
        </div>
    )
}