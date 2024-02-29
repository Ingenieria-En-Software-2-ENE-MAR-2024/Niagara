import React, { useState, useRef, useEffect } from 'react';

interface MenuItem {
  title: string;
  link?: string;
  subMenuItems?: MenuItem[];
}

interface NavigationMenuProps {
  menuItems: MenuItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ menuItems }) => {
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSubMenuToggle = (index: number) => {
        setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenSubMenuIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderSubMenu = (subMenuItems: MenuItem[], parentIndex: number) => {
        return (
        <div className="absolute z-10 -ml-4 mt-1 w-48 bg-white rounded-lg shadow-lg">
            {subMenuItems.map((subMenuItem, subIndex) => (
            <div key={subIndex}>
                {subMenuItem.subMenuItems ? (
                <>
                    <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleSubMenuToggle(parentIndex)}
                    >
                    {subMenuItem.title}
                    <svg
                        className="ml-2 h-5 w-5 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ transition: 'transform 0.3s' }}
                        transform={
                        openSubMenuIndex === parentIndex
                            ? 'rotate-0'
                            : 'rotate-180'
                        }
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                            openSubMenuIndex === parentIndex
                            ? 'M19 9l-7 7-7-7'
                            : 'M5 15l7-7 7 7'
                        }
                        />
                    </svg>
                    </button>
                    {openSubMenuIndex === parentIndex &&
                    renderSubMenu(subMenuItem.subMenuItems, parentIndex)}
                </>
                ) : (
                <a
                    href={subMenuItem.link ? subMenuItem.link : '#'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    {subMenuItem.title}
                </a>
                )}
            </div>
            ))}
        </div>
        );
    };

    return (
        <nav className="bg-tertiary rounded-full" ref={menuRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                <h1 className="text-white">Niagara</h1>
                </div>
                <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    {menuItems.map((menuItem, index) => (
                    <div key={index} className="relative">
                        {menuItem.subMenuItems ? (
                        <>
                            <button
                            className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                            onClick={() => handleSubMenuToggle(index)}
                            >
                            {menuItem.title}
                            <svg
                                className="ml-2 h-5 w-5 inline-block"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ transition: 'transform 0.3s' }}
                                transform={
                                openSubMenuIndex === index
                                    ? 'rotate-0'
                                    : 'rotate-180'
                                }
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    openSubMenuIndex === index
                                    ? 'M19 9l-7 7-7-7'
                                    : 'M5 15l7-7 7 7'
                                }
                                />
                            </svg>
                            </button>
                            {openSubMenuIndex === index &&
                            renderSubMenu(menuItem.subMenuItems, index)}
                        </>
                        ) : (
                        <a
                            href={menuItem.link ? menuItem.link : '#'}
                            className="bg-primary text-white px-3 py-3 rounded-md text-sm font-medium hover:bg-gray-700"
                        >
                            {menuItem.title}
                        </a>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </nav>
    );
};

export default NavigationMenu;
