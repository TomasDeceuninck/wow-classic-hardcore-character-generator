import type { WoWGender, WoWRace, WoWFaction, WoWClass, WoWClassSpecialization } from "./types";

// Read Data
import gendersData from './data/genders.json';
import factionsData from './data/factions.json';
import classesData from './data/classes.json';
import racesData from './data/races.json';

export const wowGenders: WoWGender[] = gendersData.map((item) => {
    const wowGender: WoWGender = {
        Name: item.Name,
        IconUri: item.IconUri
    }
    return (wowGender)
})

export const wowFactions: WoWFaction[] = factionsData.map((item) => {
    const wowFaction: WoWFaction = {
        Name: item.Name,
        IconUri: item.IconUri
    }
    return (wowFaction)
})

export const wowClasses: WoWClass[] = classesData.map((item) => {
    const wowClassSpecializations: WoWClassSpecialization[] = item.Specializations.map((specItem) => {
        const wowClassSpecialization: WoWClassSpecialization = {
            Name: specItem.Name,
            ClassName: item.Name,
            IconUri: specItem.IconUri
        }
        return (wowClassSpecialization)
    })
    const wowClass: WoWClass = {
        Name: item.Name,
        IconUri: item.IconUri,
        Specializations: wowClassSpecializations
    }
    return (wowClass)
})

export const wowRaces: WoWRace[] = racesData.map((item) => {
    const faction: WoWFaction | undefined = wowFactions.find(faction => faction.Name === item.Faction);
    const availableClasses: WoWClass[] = item.AvailableClasses.map((classItem) => {
        return wowClasses.find(wowClass => wowClass.Name === classItem)
    }).filter((classItem): classItem is WoWClass => classItem !== undefined);
    const wowRace: WoWRace = {
        Name: item.Name,
        Unit: item.Unit,
        IconUri: item.IconUri,
        Faction: faction,
        AvailableClasses: availableClasses
    }
    return (wowRace)
})

// Character definitions
export class WoWCharacter {
    Name: string;
    Gender?: WoWGender;
    Race?: WoWRace;
    Class?: WoWClass;
    Specialization?: WoWClassSpecialization;

    constructor(name: string, gender?: WoWGender, race?: WoWRace, charClass?: WoWClass, specialization?: WoWClassSpecialization) {
        this.Name = name;
        this.Gender = gender;
        this.Race = race;
        this.Class = charClass;
        this.Specialization = specialization;
    }

    // Adding type annotations for functions
    getName(): string {
        return this.Name;
    }

    getGender(): WoWGender | undefined {
        return this.Gender;
    }

    getRace(): WoWRace | undefined {
        return this.Race;
    }

    getClass (): WoWClass | undefined {
        return this.Class;
    }

    getSpecialization(): WoWClassSpecialization | undefined {
        return this.Specialization;
    }

    setName(name: string): void {
        this.Name = name;
    }

    setGender(gender: WoWGender): void {
        this.Gender = gender;
    }

    setRace(race: WoWRace): void {
        this.Race = race;
    }

    setClass(charClass: WoWClass): void {
        this.Class = charClass;
    }

    setSpecialization(spec: WoWClassSpecialization): void {
        this.Specialization = spec;
    }

    // additional functionality
    getDescription(): string {
        let descriptionParts = [];

        // Add all defined properties to the array
        if (this.Name) {
            descriptionParts.push(this.Name);
        }
        if (this.Gender && this.Gender.Name) {
            descriptionParts.push(this.Gender.Name);
        }
        if (this.Race && this.Race.Unit) {
            descriptionParts.push(this.Race.Unit);
        }
        if (this.Specialization && this.Specialization.Name) {
            descriptionParts.push(this.Specialization.Name);
        }
        if (this.Class && this.Class.Name) {
            descriptionParts.push(this.Class.Name);
        }

        if (descriptionParts.length > 1 && this.Name) {
            descriptionParts[0] = descriptionParts[0] + ', a';
        }

        return descriptionParts.join(' ');
    }
}

// Helper Functions
function getRandomItem<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// Generator Functions
export function getRandomWoWGender(): WoWGender {
    return getRandomItem(wowGenders);
}

export function getRandomWoWRace(): WoWRace {
    return getRandomItem(wowRaces);
}

export function getRandomWoWClass(race: WoWRace): WoWClass | undefined {
    if(race.AvailableClasses !== undefined){
        return getRandomItem(race.AvailableClasses);
    } else {
        return undefined;
    }
    
}

export function getRandomWoWClassSpecialization(wowClass?: WoWClass): WoWClassSpecialization | undefined {
    if(wowClass !== undefined){
        return getRandomItem(wowClass.Specializations);
    } else {
        return undefined;
    }
}

export function getRandomWoWCharacter(name: string): WoWCharacter {
    const charGender = getRandomWoWGender();
    const charRace = getRandomWoWRace();
    const charClass = getRandomWoWClass(charRace);
    const charSpec = getRandomWoWClassSpecialization(charClass);

    const newChar = new WoWCharacter(name,charGender,charRace,charClass,charSpec);

    return newChar;
}