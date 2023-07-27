import type { WoWGender, WoWRace, WoWFaction, WoWClass, WoWClassSpecialization } from "./types";

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