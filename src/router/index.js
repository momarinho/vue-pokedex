import { createRouter, createWebHistory } from "vue-router";
import PokemonDetails from "../components/PokemonDetails.vue";
import SearchPokemon from "../components/SearchPokemon.vue";
import PokemonFavorites from "../components/PokemonFavorites.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "SearchPokemon",
      component: SearchPokemon,
    },
    {
      path: "/pokemon-details/:pokemonId",
      name: "PokemonDetails",
      component: PokemonDetails,
    },
    {
      path: "/favorites",
      name: "PokemonFavorites",
      component: PokemonFavorites,
    },
  ],
});

export default router;
