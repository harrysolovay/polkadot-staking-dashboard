// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTooltip } from 'contexts/Tooltip';
import { TooltipPosition, TooltipTrigger } from 'library/ListItem/Wrappers';
import { useRef } from 'react';

export const Members = (props: { members: string }) => {
  const { members } = props;

  const { setTooltipPosition, setTooltipMeta, open } = useTooltip();
  const posRef = useRef<HTMLDivElement>(null);
  const tooltipText = 'Pool Members';

  const toggleTooltip = () => {
    if (!open) {
      setTooltipMeta(tooltipText);
      setTooltipPosition(posRef);
    }
  };

  return (
    <div className="label pool">
      <TooltipTrigger
        className="tooltip-trigger-element"
        data-tooltip-text={tooltipText}
        onMouseMove={() => toggleTooltip()}
      />
      <TooltipPosition ref={posRef} />
      <FontAwesomeIcon icon={faUsers} />
      &nbsp;{members}
    </div>
  );
};
