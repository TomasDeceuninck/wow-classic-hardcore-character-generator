export type WoWRace = {
    "Name": string;
    "Unit": string;
    "IconUri": string;
    "Faction"?: WoWFaction;
    "AvailableGenders"?: WoWGender[];
    "AvailableClasses"?: WoWClass[];
}

export type WoWFaction = {
    "Name": string;
    "IconUri": string;
}

export type WoWGender = {
    "Name": string;
    "IconUri": string;
}

export type WoWClass = {
    "Name": string;
    "IconUri": string;
    "Specializations": WoWClassSpecialization[];
}

export type WoWClassSpecialization = {
    "Name": string;
    "ClassName": string;
    "IconUri": string;
}