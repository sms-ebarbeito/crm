/*
* =================================================================
* ARCHIVO: src/components/layout/Sidebar.jsx (MODIFICADO)
* Responsabilidad: Navegación principal.
* =================================================================
*/
import React from 'react';
import { UsersIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

// Recibe props para saber cuál es la vista activa y para poder cambiarla
const Sidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'contacts', label: 'Contactos', icon: UsersIcon },
        { id: 'products', label: 'Productos', icon: ArchiveBoxIcon },
    ];

    return (
        <div className="w-64 bg-gray-800 text-white flex-col hidden md:flex">
            <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                <span className="text-xl font-bold">CRM</span>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-2 sidebar-scroll">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                        <a
                            key={item.id}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveView(item.id);
                            }}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                isActive ? 'bg-[#0062E0] text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </a>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;