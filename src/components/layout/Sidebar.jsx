import React from 'react';
import { UsersIcon } from '@heroicons/react/24/outline'; // Necesitarás instalar @heroicons/react

const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white flex-col hidden md:flex">
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
            <span className="text-xl font-bold">CRM</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2 sidebar-scroll">
            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#0062E0] rounded-md">
                <UsersIcon className="w-5 h-5 mr-3" />
                Contactos
            </a>
        </nav>
    </div>
);

export default Sidebar;