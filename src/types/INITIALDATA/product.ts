import { MutationCreateOrUpdateProductArgs } from '@lib/gql/graphql'

export type ProductFields = Partial<ProductType>

export type ProductType = MutationCreateOrUpdateProductArgs

export const INITIAL_DATA: ProductType = {
  id: 0,
  name: '',
  SKU: '',
  UPC: ''
}
