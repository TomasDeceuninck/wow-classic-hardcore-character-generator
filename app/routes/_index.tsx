import React, { useEffect, useState } from 'react';
import type { WoWCharacter} from '../utils';
import { getRandomWoWCharacter } from '../utils';
import type { V2_MetaFunction } from '@remix-run/node';
//import RacesAndClasses from '../components/RacesAndClasses';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'WoW Classic Character Generator' },
    { name: 'description', content: 'A character generate for World of Warcraft Classic to help create hardcore characters.' },
  ];
};

export default function Index() {
  const [randomCharacter, setRandomCharacter] = useState<WoWCharacter | null>(null);

  useEffect(() => {
    const character = getRandomWoWCharacter('some name');
    setRandomCharacter(character);
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>WoW Classic Character Generator</h1>
      {randomCharacter && (
        <React.Fragment>
          <h2>Generated character</h2>
          <p>{randomCharacter.getDescription()}</p>
          {/* <RacesAndClasses /> */}
        </React.Fragment>
      )}
      <a target="_blank" href="https://wowclassic.blizzard.com/en-us/" rel="noreferrer">
        World of Warcraft Classic
      </a>
    </div>
  );
}
