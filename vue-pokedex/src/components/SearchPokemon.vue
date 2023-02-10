<script>
export default {
  data() {
    return {
      searchTerm: "",
      evolutions: [],
      showSearch: true,
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
      this.showSearch = false;
      this.$router.push({ name: "PokemonDetails", params: { pokemonId } });
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="main-container" v-if="showSearch">
        <div class="search-container">
          <div class="input-container">
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Digite o nome ou ID do Pokemon..."
            />
          </div>
          <div class="btn-con">
            <button
              @click="searchPokemon"
              @submit="searchPokemon"
              class="searchBtn"
            >
              Search
            </button>
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
                <router-link
                  @click="showPokemonDetails(evolution.id)"
                  class="card-link"
                  to="/pokemon-details"
                >
                  Detalhes
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view v-else></router-view>
    </div>
  </main>
</template>

<style lang="scss">
$primary-color: #4caf50;
$secondary-color: #3e8e41;
$card-width: 200px;
$card-margin: 20px;
$card-background-color: #f2f2f2;
$card-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
$card-border-radius: 10px;

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin: 10px;

  .search-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      padding: 10px 20px;
      font-size: 18px;
      margin-right: 10px;
      width: 100%;
      min-width: 100%;
      border-radius: 5px;
      border: 1px solid $primary-color;
    }

    .btn-con {
      margin-left: 10px;
    }

    button {
      padding: 10px 20px;
      background-color: $primary-color;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: $secondary-color;
      }
    }
  }

  .pokemons-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    .pokemon-card {
      width: $card-width;
      margin: $card-margin;
      text-align: center;
      background-color: $card-background-color;
      box-shadow: $card-shadow;
      border-radius: $card-border-radius;
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-title {
        text-transform: capitalize;
        font-size: 24px;
        margin-top: 20px;
      }

      .card-image {
        width: 8rem;
        padding: 20px;

        img {
          width: 100%;
        }
      }

      .card-content {
        padding: 20px;

        .route-con {
          margin-top: 20px;
        }

        .card-link {
          color: $primary-color;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
