import { z } from "zod";

export const fusedPokemonSchema = z.object({
  name: z.string(),
  image_url: z.string(),
  fused: z.object({
    head: z.string(),
    body: z.string(),
  }),
})

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.union([z.null(), z.string()]),
  previous: z.union([z.null(), z.string()]),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
    ),
  })

export type PokemonItem = z.infer<typeof pokemonListSchema>['results'][number]

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
})

export type Pokemon = z.infer<typeof pokemonSchema>
