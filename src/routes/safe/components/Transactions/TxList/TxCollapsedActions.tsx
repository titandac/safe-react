import { Icon, Tooltip } from '@gnosis.pm/safe-react-components'
import { MultisigExecutionInfo } from '@gnosis.pm/safe-react-gateway-sdk'
import { default as MuiIconButton } from '@material-ui/core/IconButton'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { currentSafeNonce } from 'src/logic/safe/store/selectors'
import { LocalTransactionStatus, Transaction } from 'src/logic/safe/store/models/types/gateway.d'
import { useActionButtonsHandlers } from './hooks/useActionButtonsHandlers'
import useLocalTxStatus from 'src/logic/hooks/useLocalTxStatus'

const IconButton = styled(MuiIconButton)`
  padding: 8px !important;

  &.Mui-disabled {
    opacity: 0.4;
  }
`

type TxCollapsedActionsProps = {
  transaction: Transaction
}

export const TxCollapsedActions = ({ transaction }: TxCollapsedActionsProps): ReactElement => {
  const {
    canCancel,
    handleConfirmButtonClick,
    handleCancelButtonClick,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isPending,
    disabledActions,
  } = useActionButtonsHandlers(transaction)
  const nonce = useSelector(currentSafeNonce)
  const txStatus = useLocalTxStatus(transaction)

  const getTitle = () => {
    if (txStatus === LocalTransactionStatus.AWAITING_EXECUTION) {
      return (transaction.executionInfo as MultisigExecutionInfo)?.nonce === nonce
        ? 'Execute'
        : `Transaction with nonce ${nonce} needs to be executed first`
    }
    return 'Confirm'
  }

  return (
    <>
      <Tooltip title={getTitle()} placement="top">
        <span>
          <IconButton
            size="small"
            type="button"
            onClick={handleConfirmButtonClick}
            disabled={disabledActions}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <Icon
              type={txStatus === LocalTransactionStatus.AWAITING_EXECUTION ? 'rocket' : 'check'}
              color="primary"
              size="sm"
            />
          </IconButton>
        </span>
      </Tooltip>
      {canCancel && (
        <Tooltip title="Reject" placement="top">
          <span>
            <IconButton size="small" type="button" onClick={handleCancelButtonClick} disabled={isPending}>
              <Icon type="circleCross" color="error" size="sm" />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </>
  )
}
