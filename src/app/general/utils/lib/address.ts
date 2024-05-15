import { Country, State, City } from 'country-state-city';

export const listCountries = Country.getAllCountries().map(country => country.name);

export const getCountryCode = (name: string) => Country.getAllCountries().find(country => country.name === name)?.isoCode as string;

export const listStates = (country: string) => State.getStatesOfCountry(getCountryCode(country)).map(state => state.name);

export const getStateCode = (name: string) => State.getAllStates().find(state => state.name === name)?.isoCode as string;

export const listCities = (country: string, state: string) => City.getCitiesOfState(getCountryCode(country), getStateCode(state)).map(city => city.name);

export interface IAddress {
    countries: string[];
    states: string[];
    cities: string[];
}

export function updateAddress(address: IAddress, data: any) {
    address.states = listStates(data.country);
    address.cities = listCities(data.country, data.state);
    return address;
}