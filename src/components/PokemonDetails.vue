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
    // toggleFavorite() {
    //   this.isFavorite = !this.isFavorite;
    // },
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
        <button class="favorite-button" @click="toggleFavorite" :class="{ 'is-favorite': isFavorite }">
          {{ isFavorite? "Remove from Favorites": "Add to Favorites" }}
        </button>
        <route-link @click="close">Close</route-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pokemon-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: auto;

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f2f2f2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    h2 {
      text-align: center;
      font-size: 36px;
      font-weight: bolder;
      margin-bottom: 20px;
      text-transform: capitalize;
    }

    img {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
    }

    table {
      margin-bottom: 20px;

      th,
      td {
        padding: 10px;
      }
    }

    .btns-container {
      display: flex;
      flex-direction: row;

      .favorite-button {
        background-color: #f44336;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;

        &.is-favorite {
          background-color: #f44336;
        }
      }

      route-link {
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;

        &:hover {
          background-color: #3e8e41;
        }
      }
    }
  }

  @media (max-width: 767px) {
    h2 {
      font-size: 24px;
    }

    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
