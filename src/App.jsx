/*
* =================================================================
* ARCHIVO: src/App.jsx (MODIFICADO)
* Responsabilidad: Layout principal y enrutamiento entre módulos.
* =================================================================
*/
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import ContactsPage from './pages/ContactsPage';
import ProductsPage from './pages/ProductsPage'; // Importamos la nueva página

function App() {
    // Estado para controlar qué módulo está activo
    const [activeView, setActiveView] = useState('contacts');

    const viewTitles = {
        contacts: 'Contactos',
        products: 'Productos',
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* El sidebar ahora recibe la vista activa y la función para cambiarla */}
            <Sidebar activeView={activeView} setActiveView={setActiveView} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title={viewTitles[activeView]} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {/* Renderizado condicional del módulo activo */}
                    {activeView === 'contacts' && <ContactsPage />}
                    {activeView === 'products' && <ProductsPage />}
                </main>
            </div>
        </div>
    );
}

export default App;