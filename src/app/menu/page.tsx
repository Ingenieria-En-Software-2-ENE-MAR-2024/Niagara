'use client'
import React from 'react';
import NavigationMenu from '../../components/NavigationMenu';

const Menu: React.FC = () => {
    const menuItems = [
        {title: 'Inicio', link: '/',},
        {title: 'Cambio de contraseña', link: '/',},
        {
        title: 'Configuración',
        subMenuItems: [
            { title: 'Roles de Usuarios', link: '/' },
            { title: 'Logger de Eventos', link: '/' },
        ],
        },
        {title: 'Gestión de citas', link: '/',},
        {title: 'Calendario médico', link: '/',},
    ];

    return (
        <div>
        <NavigationMenu menuItems={menuItems} />
        </div>
    );
};

export default Menu;
