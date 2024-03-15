'use client'
import React from 'react';
import NavigationMenu  from '@/components/NavigationMenu';


const Menu: React.FC = () => {


    const menuItems = [
        { title: 'Inicio', link: '/' },
        { 
            title: 'Configuración', 
            subMenuItems: [
            { title: 'Cambio de contraseña', link: '/changePassword' },
            ]
        },
        { title: 'Gestión de Citas', link: '/appointments' },
        { title: 'Calendario Médico', link: '/medicalCalendar' },
    ];

    return (
        <div>
        <NavigationMenu menuItems={menuItems} />
        </div>
    );
};

export default Menu;
