import React from 'react';

// Se puede mover a un archivo de constantes si se usa en más lugares
const ZONAS = [
    { value: "CABA", label: "CABA (Ciudad Autónoma de Buenos Aires)" },
    { value: "BA", label: "BA (Buenos Aires)" },
    { value: "CAT", label: "CAT (Catamarca)" },
    { value: "CHA", label: "CHA (Chaco)" },
    { value: "CHU", label: "CHU (Chubut)" },
    { value: "COR", label: "COR (Córdoba)" },
    { value: "CRR", label: "CRR (Corrientes)" },
    { value: "ER", label: "ER (Entre Ríos)" },
    { value: "FOR", label: "FOR (Formosa)" },
    { value: "JUJ", label: "JUJ (Jujuy)" },
    { value: "LP", label: "LP (La Pampa)" },
    { value: "LR", label: "LR (La Rioja)" },
    { value: "MDZ", label: "MDZ (Mendoza)" },
    { value: "MIS", label: "MIS (Misiones)" },
    { value: "NEU", label: "NEU (Neuquén)" },
    { value: "RN", label: "RN (Río Negro)" },
    { value: "SAL", label: "SAL (Salta)" },
    { value: "SJ", label: "SJ (San Juan)" },
    { value: "SL", label: "SL (San Luis)" },
    { value: "SC", label: "SC (Santa Cruz)" },
    { value: "SF", label: "SF (Santa Fe)" },
    { value: "SGO", label: "SGO (Santiago del Estero)" },
    { value: "TDF", label: "TDF (Tierra del Fuego)" },
    { value: "TUC", label: "TUC (Tucumán)" },
];

const ContactFilters = ({ filters, setFilters, salespeople, statuses }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                    <label htmlFor="search-box" className="text-sm font-medium text-gray-600">Buscar por Nombre</label>
                    <input
                        type="search"
                        id="search-box"
                        name="searchTerm"
                        value={filters.searchTerm}
                        onChange={handleChange}
                        placeholder="Escriba un nombre..."
                        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
                    />
                </div>
                <div>
                    <label htmlFor="filter-salesperson" className="text-sm font-medium text-gray-600">Vendedor</label>
                    <select
                        id="filter-salesperson"
                        name="salespersonId"
                        value={filters.salespersonId}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
                    >
                        <option value="">Todos</option>
                        {salespeople.map(s => (
                            <option key={s.id} value={s.id}>{s.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="filter-status" className="text-sm font-medium text-gray-600">Estado</label>
                    <select
                        id="filter-status"
                        name="statusId"
                        value={filters.statusId}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
                    >
                        <option value="">Todos</option>
                        {statuses.map(s => (
                            <option key={s.id} value={s.id}>{s.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="filter-zone" className="text-sm font-medium text-gray-600">Zona</label>
                    <select
                        id="filter-zone"
                        name="zone"
                        value={filters.zone}
                        onChange={handleChange}
                        className="mt-1 block w-full bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5"
                    >
                        <option value="">Todas</option>
                        {ZONAS.map(zona => (
                            <option key={zona.value} value={zona.value}>{zona.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ContactFilters;