export const getProvinceAbbreviation = (provinceName) => {
    if (!provinceName) return '';
    const map = {
        'Ciudad Autónoma de Buenos Aires': 'CABA', 'Buenos Aires': 'BA', 'Catamarca': 'CAT', 'Chaco': 'CHA',
        'Chubut': 'CHU', 'Córdoba': 'COR', 'Corrientes': 'CRR', 'Entre Ríos': 'ER',
        'Formosa': 'FOR', 'Jujuy': 'JUJ', 'La Pampa': 'LP', 'La Rioja': 'LR',
        'Mendoza': 'MDZ', 'Misiones': 'MIS', 'Neuquén': 'NEU', 'Río Negro': 'RN',
        'Salta': 'SAL', 'San Juan': 'SJ', 'San Luis': 'SL', 'Santa Cruz': 'SC',
        'Santa Fe': 'SF', 'Santiago del Estero': 'SGO',
        'Tierra del Fuego, Antártida e Islas del Atlántico Sur': 'TDF', 'Tucumán': 'TUC'
    };
    if (provinceName.includes('Buenos Aires')) return 'BA';
    return map[provinceName] || provinceName.substring(0, 3).toUpperCase();
};

export const formatPhoneNumberForWhatsApp = (phone, countryCode = 'AR') => {
    if (!phone) return '';
    let cleanPhone = phone.replace(/\D/g, '');

    const prefixes = { 'AR': '54', 'PY': '595', 'UY': '598' };
    const prefix = prefixes[countryCode] || '54';

    if (cleanPhone.startsWith(prefix)) return cleanPhone;
    if (countryCode === 'AR' && cleanPhone.length === 10) return `549${cleanPhone}`;

    return prefix + cleanPhone;
};

export const PROVINCES = [
    { value: "CABA", label: "CABA (Ciudad Autónoma de Buenos Aires)" },
    { value: "BA", label: "BA (Buenos Aires)" },
    { value: "CAT", label: "CAT (Catamarca)" },
    // ...Añade el resto de las provincias aquí para mantener el código limpio
];