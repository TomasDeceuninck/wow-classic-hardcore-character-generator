import type { V2_MetaFunction } from "@remix-run/node";

type WoWCharacter = {
  "Name":string;
  "Gender":Gender;
  "Race":Race;
  "Class":WoWClass;
  "Specialization":string;
}

enum Gender {
  Male,
  Female
}

type Race = {
  "Name":string;
  "Unit":string;
  "Faction":string;
  "AvailableClasses":string[];
}

type WoWClass = {
  "Name":string;
  "Specializations":string[];
}

import racesData from '../data/races.json';
const races: Race[] = racesData as Race[];

import classesData from '../data/classes.json';
const classes: WoWClass[] = classesData as WoWClass[];

function getSpecs(className: string): string[] | undefined {
  const classObject = classes.find((item: WoWClass) => item.Name === className);
  return classObject?.Specializations;
}

function getRandomRace(): Race {
  const randomIndex = Math.floor(Math.random() * races.length);
  return races[randomIndex];
}

function getRandomClass(race: Race): WoWClass {
  const randomIndex = Math.floor(Math.random() * race.AvailableClasses.length);
  const randomClassName = race.AvailableClasses[randomIndex];
  return classes.find((item: WoWClass) => item.Name === randomClassName);
}

function getRandomSpec(wowClass: WoWClass): string {
  const randomIndex = Math.floor(Math.random() * wowClass.Specializations.length);
  return wowClass.Specializations[randomIndex];
}

function getRandomCharacter(name: string): WoWCharacter {
  const charGender = Gender[Math.round(Math.random())];
  const charRace = getRandomRace();
  const charClass = getRandomClass(charRace);
  const charSpec = getRandomSpec(charClass);
  const char: WoWCharacter = {
    Name: name,
    Gender: charGender,
    Race: charRace,
    Class: charClass,
    Specialization: charSpec
  };
  return char;
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "WoW Classic Character Generator" },
    { name: "description", content: "A character generate for World of Warcraft Classic to help create hardcore characters." },
  ];
};

export default function Index() {
  const randomCharacter = getRandomCharacter('some name');
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>WoW Classic Character Generator</h1>
      <h2>Generated character:</h2>
      {randomCharacter.Name}, a {randomCharacter.Gender} {randomCharacter.Race.Unit} {randomCharacter.Specialization} {randomCharacter.Class.Name}
      <ul>
        {races.map((race: Race) =>
          race.AvailableClasses.map((className: string) =>
            getSpecs(className)?.map((spec: string) => (
              <li key={`${race.Unit}-${spec}-${className}`}>{race.Unit} {spec} {className} </li>
            ))    
          ))
        }
      </ul>
      <a
        target="_blank"
        href="https://wowclassic.blizzard.com/en-us/"
        rel="noreferrer"
      >
        World of Warcraft Classic
      </a>
    </div>
  );
}