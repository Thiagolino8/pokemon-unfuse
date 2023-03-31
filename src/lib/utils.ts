import type { Schema } from 'zod'

export const typesafeFetch = async <T>(
	url: string,
	schema: Schema<T>,
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) => schema.parse(await (await fetch(url)).json())
