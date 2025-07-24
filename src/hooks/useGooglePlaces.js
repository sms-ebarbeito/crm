import { useEffect, useRef } from 'react';
import { getProvinceAbbreviation } from '../utils/helpers';

export const useGooglePlaces = (inputRef, onPlaceSelected) => {
    const autocompleteRef = useRef(null);

    useEffect(() => {
        if (window.google && inputRef.current) {
            const options = {
                componentRestrictions: { country: ["ar", "py", "uy"] },
                fields: ["address_components"],
            };
            autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                if (place && place.address_components) {
                    onPlaceSelected(parsePlace(place));
                }
            });
        }

        // Cleanup function para remover el listener
        return () => {
            if (autocompleteRef.current) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [inputRef, onPlaceSelected]);
};

function parsePlace(place) {
    let streetNumber = '', route = '', province = '', countryCode = '';
    const address = { city: '', province: '', zip: '', street: '' };

    for (const component of place.address_components) {
        const type = component.types[0];
        if (type === "street_number") streetNumber = component.long_name;
        if (type === "route") route = component.long_name;
        if (type === "locality") address.city = component.long_name;
        if (type === "administrative_area_level_1") province = component.long_name;
        if (type === "postal_code") address.zip = component.long_name;
        if (type === "country") countryCode = component.short_name;
    }

    address.province = province;
    address.street = `${route} ${streetNumber}`.trim();
    const zone = getProvinceAbbreviation(province);

    return { address, zone, countryCode };
}