'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PacientProfile } from '@/components/profiles/Pacient';
import Menu from '@/components/Menu';

export default function Profile() {
    /*
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    //const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:300/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();

            setName(data.name);
            setUsername(data.username);
            //setId(data.ci);
            setEmail(data.email);
            setPassword(data.password);
            setRole(data.role);
        };

        fetchData();
    }, []);
    */
    const name = 'prueba';
    const username = '@prueba';
    const email = 'prueba@email.com';
    
    return (
        <div>
            <Menu/>
            
            {//role === 'Patient' ? (
                <PacientProfile user={{ name, username, email }}/>
            /*) : role === 'Medic' ? (
                <h1>¡Hola doctor!</h1>
            ) : null?*/}
            
        </div>
    )
}
