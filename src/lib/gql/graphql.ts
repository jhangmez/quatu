/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Asesor = {
  __typename?: 'Asesor';
  company?: Maybe<Company>;
  companyId: Scalars['Int']['output'];
  correo: Scalars['String']['output'];
  descripcion: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  nombre: Scalars['String']['output'];
  telefono: Scalars['String']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Category = {
  __typename?: 'Category';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  linkImageCategory?: Maybe<LinkImageCategory>;
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['Int']['output']>;
  product?: Maybe<Array<Maybe<Product>>>;
  subcategory?: Maybe<Array<Maybe<Category>>>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type Company = {
  __typename?: 'Company';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  suscription?: Maybe<Suscription>;
};

export type CompanyName = {
  __typename?: 'CompanyName';
  name: Scalars['String']['output'];
};

export type ContentProduct = {
  __typename?: 'ContentProduct';
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  typeContentProduct?: Maybe<TypeContentProduct>;
};

export type Currency = {
  __typename?: 'Currency';
  abbreviation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type LinkImageCategory = {
  __typename?: 'LinkImageCategory';
  category?: Maybe<Category>;
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  namefile: Scalars['String']['output'];
  typefile?: Maybe<Scalars['String']['output']>;
};

export type LinkImageList = {
  __typename?: 'LinkImageList';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  list?: Maybe<List>;
  namefile: Scalars['String']['output'];
  typefile?: Maybe<Scalars['String']['output']>;
};

export type LinkImageProduct = {
  __typename?: 'LinkImageProduct';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  namefile: Scalars['String']['output'];
  product?: Maybe<Product>;
  typefile?: Maybe<Scalars['String']['output']>;
};

export type List = {
  __typename?: 'List';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  linkImageList?: Maybe<LinkImageList>;
  name: Scalars['String']['output'];
  product?: Maybe<Array<Maybe<Product>>>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProfileForUser?: Maybe<Profile>;
  changePassword?: Maybe<Message>;
  createAdmin?: Maybe<AuthPayload>;
  createCategory?: Maybe<Category>;
  createContentCaracteristicas?: Maybe<ContentProduct>;
  createContentDescripcion?: Maybe<ContentProduct>;
  createContentEspecificaciones?: Maybe<ContentProduct>;
  createContentOtros?: Maybe<ContentProduct>;
  createContentVideos?: Maybe<ContentProduct>;
  createListWithProducts?: Maybe<List>;
  createPrice?: Maybe<Price>;
  createProduct?: Maybe<Product>;
  createStock?: Maybe<Stock>;
  createSubcategoryWithProducts?: Maybe<Category>;
  createWorker?: Maybe<Message>;
  deleteCategory?: Maybe<Category>;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  login?: Maybe<AuthPayload>;
  rootchangePassword?: Maybe<Message>;
  togglePublishPost?: Maybe<Post>;
  updateCategory?: Maybe<Category>;
  updateContentCaracteristicas?: Maybe<ContentProduct>;
  updateContentDescripcion?: Maybe<ContentProduct>;
  updateContentEspecificaciones?: Maybe<ContentProduct>;
  updateContentOtros?: Maybe<ContentProduct>;
  updateContentVideos?: Maybe<ContentProduct>;
  updateListWithProducts?: Maybe<List>;
  updatePrice?: Maybe<Price>;
  updateProduct?: Maybe<Product>;
  updateStock?: Maybe<Stock>;
  updateSubcategoryWithProducts?: Maybe<Category>;
  upsertAsesor?: Maybe<Asesor>;
};


export type MutationAddProfileForUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  userUniqueInput: UserUniqueInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateAdminArgs = {
  companyId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  typeUserID: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  namefile?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateContentCaracteristicasArgs = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationCreateContentDescripcionArgs = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationCreateContentEspecificacionesArgs = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationCreateContentOtrosArgs = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationCreateContentVideosArgs = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  productId: Scalars['Int']['input'];
};


export type MutationCreateListWithProductsArgs = {
  name: Scalars['String']['input'];
  productIds: Array<Scalars['Int']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreatePriceArgs = {
  bulkPrice?: InputMaybe<Scalars['Float']['input']>;
  bulkQuantity?: InputMaybe<Scalars['Int']['input']>;
  currencyId: Scalars['Int']['input'];
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  productId: Scalars['Int']['input'];
  unitPrice: Scalars['Float']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateProductArgs = {
  SKU?: InputMaybe<Scalars['String']['input']>;
  UPC?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateStockArgs = {
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCreateSubcategoryWithProductsArgs = {
  name: Scalars['String']['input'];
  parentId: Scalars['Int']['input'];
  productIds: Array<Scalars['Int']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCreateWorkerArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRootchangePasswordArgs = {
  idUser: Scalars['Int']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['Int']['input'];
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  namefile?: InputMaybe<Scalars['String']['input']>;
  visible: Scalars['Boolean']['input'];
};


export type MutationUpdateContentCaracteristicasArgs = {
  TypeContentProductId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateContentDescripcionArgs = {
  TypeContentProductId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateContentEspecificacionesArgs = {
  TypeContentProductId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateContentOtrosArgs = {
  TypeContentProductId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateContentVideosArgs = {
  TypeContentProductId?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateListWithProductsArgs = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdatePriceArgs = {
  bulkPrice?: InputMaybe<Scalars['Float']['input']>;
  bulkQuantity?: InputMaybe<Scalars['Int']['input']>;
  currencyId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateProductArgs = {
  SKU?: InputMaybe<Scalars['String']['input']>;
  UPC?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateStockArgs = {
  id: Scalars['Int']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateSubcategoryWithProductsArgs = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpsertAsesorArgs = {
  correo: Scalars['String']['input'];
  descripcion: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link: Scalars['String']['input'];
  nombre: Scalars['String']['input'];
  telefono: Scalars['String']['input'];
};

export type NewContentInput = {
  TypeContentProductId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
};

export type NewPriceInput = {
  bulkPrice?: InputMaybe<Scalars['Float']['input']>;
  bulkQuantity?: InputMaybe<Scalars['Int']['input']>;
  currencyId: Scalars['Int']['input'];
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  unitPrice: Scalars['Float']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NewStockInput = {
  quantity: Scalars['Int']['input'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewCount: Scalars['Int']['output'];
};

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Price = {
  __typename?: 'Price';
  bulkPrice?: Maybe<Scalars['Float']['output']>;
  bulkQuantity?: Maybe<Scalars['Int']['output']>;
  company?: Maybe<Company>;
  currency?: Maybe<Currency>;
  id: Scalars['Int']['output'];
  onSale?: Maybe<Scalars['Boolean']['output']>;
  unitPrice: Scalars['Float']['output'];
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type Product = {
  __typename?: 'Product';
  SKU?: Maybe<Scalars['String']['output']>;
  UPC?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Array<Maybe<Category>>>;
  company?: Maybe<Company>;
  contentProduct?: Maybe<Array<Maybe<ContentProduct>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Array<Maybe<LinkImageProduct>>>;
  list?: Maybe<Array<Maybe<List>>>;
  name: Scalars['String']['output'];
  price?: Maybe<Array<Maybe<Price>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type ProductFilterInput = {
  orderBy?: InputMaybe<SortOrder>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<Category>;
  allCategoriesByCompany: Array<Category>;
  allCategoriesByCompanyOnlyVisible: Array<Category>;
  allImagesProducts: Array<LinkImageProduct>;
  allLists: Array<List>;
  allListsByCompany: Array<List>;
  allPrices: Array<Price>;
  allProducts: Array<Product>;
  allProductsByCompany: Array<Product>;
  allSubcategories: Array<Category>;
  allSubcategoriesByCategory: Array<Category>;
  allSubcategoriesByCompany: Array<Category>;
  allTypeUser: Array<TypeUser>;
  allUsers: Array<User>;
  allWorkers: Array<User>;
  asesoresByCompany: Array<Asesor>;
  feed: Array<Post>;
  getAllSubcategoriesbyCategoryCompanyId?: Maybe<Category>;
  getCategory?: Maybe<Category>;
  getCompanyId?: Maybe<CompanyId>;
  getCompanyName?: Maybe<CompanyName>;
  getProduct?: Maybe<Product>;
  getSuscriptionCompany?: Maybe<SuscriptionbyCompany>;
  listByCompany?: Maybe<List>;
  me?: Maybe<User>;
  postById?: Maybe<Post>;
  productById?: Maybe<Product>;
  productByIdAndCompanyId?: Maybe<Product>;
  productsByList: Array<Product>;
  productsBySubcategory: Array<Product>;
  subcategoryByCompany?: Maybe<Category>;
  usersByCompany: Array<User>;
  workerCountByCompany?: Maybe<Scalars['Int']['output']>;
};


export type QueryAllCategoriesByCompanyArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllCategoriesByCompanyOnlyVisibleArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryAllListsByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryAllProductsByCompanyArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllSubcategoriesByCategoryArgs = {
  categoryId: Scalars['Int']['input'];
};


export type QueryAllSubcategoriesByCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryAllWorkersArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAsesoresByCompanyArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFeedArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllSubcategoriesbyCategoryCompanyIdArgs = {
  companyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetCompanyNameArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSuscriptionCompanyArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryListByCompanyArgs = {
  companyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductByIdArgs = {
  companyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryProductByIdAndCompanyIdArgs = {
  companyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryProductsByListArgs = {
  listId: Scalars['Int']['input'];
};


export type QueryProductsBySubcategoryArgs = {
  subcategoryId: Scalars['Int']['input'];
};


export type QuerySubcategoryByCompanyArgs = {
  companyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};


export type QueryUsersByCompanyArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryWorkerCountByCompanyArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Status = {
  __typename?: 'Status';
  status: Scalars['Boolean']['output'];
};

export type Stock = {
  __typename?: 'Stock';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  product?: Maybe<Product>;
  quantity: Scalars['Int']['output'];
};

export type Suscription = {
  __typename?: 'Suscription';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type SuscriptionbyCompany = {
  __typename?: 'SuscriptionbyCompany';
  name: Scalars['String']['output'];
};

export type TypeContentCategory = {
  __typename?: 'TypeContentCategory';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TypeContentProduct = {
  __typename?: 'TypeContentProduct';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TypeUser = {
  __typename?: 'TypeUser';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<Profile>;
  typeuser?: Maybe<TypeUser>;
  username: Scalars['String']['output'];
};

export type UserUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyId = {
  __typename?: 'companyId';
  companyId: Scalars['Int']['output'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null } | null };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'Message', message: string, status: boolean } | null };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  link: Scalars['String']['input'];
  namefile?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'Category', id: number, name: string, visible?: boolean | null, linkImageCategory?: { __typename?: 'LinkImageCategory', link: string } | null } | null };

export type RootchangePasswordMutationVariables = Exact<{
  idUser: Scalars['Int']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type RootchangePasswordMutation = { __typename?: 'Mutation', rootchangePassword?: { __typename?: 'Message', message: string, status: boolean } | null };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  visible: Scalars['Boolean']['input'];
  link: Scalars['String']['input'];
  namefile?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'Category', name: string, visible?: boolean | null, linkImageCategory?: { __typename?: 'LinkImageCategory', link: string } | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: { __typename?: 'Category', id: number } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name?: string | null, username: string, company?: { __typename?: 'Company', id: number, name: string, suscription?: { __typename?: 'Suscription', name: string } | null } | null, typeuser?: { __typename?: 'TypeUser', id: number, name: string } | null } | null };

export type GetCategoryQueryVariables = Exact<{
  getCategoryId: Scalars['Int']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory?: { __typename?: 'Category', id: number, name: string, visible?: boolean | null, linkImageCategory?: { __typename?: 'LinkImageCategory', link: string } | null } | null };

export type GetProductQueryVariables = Exact<{
  getProductId: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', SKU?: string | null, UPC?: string | null, id: number, name: string, visible?: boolean | null, category?: Array<{ __typename?: 'Category', subcategory?: Array<{ __typename?: 'Category', name: string } | null> | null } | null> | null, image?: Array<{ __typename?: 'LinkImageProduct', link: string } | null> | null, price?: Array<{ __typename?: 'Price', bulkPrice?: number | null, bulkQuantity?: number | null, unitPrice: number, onSale?: boolean | null, visible?: boolean | null } | null> | null } | null };

export type AllSubcategoriesByCategoryQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type AllSubcategoriesByCategoryQuery = { __typename?: 'Query', allSubcategoriesByCategory: Array<{ __typename?: 'Category', id: number, name: string, visible?: boolean | null, linkImageCategory?: { __typename?: 'LinkImageCategory', link: string } | null }> };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, name?: string | null, typeuser?: { __typename?: 'TypeUser', id: number, name: string } | null }> };

export type AllTypeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTypeUserQuery = { __typename?: 'Query', allTypeUser: Array<{ __typename?: 'TypeUser', id: number, name: string }> };

export type AllProductsByCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProductsByCompanyQuery = { __typename?: 'Query', allProductsByCompany: Array<{ __typename?: 'Product', id: number, name: string, visible?: boolean | null, SKU?: string | null, UPC?: string | null }> };

export type AllCategoriesByCompanyQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AllCategoriesByCompanyQuery = { __typename?: 'Query', allCategoriesByCompany: Array<{ __typename?: 'Category', id: number, name: string, visible?: boolean | null, linkImageCategory?: { __typename?: 'LinkImageCategory', link: string } | null }> };

export type AllListsByCompanyQueryVariables = Exact<{
  companyId: Scalars['Int']['input'];
}>;


export type AllListsByCompanyQuery = { __typename?: 'Query', allListsByCompany: Array<{ __typename?: 'List', id: number, name: string, visible?: boolean | null, company?: { __typename?: 'Company', name: string } | null, product?: Array<{ __typename?: 'Product', id: number, name: string, SKU?: string | null, UPC?: string | null, visible?: boolean | null, image?: Array<{ __typename?: 'LinkImageProduct', link: string } | null> | null } | null> | null, linkImageList?: { __typename?: 'LinkImageList', link: string } | null }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visible"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namefile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"visible"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visible"}}},{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}},{"kind":"Argument","name":{"kind":"Name","value":"namefile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namefile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"linkImageCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const RootchangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RootchangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"idUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rootchangePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"idUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"idUser"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RootchangePasswordMutation, RootchangePasswordMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visible"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namefile"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"visible"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visible"}}},{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}},{"kind":"Argument","name":{"kind":"Name","value":"namefile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namefile"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"linkImageCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"suscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"typeuser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"linkImageCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getProductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getProductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"SKU"}},{"kind":"Field","name":{"kind":"Name","value":"UPC"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkPrice"}},{"kind":"Field","name":{"kind":"Name","value":"bulkQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"onSale"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visible"}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const AllSubcategoriesByCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSubcategoriesByCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allSubcategoriesByCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"linkImageCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<AllSubcategoriesByCategoryQuery, AllSubcategoriesByCategoryQueryVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"typeuser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const AllTypeUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTypeUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTypeUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AllTypeUserQuery, AllTypeUserQueryVariables>;
export const AllProductsByCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllProductsByCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProductsByCompany"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"SKU"}},{"kind":"Field","name":{"kind":"Name","value":"UPC"}}]}}]}}]} as unknown as DocumentNode<AllProductsByCompanyQuery, AllProductsByCompanyQueryVariables>;
export const AllCategoriesByCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllCategoriesByCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCategoriesByCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"linkImageCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<AllCategoriesByCompanyQuery, AllCategoriesByCompanyQueryVariables>;
export const AllListsByCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllListsByCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allListsByCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"SKU"}},{"kind":"Field","name":{"kind":"Name","value":"UPC"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"linkImageList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<AllListsByCompanyQuery, AllListsByCompanyQueryVariables>;