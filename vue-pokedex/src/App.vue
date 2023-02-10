<!-- <script setup>
import { RouterLink, RouterView } from "vue-router";
import SearchPokemon from "./components/SearchPokemon.vue";
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <SearchPokemon />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template> -->

<script setup>
import { RouterView } from "vue-router";
import SearchPokemon from "./components/SearchPokemon.vue";
</script>

<template>
  <div class="wrapper">
    <header>Pokedex</header>
    <SearchPokemon />
    <RouterView />
  </div>
</template>
