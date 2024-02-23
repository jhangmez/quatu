import { MutationCreateOrUpdatePriceArgs } from '@lib/gql/graphql'

export type PriceFields = Partial<PriceType>

export type PriceType = MutationCreateOrUpdatePriceArgs

export const INITIAL_DATA: PriceType = {
  id: 0,
  unitPrice: 0,
  bulkPrice: 0,
  bulkQuantity: 0,
  onSale: false,
  visible: false,
  currencyId: 0
}
