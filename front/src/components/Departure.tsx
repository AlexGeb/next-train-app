import React from 'react';
import ListItem from '@material-ui/core/ListItem';

import RerIcon from './Icons/RerIcon';

type PropsType = {
  departure: IDeparture;
  index: number;
};

export const Departure = (props: PropsType) => {
  const { index, departure } = props;
  const {
    displayInformations,
    stopDateTime: { departureDateTime },
  } = departure;
  return (
    <ListItem>
      <div color={displayInformations.color}>
        <span>{displayInformations.headsign}</span>
      </div>
      <div>
        <span>{departureDateTime}</span>
      </div>
      <div>
        <RerIcon label={displayInformations.label} />
      </div>
      <div>
        <span>
          {displayInformations.direction.replace('Gare de ', '').split('(')[0]}
        </span>
      </div>
    </ListItem>
  );
};
