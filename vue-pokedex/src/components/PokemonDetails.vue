<script>
export default {
  data() {
    return {
      pokemon: null,
      loading: true,
      // isFavorite: false,
    };
  },
  created() {
    this.fetchPokemon();
    // this.checkIfFavorite();
  },
  methods: {
    async fetchPokemon() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemonId}`
      );
      const pokemon = await response.json();
      this.pokemon = pokemon;
      this.loading = false;
    },
    // toggleFavorite() {},
    close() {
      this.$router.back();
    },
  },
};
</script>

<template>
  <div class="pokemon-details-container">
    <div v-if="loading">Loading...</div>
    <div class="inner-container" v-else>
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" alt="Pokemon image" />
      <table>
        <tr>
          <td>Height</td>
          <td>{{ pokemon.height }}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{{ pokemon.weight }}</td>
        </tr>
        <tr>
          <td>HP</td>
          <td>{{ pokemon.stats[5].base_stat }}</td>
        </tr>
        <tr>
          <td>Attack</td>
          <td>{{ pokemon.stats[4].base_stat }}</td>
        </tr>
        <tr>
          <td>Defense</td>
          <td>{{ pokemon.stats[3].base_stat }}</td>
        </tr>
        <tr>
          <td>Special Attack</td>
          <td>{{ pokemon.stats[2].base_stat }}</td>
        </tr>
        <tr>
          <td>Special Defense</td>
          <td>{{ pokemon.stats[1].base_stat }}</td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>{{ pokemon.stats[0].base_stat }}</td>
        </tr>
      </table>
      <div class="btns-container">
        <button class="favorite-button" :class="{ 'is-favorite': isFavorite }">
          {{ isFavorite? "Remove from Favorites": "Add to Favorites" }}
        </button>
        <route-link @click="close">Close</route-link>
      </div>
    </div>
  </div>
</template>
