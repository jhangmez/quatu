/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n": types.LoginDocument,
    "\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n": types.ChangePasswordDocument,
    "\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}": types.RootchangePasswordDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n": types.MeDocument,
    "\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n": types.AllUsersDocument,
    "\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}": types.AllTypeUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    token\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n"): (typeof documents)["\nmutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}"): (typeof documents)["\nmutation RootchangePassword($idUser: Int!, $newPassword: String!) {\n  rootchangePassword(idUser: $idUser, newPassword: $newPassword) {\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      username\n      company {\n        id\n        name\n        suscription {\n          name\n        }\n      }\n      typeuser {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n"): (typeof documents)["\nquery AllUsers {\n  allUsers {\n    id\n    name\n    typeuser {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}"): (typeof documents)["\nquery AllTypeUser {\n  allTypeUser {\n    id\n    name\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;