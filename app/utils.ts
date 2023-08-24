import type { WoWGender, WoWRace, WoWFaction, WoWClass, WoWClassSpecialization } from "./types";

// Read Data
import factionsData from './data/factions.json';
import classesData from './data/classes.json';
import racesData from './data/races.json';

export const wowFactions: WoWFaction[] = factionsData.map((item) => {
    const wowFaction: WoWFaction = {
        Name: item.Name,
        IconUri: item.IconUri
    }
    return (wowFaction)
})

export function getWoWFaction(wowFactionName: string): WoWFaction | undefined {
    return wowFactions.find(wowFaction => wowFaction.Name === wowFactionName);
}

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

export function getWoWClass(wowClassName: string): WoWClass | undefined {
    return wowClasses.find(wowClass => wowClass.Name === wowClassName);
}
export function getWoWClassSpecialization(wowClassSpecializationName: string, wowClass: WoWClass): WoWClassSpecialization | undefined {
    return wowClass.Specializations.find(wowClassSpecialization => wowClassSpecialization.Name === wowClassSpecializationName);
}

export const wowRaces: WoWRace[] = racesData.map((item) => {
    const availableGenders: WoWGender[] = item.AvailableGenders;
    const faction: WoWFaction | undefined = wowFactions.find(faction => faction.Name === item.Faction);
    const availableClasses: WoWClass[] = item.AvailableClasses.map((classItem) => {
        return wowClasses.find(wowClass => wowClass.Name === classItem)
    }).filter((classItem): classItem is WoWClass => classItem !== undefined);
    const wowRace: WoWRace = {
        Name: item.Name,
        Unit: item.Unit,
        IconUri: item.IconUri,
        Faction: faction,
        AvailableGenders: availableGenders,
        AvailableClasses: availableClasses
    }
    return (wowRace)
})

export function getWoWRace(wowRaceName: string): WoWRace | undefined {
    return wowRaces.find(wowRace => wowRace.Name === wowRaceName);
}
export function getWoWGender(wowGenderName: string, wowRace: WoWRace ): WoWGender | undefined {
    return wowRace.AvailableGenders?.find(wowGender => wowGender.Name === wowGenderName);
}

// Character definitions
export class WoWCharacter {
    Name: string;
    Gender?: WoWGender;
    Race?: WoWRace;
    Class?: WoWClass;
    Specialization?: WoWClassSpecialization;

    constructor(name: string, race?: WoWRace, gender?: WoWGender, charClass?: WoWClass, specialization?: WoWClassSpecialization) {
        this.Name = name;
        this.Race = race;
        this.Gender = gender;
        this.Class = charClass;
        this.Specialization = specialization;
    }

    // Adding type annotations for functions
    getName(): string {
        return this.Name;
    }

    getRace(): WoWRace | undefined {
        return this.Race;
    }

    getGender(): WoWGender | undefined {
        return this.Gender;
    }

    getClass(): WoWClass | undefined {
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
        if (this.Gender && this.Gender.IconUri) {
            let altText = this.Gender.Name
            if (this.Race && this.Race.Unit) {
                altText += " " + this.Race.Unit
            }
            descriptionParts.push(`<img src="${this.Gender.IconUri}" alt="${altText}">`);
        } else {
            if (this.Gender && this.Gender.Name) {
                descriptionParts.push(this.Gender.Name);
            }
            if (this.Race && this.Race.Unit) {
                descriptionParts.push(this.Race.Unit);
            }
        }
        if (this.Specialization && this.Specialization.Name) {
            if (this.Specialization.IconUri) {
                descriptionParts.push(`<img src="${this.Specialization.IconUri}" alt="${this.Specialization.Name}">`);
            } else {
                descriptionParts.push(this.Specialization.Name);
            }
        }
        if (this.Class && this.Class.Name) {
            if (this.Class.IconUri) {
                descriptionParts.push(`<img src="${this.Class.IconUri}" alt="${this.Class.Name}">`);
            } else {
                descriptionParts.push(this.Class.Name);
            }
        }

        if (descriptionParts.length > 1 && this.Name) {
            descriptionParts[0] = descriptionParts[0] + '<br />';
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
export function getRandomWoWRace(): WoWRace {
    return getRandomItem(wowRaces);
}

export function getRandomWoWGender(race: WoWRace): WoWGender | undefined {
    if (race.AvailableGenders !== undefined) {
        return getRandomItem(race.AvailableGenders);
    } else {
        return undefined;
    }
}

export function getRandomWoWClass(race: WoWRace): WoWClass | undefined {
    if (race.AvailableClasses !== undefined) {
        return getRandomItem(race.AvailableClasses);
    } else {
        return undefined;
    }

}

export function getRandomWoWClassSpecialization(wowClass?: WoWClass): WoWClassSpecialization | undefined {
    if (wowClass !== undefined) {
        return getRandomItem(wowClass.Specializations);
    } else {
        return undefined;
    }
}

export function getRandomWoWCharacter(name: string): WoWCharacter {
    const charRace = getRandomWoWRace();
    const charGender = getRandomWoWGender(charRace);
    const charClass = getRandomWoWClass(charRace);
    const charSpec = getRandomWoWClassSpecialization(charClass);

    const newChar = new WoWCharacter(name, charRace, charGender, charClass, charSpec);

    return newChar;
}

// New Random Generators
export function getRandomRace(): string {
    const race = getRandomItem(wowRaces);
    return race.Name;
  }
  
  export function getRandomClass(): string {
    // Flatten out classes into a single array
    const simplifiedClasses = wowClasses.map(wowClass => wowClass.Name);
    const charClass = getRandomItem(simplifiedClasses);
    return charClass;
  }
  
  export function getRandomGender(): string {
    // Gather all available genders into a single array
    const allGenders: WoWGender[] = [];
    wowRaces.forEach(race => {
      if (race.AvailableGenders) {
        allGenders.push(...race.AvailableGenders);
      }
    });
    const uniqueGenders = [...new Set(allGenders)]; // remove duplicates
    const gender = getRandomItem(uniqueGenders);
    return gender.Name;
  }