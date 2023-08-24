import React from 'react';
import { useParams } from '@remix-run/react';
import { WoWCharacter, getWoWRace, getWoWGender, getWoWClass, getWoWClassSpecialization } from '../utils';

export default function Character() {
  const params = useParams();
  const charName = params.name;
  const charRace = getWoWRace(params.raceid);
  const charGender = getWoWGender(params.genderid,charRace);
  const charClass = getWoWClass(params.classid);
  const charSpec = getWoWClassSpecialization(params.specid, charClass);
  const character = new WoWCharacter(charName, charRace, charGender, charClass, charSpec);
  return (
    <div>
      {character && (
        <React.Fragment>
          <h3>Generated character</h3>
          <div dangerouslySetInnerHTML={{ __html: character.getDescription() }}></div>
          {/* <RacesAndClasses /> */}
        </React.Fragment>
      )}
    </div>
  );
}