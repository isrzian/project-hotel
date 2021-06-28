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
            setRooms(fetchedRooms)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    const editRoomHandler = (id) => {
        return () => {
            history.push(`/edit/${id}`)
        }
    }

    const deleteRoomHandler = (id) => {
        return async () => {
            try {
                const data = await request(`/api/room/delete/${id}`, 'DELETE', {...rooms})
                setRooms(rooms.filter(c => c._id !== id))
                message(data.message)
            }
            catch (e) {}
        }
    }

    const openDetailRoom = (id) => {
        return async () => {
            try {
                history.push(`/room/${id}`)
            }
            catch (e) {}
        }
    }

    if (loading) {
        return (
            <>
                <h1>Rooms Page</h1>
                <Loader />
            </>
        )
    }

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
                            conveniences={room.conveniences}
                            deleteHandler={deleteRoomHandler(room._id)}
                            editHandler={editRoomHandler(room._id)}
                            key={index}
                            detail={openDetailRoom(room._id)}
                        />)
                            : <p>Rooms is not added.</p>
            }
        </div>
    )
}