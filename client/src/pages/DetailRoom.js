import React, {useCallback, useEffect, useState, Fragment} from "react";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/UI/Loader";
import {RoomReview} from "../components/RoomReview";

export const DetailRoom = () => {
    const [room, setRoom] = useState(null)
    const roomId = useParams().id
    const {request, loading} = useHttp()
    const getRoom = useCallback(async () => {
        try {
            const fetchedRoom = await request(`/api/room/${roomId}`, 'GET', null)
            setRoom(fetchedRoom)
        }
        catch (e) {}
    }, [roomId, request])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    if (loading) {
        return <Loader />
    }

    return (
        <Fragment>
            {!loading && room && <RoomReview room={room} />}
        </Fragment>
    )
}