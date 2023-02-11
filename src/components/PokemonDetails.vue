<script>
export default {
  data() {
    return {
      pokemon: null,
      loading: true,
    };
  },
  created() {
    this.fetchPokemon();
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

    close() {
      this.$router.push({ name: "SearchPokemon" });
    },
  },
};
</script>

<template>
  <div class="pokemon-details-container">
    <div v-if="loading">Loading...</div>
    <div class="inner-container" v-else>
      <h2>{{ pokemon.name }}</h2>
      <p>ID: {{ pokemon.id }}</p>
      <p>
        Type:
        <span v-for="type in pokemon.types" :key="type.type.name">{{
          type.type.name
        }}</span>
      </p>
      <img :src="pokemon.sprites.front_default" alt="Pokemon image" />
      <table>
        <tr>
          <td>HP</td>
          <th>{{ pokemon.stats[5].base_stat }}</th>
        </tr>
        <tr>
          <td>Ataque</td>
          <th>{{ pokemon.stats[4].base_stat }}</th>
        </tr>
        <tr>
          <td>Defesa</td>
          <th>{{ pokemon.stats[3].base_stat }}</th>
        </tr>
        <tr>
          <td>Ataque Especial</td>
          <th>{{ pokemon.stats[2].base_stat }}</th>
        </tr>
        <tr>
          <td>Defesa Especial</td>
          <th>{{ pokemon.stats[1].base_stat }}</th>
        </tr>
        <tr>
          <td>Velocidade</td>
          <th>{{ pokemon.stats[0].base_stat }}</th>
        </tr>
      </table>
      <div class="btns-container">
        <button
          class="favorite-button"
          :class="{ 'is-favorite': isFavorite }"
          @click="toggleFavorite"
        >
          <span v-if="isFavorite">Remover dos Favoritos</span>
          <span v-else>Adicionar aos Favoritos</span>
        </button>
        <route-link @click="close">Fechar</route-link>
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
      width: 100px;
      height: 100px;
      margin-bottom: 5px;
    }

    table {
      margin-bottom: 20px;
      width: 80%;

      th,
      td {
        padding: 10px;
        text-align: start;
        background-color: #fff;
      }

      th {
        background-color: #ddd;
        font-weight: bold;
        text-align: center;
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

        is-favorite {
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
      margin-top: 10px;
      margin-bottom: 10px;
    }

    img {
      width: 150px;
      height: 150px;
    }

    table {
      font-size: 14px;
    }

    .btns-container {
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-top: 10px;

      .favorite-button,
      route-link {
        margin: 5px;
        font-size: 14px;
        padding: 5px 10px;
      }
    }
  }
}
</style>
