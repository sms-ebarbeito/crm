/*
* =================================================================
* ARCHIVO NUEVO: src/pages/ContactsPage.jsx
* Responsabilidad: Contener toda la lógica del módulo de Contactos.
* =================================================================
*/
import React, { useState, useEffect, useCallback } from 'react';
import ContactTable from '../components/contact/ContactTable';
import ContactFilters from '../components/contact/ContactFilters';
import ContactModal from '../components/contact/ContactModal';
import { api } from '../services/api';
import { PlusIcon } from '@heroicons/react/24/solid';

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [filters, setFilters] = useState({ searchTerm: '', salespersonId: '', statusId: '', zone: '' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    const fetchData = useCallback(async () => {
        const [fetchedSalespeople, fetchedStatuses] = await Promise.all([
            api.getSalespeople(),
            api.getStatuses()
        ]);
        setSalespeople(fetchedSalespeople);
        setStatuses(fetchedStatuses);
    }, []);

    const fetchContacts = useCallback(async () => {
        const fetchedContacts = await api.getContacts(filters);
        setContacts(fetchedContacts);
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchContacts();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchContacts]);

    const handleOpenModal = (contact = null) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const handleSaveContact = () => {
        handleCloseModal();
        fetchContacts();
        fetchData();
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
            await api.deleteContact(id);
            fetchContacts();
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestionar Contactos</h1>
                <button onClick={() => handleOpenModal()} className="bg-[#0062E0] text-white px-4 py-2 rounded-md hover:bg-[#004AAD] flex items-center">
                    <PlusIcon className="w-5 h-5 mr-2"/>
                    Crear Contacto
                </button>
            </div>

            <ContactFilters
                filters={filters}
                setFilters={setFilters}
                salespeople={salespeople}
                statuses={statuses}
            />

            <ContactTable
                contacts={contacts}
                onEdit={handleOpenModal}
                onDelete={handleDeleteContact}
            />

            {isModalOpen && (
                <ContactModal
                    contact={editingContact}
                    onClose={handleCloseModal}
                    onSave={handleSaveContact}
                    salespeople={salespeople}
                    statuses={statuses}
                />
            )}
        </>
    );
};

export default ContactsPage;
