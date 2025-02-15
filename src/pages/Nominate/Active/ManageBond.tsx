// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { ButtonPrimary } from '@rossbulat/polkadot-dashboard-ui';
import BN from 'bn.js';
import { useApi } from 'contexts/Api';
import { useBalances } from 'contexts/Balances';
import { useConnect } from 'contexts/Connect';
import { useModal } from 'contexts/Modal';
import { useStaking } from 'contexts/Staking';
import { useTransferOptions } from 'contexts/TransferOptions';
import { useUi } from 'contexts/UI';
import BondedGraph from 'library/Graphs/Bonded';
import { CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { OpenHelpIcon } from 'library/OpenHelpIcon';
import { useTranslation } from 'react-i18next';
import { humanNumber, planckBnToUnit } from 'Utils';
import { ButtonRowWrapper } from 'Wrappers';

export const ManageBond = () => {
  const { network } = useApi();
  const { units } = network;
  const { openModalWith } = useModal();
  const { activeAccount, isReadOnlyAccount } = useConnect();
  const { getLedgerForStash } = useBalances();
  const { getTransferOptions } = useTransferOptions();
  const { inSetup } = useStaking();
  const { isSyncing } = useUi();
  const ledger = getLedgerForStash(activeAccount);
  const { active }: { active: BN } = ledger;

  const allTransferOptions = getTransferOptions(activeAccount);

  const { freeBalance } = allTransferOptions;
  const { totalUnlocking, totalUnlocked, totalUnlockChuncks } =
    allTransferOptions.nominate;
  const { t } = useTranslation('pages');

  return (
    <>
      <CardHeaderWrapper>
        <h4>
          {t('nominate.bonded_funds')}
          <OpenHelpIcon helpKey="Bonding" />
        </h4>
        <h2>
          {humanNumber(planckBnToUnit(active, units))}&nbsp;{network.unit}
        </h2>
        <ButtonRowWrapper>
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            marginRight
            onClick={() =>
              openModalWith(
                'UpdateBond',
                { fn: 'add', bondType: 'stake' },
                'small'
              )
            }
            text="+"
          />
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            marginRight
            onClick={() =>
              openModalWith(
                'UpdateBond',
                { fn: 'remove', bondType: 'stake' },
                'small'
              )
            }
            text="-"
          />
          <ButtonPrimary
            disabled={
              inSetup() || isSyncing || isReadOnlyAccount(activeAccount)
            }
            iconLeft={faLockOpen}
            onClick={() =>
              openModalWith('UnlockChunks', { bondType: 'stake' }, 'small')
            }
            text={String(totalUnlockChuncks ?? 0)}
          />
        </ButtonRowWrapper>
      </CardHeaderWrapper>
      <BondedGraph
        active={planckBnToUnit(active, units)}
        unlocking={planckBnToUnit(totalUnlocking, units)}
        unlocked={planckBnToUnit(totalUnlocked, units)}
        free={planckBnToUnit(freeBalance, units)}
        inactive={inSetup()}
      />
    </>
  );
};

export default ManageBond;
