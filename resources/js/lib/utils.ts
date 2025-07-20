import { CitizenT } from '@/types/general';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
}
export function capitalizeFirstLetterOnly(sentence: string): string {
    if (!sentence) return '';
    const lower = sentence.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function formatterNameCitizen(citizen: CitizenT) {
    return capitalizeFirstLetter(
        `${citizen.names} ${citizen.first_surname} ${citizen.second_surname}`,
    );
}
