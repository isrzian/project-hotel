import React, {useEffect, useState, useCallback} from "react";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/UI/Loader";
import {RoomCard} from "../components/RoomCard";

export const RoomsPage = () => {
    const [rooms, setRooms] = useState([])
    const {request, loading} = useHttp()
    const getRoom = useCallback(async () => {
        try {
            const fetchedRoom = await request(`/api/room/`, 'GET', null)
            setRooms(fetchedRoom)
        }
        catch (e) {}
    }, [request])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    const editHandler = () => {

    }

    const deleteHandler = () => {

    }

    if (loading) {
        return <Loader />
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
                            convenience={room.convenience}
                            deleteHandler={deleteHandler}
                            editHandler={editHandler}
                        />)
                            : <p>Rooms is not added.</p>
            }
        </div>
    )
}