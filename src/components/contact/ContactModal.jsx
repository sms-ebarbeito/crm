import React, { useState, useEffect, useRef } from 'react';
import Modal from '../ui/Modal';
import { api } from '../../services/api';
import { useGooglePlaces } from '../../hooks/useGooglePlaces';

const emptyForm = {
    nombre: '',
    cuit_dni: '',
    email: '',
    telefono: '',
    zona: '',
    clasificacion: '',
    pais: '',
    profesion: '',
    especialidades: [],
    estado_id: null,
    vendedor_id: null,
    direccion_facturacion: { street: '', city: '', province: '', zip: '' },
    direccion_entrega: { street: '', city: '', province: '', zip: '', days: '', hours: '' },
    direccion_entrega_2: { street: '', city: '', province: '', zip: '', days: '', hours: '' },
};

const ContactModal = ({ contact, onClose, onSave, salespeople, statuses }) => {
    const [formData, setFormData] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [specialtyInput, setSpecialtyInput] = useState('');

    const billingStreetRef = useRef(null);
    const deliveryStreetRef = useRef(null);
    const delivery2StreetRef = useRef(null);

    // Efecto para inicializar el formulario al abrir el modal
    useEffect(() => {
        if (contact) {
            // Si estamos editando, llenamos el formulario con los datos del contacto
            setFormData({
                ...emptyForm, // Empezamos con el objeto base para asegurar que todos los campos existen
                ...contact,
                estado_id: contact.estado_id || '',
                vendedor_id: contact.vendedor_id || '',
                direccion_facturacion: contact.direccion_facturacion || emptyForm.direccion_facturacion,
                direccion_entrega: contact.direccion_entrega || emptyForm.direccion_entrega,
                direccion_entrega_2: contact.direccion_entrega_2 || emptyForm.direccion_entrega_2,
            });
        } else {
            // Si estamos creando, reseteamos al formulario vacío
            setFormData(emptyForm);
        }
    }, [contact]);

    const handlePlaceSelected = (prefix, { address, zone, countryCode }) => {
        setFormData(prev => ({
            ...prev,
            ...(prefix === 'billing' || prefix === 'delivery' ? { zona: zone } : {}),
            pais: countryCode,
            [`direccion_${prefix}`]: { ...prev[`direccion_${prefix}`], ...address }
        }));
    };

    useGooglePlaces(billingStreetRef, (place) => handlePlaceSelected('facturacion', place));
    useGooglePlaces(deliveryStreetRef, (place) => handlePlaceSelected('entrega', place));
    useGooglePlaces(delivery2StreetRef, (place) => handlePlaceSelected('entrega_2', place));


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (prefix, field, value) => {
        setFormData(prev => ({
            ...prev,
            [prefix]: {
                ...prev[prefix],
                [field]: value
            }
        }));
    };

    const handleAddSpecialty = (e) => {
        if (e.key === 'Enter' && specialtyInput.trim()) {
            e.preventDefault();
            if (!formData.especialidades.includes(specialtyInput.trim())) {
                setFormData(prev => ({
                    ...prev,
                    especialidades: [...prev.especialidades, specialtyInput.trim()]
                }));
            }
            setSpecialtyInput('');
        }
    };

    const handleRemoveSpecialty = (specToRemove) => {
        setFormData(prev => ({
            ...prev,
            especialidades: prev.especialidades.filter(spec => spec !== specToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre) {
            alert('El campo "Nombre / Razón Social" es obligatorio.');
            return;
        }
        if (formData.direccion_entrega.street && !formData.direccion_entrega.hours) {
            alert('El campo "Horarios de Entrega" es obligatorio si se especifica una dirección de entrega.');
            return;
        }

        setIsSaving(true);
        try {
            const dataToSave = {
                ...formData,
                estado_id: formData.estado_id ? parseInt(formData.estado_id) : null,
                vendedor_id: formData.vendedor_id ? parseInt(formData.vendedor_id) : null,
            };

            if (contact?.id) {
                await api.updateContact(contact.id, dataToSave);
            } else {
                await api.createContact(dataToSave);
            }
            onSave(); // Llama a onSave para refrescar la lista y cerrar
        } catch (error) {
            console.error("Failed to save contact", error);
            alert("Error al guardar el contacto.");
        } finally {
            setIsSaving(false);
        }
    };

    const modalTitle = contact ? "Editar Contacto" : "Crear Contacto";

    return (
        <Modal isOpen={true} onClose={onClose} title={modalTitle}>
            <form onSubmit={handleSubmit}>
                <div className="p-6 modal-body space-y-6">
                    {/* --- Información Básica --- */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-sm font-medium text-gray-700 px-2">Información Básica</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label htmlFor="contact-name" className="block mb-2 text-sm font-medium">Nombre / Razón Social <span className="text-red-500">*</span></label>
                                <input type="text" id="contact-name" name="nombre" value={formData.nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required />
                            </div>
                            {/* ... otros campos de información básica ... */}
                        </div>
                    </fieldset>

                    {/* --- Profesión y Especialidad --- */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-sm font-medium text-gray-700 px-2">Profesión y Especialidad</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label htmlFor="contact-profession" className="block mb-2 text-sm font-medium">Profesión</label>
                                <select id="contact-profession" name="profesion" value={formData.profesion} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">Ninguna</option>
                                    <option value="medico">Médico Estética</option>
                                    <option value="odontologo">Odontólogo</option>
                                </select>
                            </div>
                            {formData.profesion === 'medico' && (
                                <div>
                                    <label htmlFor="specialty-input" className="block mb-2 text-sm font-medium">Especialidades (presione Enter)</label>
                                    <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-gray-50 mb-2 min-h-[42px]">
                                        {formData.especialidades.map(spec => (
                                            <span key={spec} className="tag">
                                                {spec}
                                                <span className="tag-remove" onClick={() => handleRemoveSpecialty(spec)}>&times;</span>
                                            </span>
                                        ))}
                                    </div>
                                    <input type="text" id="specialty-input" value={specialtyInput} onChange={(e) => setSpecialtyInput(e.target.value)} onKeyDown={handleAddSpecialty} className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Añadir especialidad..." />
                                </div>
                            )}
                        </div>
                    </fieldset>

                    {/* --- Direcciones --- */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-sm font-medium text-gray-700 px-2">Direcciones</legend>
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <h4 className="font-semibold mb-2">Dirección de Facturación</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label htmlFor="billing-street" className="block mb-2 text-sm font-medium">Calle y Número</label>
                                    <input type="text" id="billing-street" ref={billingStreetRef} value={formData.direccion_facturacion.street} onChange={e => handleAddressChange('direccion_facturacion', 'street', e.target.value)} className="bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5" />
                                </div>
                                {/* ... otros campos de dirección de facturación ... */}
                            </div>
                        </div>
                        {/* ... otros fieldsets de dirección ... */}
                    </fieldset>

                    {/* --- Asignación --- */}
                    <fieldset className="border p-4 rounded-lg">
                        <legend className="text-sm font-medium text-gray-700 px-2">Asignación</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label htmlFor="contact-status" className="block mb-2 text-sm font-medium">Estado</label>
                                <select id="contact-status" name="estado_id" value={formData.estado_id || ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">Sin asignar</option>
                                    {statuses.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="contact-salesperson" className="block mb-2 text-sm font-medium">Vendedor Asignado</label>
                                <select id="contact-salesperson" name="vendedor_id" value={formData.vendedor_id || ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
                                    <option value="">Sin asignar</option>
                                    {salespeople.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="flex items-center p-6 border-t">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button type="button" onClick={onClose} className="ml-3 text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5">
                        Cancelar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ContactModal;