import React, { useState } from 'react';

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

  const handleSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <nav className="bg-tertiary rounded-full">
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
                      <button
                        className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                        onClick={() => handleSubMenuToggle(index)}
                      >
                        {menuItem.title}
                        {menuItem.subMenuItems && (
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
                        )}
                      </button>
                    ) : (
                      <a
                        href={menuItem.link ? menuItem.link : '#'}
                        className="bg-primary text-white px-3 py-3 rounded-md text-sm font-medium hover:bg-gray-700"
                      >
                        {menuItem.title}
                      </a>
                    )}
                    {menuItem.subMenuItems && openSubMenuIndex === index && (
                      <div className="absolute z-10 -ml-4 mt-1 w-48 bg-white rounded-lg shadow-lg">
                        {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subMenuItem.link ? subMenuItem.link : '#'}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subMenuItem.title}
                          </a>
                        ))}
                      </div>
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
