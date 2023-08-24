import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { getRandomWoWCharacter } from '../utils';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'WoW Classic Character Generator' },
    { name: 'description', content: 'A character generate for World of Warcraft Classic to help create hardcore characters.' },
  ];
};

const generateCharacterUrl = () => {
  const randomWoWCharacter = getRandomWoWCharacter('somename');
  const name = randomWoWCharacter.Name;
  const raceid = randomWoWCharacter.Race?.Name;
  const genderid = randomWoWCharacter.Gender?.Name;
  const classid = randomWoWCharacter.Class?.Name;
  const specid = randomWoWCharacter.Specialization?.Name;

  // Construct URL
  return `/character/name/${name}/race/${raceid}/gender/${genderid}/class/${classid}/spec/${specid}`;
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>WoW Classic Character Generator</h1>
      <Link to={generateCharacterUrl()}>
        <button>Generate Character</button>
      </Link>
    </div>
  );
}