// pocketbase.ts
import {
  Collections,
  FilmsResponse,
  TypedPocketBase,
  UsersResponse,
  WatchHistoryResponse,
} from "@/../utils/pocketbase-types"; // <-- adjust path to your typegen output
import Constants from 'expo-constants';
import PocketBase from "pocketbase";

const POCKETBASE_URL = Constants.manifest?.extra?.POCKETBASE_URL ?? "https://movies.jkim.win";

// Initialize PocketBase client
const pb: TypedPocketBase = new PocketBase(
  POCKETBASE_URL,
) as TypedPocketBase;


// --- Generic CRUD Helpers ---
export async function getList<T>(
  collection: Collections,
  page = 1,
  perPage = 30,
  options: Record<string, unknown> = {}
) {
  return await pb.collection(collection).getList<T>(page, perPage, options)
}

export async function getFullList<T>(
  collection: Collections,
  options: Record<string, unknown> = {}
) {
  return await pb.collection(collection).getFullList<T>(options)
}

export async function getFirst<T>(
  collection: Collections,
  filter: string,
  options: Record<string, unknown> = {}
) {
  return await pb.collection(collection).getFirstListItem<T>(filter, options)
}

export async function getOne<T>(
  collection: Collections,
  id: string,
  options: Record<string, unknown> = {}
) {
  return await pb.collection(collection).getOne<T>(id, options)
}

export async function create<T>(
  collection: Collections,
  data: Record<string, unknown>
) {
  return await pb.collection(collection).create<T>(data)
}

export async function update<T>(
  collection: Collections,
  id: string,
  data: Record<string, unknown>
) {
  return await pb.collection(collection).update<T>(id, data)
}

export async function remove(collection: Collections, id: string) {
  return await pb.collection(collection).delete(id)
}

// =============================
// Films CRUD
// =============================
export async function getFilms(page = 1, perPage = 30) {
  return await getList<FilmsResponse>(Collections.Films, page, perPage, {
    sort: "-created",
  })
}

export async function getAllFilms() {
  return await getFullList<FilmsResponse>(Collections.Films, {
    sort: "-created",
  })
}

export async function searchFilms(query: string) {
  return await pb
    .collection(Collections.Films)
    .getList<FilmsResponse>(1, 50, { filter: `title~"${query}"` })
}

export async function getFilm(id: string) {
  return await getOne<FilmsResponse>(Collections.Films, id)
}

export async function getFirstFilmBy(field: string, value: string) {
  return await getFirst<FilmsResponse>(
    Collections.Films,
    `${field}="${value}"`
  )
}

export async function addFilm(data: Partial<FilmsResponse>) {
  return await create<FilmsResponse>(Collections.Films, data)
}

export async function updateFilm(id: string, data: Partial<FilmsResponse>) {
  return await update<FilmsResponse>(Collections.Films, id, data)
}

export async function deleteFilm(id: string) {
  return await remove(Collections.Films, id)
}

// =============================
// Users CRUD
// =============================
export async function getUsers(page = 1, perPage = 30) {
  return await getList<UsersResponse>(Collections.Users, page, perPage)
}

export async function getAllUsers() {
  return await getFullList<UsersResponse>(Collections.Users, { sort: "-created" })
}

export async function searchUsers(query: string) {
  return await pb
    .collection(Collections.Users)
    .getList<UsersResponse>(1, 50, { filter: `name~"${query}" || email~"${query}"` })
}

export async function getUser(id: string) {
  return await getOne<UsersResponse>(Collections.Users, id)
}

export async function getFirstUserBy(field: string, value: string) {
  return await getFirst<UsersResponse>(
    Collections.Users,
    `${field}="${value}"`
  )
}

export async function addUser(data: Partial<UsersResponse>) {
  return await create<UsersResponse>(Collections.Users, data)
}

export async function updateUser(id: string, data: Partial<UsersResponse>) {
  return await update<UsersResponse>(Collections.Users, id, data)
}

export async function deleteUser(id: string) {
  return await remove(Collections.Users, id)
}

// =============================
// WatchHistory CRUD
// =============================
export async function getWatchHistory(page = 1, perPage = 30) {
  return await getList<WatchHistoryResponse>(
    Collections.WatchHistory,
    page,
    perPage
  )
}

export async function getAllWatchHistory() {
  return await getFullList<WatchHistoryResponse>(Collections.WatchHistory, {
    sort: "-created",
  })
}

export async function getWatchHistoryByUser(userId: string) {
  return await pb
    .collection(Collections.WatchHistory)
    .getList<WatchHistoryResponse>(1, 50, { filter: `user="${userId}"` })
}

export async function getWatchHistoryByFilm(filmId: string) {
  return await pb
    .collection(Collections.WatchHistory)
    .getList<WatchHistoryResponse>(1, 50, { filter: `film="${filmId}"` })
}

export async function getWatchHistoryItem(id: string) {
  return await getOne<WatchHistoryResponse>(Collections.WatchHistory, id)
}

export async function addWatchHistoryItem(
  data: Partial<WatchHistoryResponse>
) {
  return await create<WatchHistoryResponse>(Collections.WatchHistory, data)
}

export async function updateWatchHistoryItem(
  id: string,
  data: Partial<WatchHistoryResponse>
) {
  return await update<WatchHistoryResponse>(Collections.WatchHistory, id, data)
}

export async function deleteWatchHistoryItem(id: string) {
  return await remove(Collections.WatchHistory, id)
}

export default pb