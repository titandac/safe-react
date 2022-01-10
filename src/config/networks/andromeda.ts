import MetisLogo from 'src/config/assets/token_metis.png'
import {
  EnvironmentSettings,
  ETHEREUM_LAYER,
  ETHEREUM_NETWORK,
  FEATURES,
  NetworkConfig,
  SHORT_NAME,
  WALLETS,
} from 'src/config/networks/network.d'

const baseConfig: EnvironmentSettings = {
  clientGatewayUrl: 'https://andromeda-infra.metissafe.tech/cgw/v1',
  txServiceUrl: 'https://andromeda-infra.metissafe.tech/txs/api/v1',
  gasPrice: 1e9, // 1 Gwei TODO: add gasPriceOracles
  rpcServiceUrl: 'https://andromeda.metis.io/?owner=1088',
  safeAppsRpcServiceUrl: 'https://andromeda.metis.io/?owner=1088',
  networkExplorerName: 'Andromeda Explorer',
  networkExplorerUrl: 'https://andromeda-explorer.metis.io/',
  networkExplorerApiUrl: 'https://andromeda-explorer.metis.io/api',
}

const andromeda: NetworkConfig = {
  environment: {
    dev: {
      ...baseConfig,
    },
    staging: {
      ...baseConfig,
    },
    production: {
      ...baseConfig,
    },
  },
  network: {
    id: ETHEREUM_NETWORK.ANDROMEDA,
    shortName: SHORT_NAME.ANDROMEDA,
    backgroundColor: '#a8fff6',
    textColor: '#2f043d',
    label: 'Andromeda',
    ethereumLayer: ETHEREUM_LAYER.L2,
    nativeCoin: {
      address: '0x0000000000000000000000000000000000000000',
      name: 'Metis',
      symbol: 'METIS',
      decimals: 18,
      logoUri: MetisLogo,
    },
  },
  disabledWallets: [
    WALLETS.TREZOR,
    WALLETS.LEDGER,
    WALLETS.COINBASE,
    WALLETS.FORTMATIC,
    WALLETS.OPERA,
    WALLETS.OPERA_TOUCH,
    WALLETS.PORTIS,
    WALLETS.TORUS,
    WALLETS.TRUST,
    WALLETS.WALLET_LINK,
    WALLETS.AUTHEREUM,
    WALLETS.LATTICE,
    WALLETS.KEYSTONE,
    WALLETS.WALLET_CONNECT,
  ],
  disabledFeatures: [FEATURES.DOMAIN_LOOKUP, FEATURES.SPENDING_LIMIT],
}

export default andromeda
