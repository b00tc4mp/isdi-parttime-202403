import React, { useState, useEffect } from 'react'

import './CurrentTime.css'

import Text from '../../../components/core/Text'

function CurrentTime() {
    const [dateTime, setDateTime] = useState({ time: '', date: '' })

    useEffect(() => {
        // Función para obtener la fecha y hora actual y formatearlas
        const updateDateTime = () => {
            const now = new Date()

            // Obtener y formatear la hora
            const hours = now.getHours().toString().padStart(2, '0')
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const time = `${hours}:${minutes}`

            // Obtener y formatear la fecha
            const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            const dayName = daysOfWeek[now.getDay()]
            const day = now.getDate().toString().padStart(2, '0')
            const month = (now.getMonth() + 1).toString().padStart(2, '0') // Los meses van de 0 a 11
            const year = now.getFullYear().toString().slice(-2)
            const date = `${dayName} ${day}/${month}/${year}`

            // Actualizar el estado con la nueva fecha y hora
            setDateTime({ time, date })
        };

        // Actualizar la fecha y hora al montar el componente
        updateDateTime()

        // Configurar el intervalo para actualizar la hora cada minuto
        const intervalId = setInterval(updateDateTime, 15000)

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId)
    }, []); // El array vacío hace que useEffect se ejecute solo una vez al montar

    return <>

        <Text className={'CurrentTimeText'}>{dateTime.time}</Text>
        <Text className={'CurrentDateText'}>{dateTime.date}</Text>

    </>
}

export default CurrentTime
