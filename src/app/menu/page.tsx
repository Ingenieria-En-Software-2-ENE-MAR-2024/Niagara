'use client'
import React from 'react';
import NavigationMenu from '../../components/NavigationMenu';

const Menu: React.FC = () => {
    
    const menuItems = [
        { title: 'Inicio', link: '/' },
        { 
            title: 'Configuración', 
            subMenuItems: [
            { title: 'Gestión de Usuarios', link: '/' },
            { title: 'Logger de Eventos', link: '/logger' },
            {
                title: 'Cambio de password',
                subMenuItems: [
                { title: 'Prueba', link: '/' },
                ]
            },
            ]
        },
        {
        title: 'Servicios',
        subMenuItems: [
            { title: 'Servicio1', link: '/' },
            { title: 'Servicio2', link: '/' },
        ],
        },
        { title: 'Gestión de Citas', link: '/' },
        { title: 'Calendario Médico', link: '/' },
    ];

    return (
        <div>
        <NavigationMenu menuItems={menuItems} />
        </div>
    );
};

export default Menu;
