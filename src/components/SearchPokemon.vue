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
      try {
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
      } catch (error) {
        console.error(error);
        alert("Algo deu errado :(");
      }
    },
    async getEvolutions(evolution) {
      try {
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
      } catch (error) {
        console.error(error);
        alert("Algo deu errado :(");
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
            <!-- <img src="./assets/pokebola.png" alt="pokebola"/> -->
            <input
              type="text"
              v-model="searchTerm"
              placeholder="Digite o nome ou ID..."
            />
          </div>
          <div class="btn-con">
            <button @click="searchPokemon" class="searchBtn">Buscar</button>
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
              <p class="card-title">ID: {{ evolution.id }}</p>
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
  min-height: 80vh;
  margin: 10px;

  .search-container {
    height: 50px;
    position: sticky;
    top: 0;
    z-index: 1;
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

      @media (max-width: 767px) {
        font-size: 16px;
        padding: 8px 16px;
      }
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

      @media (max-width: 767px) {
        font-size: 16px;
        padding: 8px 16px;
      }
    }
  }

  .pokemons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .pokemon-card {
      flex: 1 0 calc(25% - 40px);
      margin: 20px;
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

        h3 {
          font-weight: bold;
        }

        p {
          font-size: medium;
        }

        .route-con {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: $primary-color;
          border: none;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: $secondary-color;
          }
        }

        .card-link {
          cursor: pointer;
          color: white;
          text-decoration: none;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .pokemons-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .pokemon-card {
        width: 200px;
        margin: 10px;
      }
    }
  }
}
</style>
