import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PokemonDetails from "../components/PokemonDetails.vue";
import SearchPokemon from "../components/SearchPokemon.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/search",
      name: "SearchPokemon",
      component: SearchPokemon,
    },
    {
      path: "/pokemon-details/:pokemonId",
      name: "PokemonDetails",
      component: PokemonDetails,
    },
  ],
});

export default router;
