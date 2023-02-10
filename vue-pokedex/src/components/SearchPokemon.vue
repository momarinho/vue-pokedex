<script>
export default {
  data() {
    return {
      searchTerm: "",
      evolutions: [],
    };
  },
  methods: {
    async searchPokemon() {
      this.evolutions = [];
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`
      );
      const pokemon = await response.json();
      const evolutionResponse = await fetch(pokemon.species.url);
      const species = await evolutionResponse.json();
      const evolutionChain = species.evolution_chain.url;
      const evolutionChainResponse = await fetch(evolutionChain);
      const evolutionChainData = await evolutionChainResponse.json();
      this.getEvolutions(evolutionChainData.chain);
    },
    async getEvolutions(evolution) {
      const evolutionResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`
      );
      const evolutionData = await evolutionResponse.json();
      this.evolutions.push({
        id: evolutionData.id,
        name: evolutionData.name,
        sprites: evolutionData.sprites,
      });
      for (const nextEvolution of evolution.evolves_to) {
        await this.getEvolutions(nextEvolution);
      }
    },
    showPokemonDetails(pokemonId) {
      this.$router.push({
        name: "PokemonDetails",
        params: { pokemonId },
      });
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="main-container">
        <div class="search-container">
          <div class="input-container">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Digite o nome ou ID do Pokemon..."
            />
          </div>
          <div class="btn-con">
            <button @click="searchPokemon" class="searchBtn">Search</button>
          </div>
        </div>
        <div class="pokemons-container">
          <div
            class="pokemon-card"
            v-for="evolution in evolutions"
            :key="evolution.id"
          >
            <div class="card-content">
              <h3 class="card-title">{{ evolution.name }}</h3>
              <div class="card-image">
                <img
                  :src="evolution.sprites.front_default"
                  alt="Pokemon image"
                />
              </div>
              <div class="route-con">
                <route-link
                  @click="showPokemonDetails(evolution.id)"
                  class="card-link"
                  >Details</route-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
