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
    //receber dados
    async fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.$route.params.pokemonId}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const pokemon = await response.json();
        this.pokemon = pokemon;
      } catch (error) {
        console.error(error);
        this.pokemon = null;
      } finally {
        this.loading = false;
      }
    },
    //retornar a pg de pesquisa
    close() {
      this.$router.push({ name: "SearchPokemon" });
    },
  },
  //status
  computed: {
    hp() {
      return this.pokemon
        ? this.pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat
        : 0;
    },
    attack() {
      return this.pokemon
        ? this.pokemon.stats.find((stat) => stat.stat.name === "attack")
            .base_stat
        : 0;
    },
    defense() {
      return this.pokemon
        ? this.pokemon.stats.find((stat) => stat.stat.name === "defense")
            .base_stat
        : 0;
    },
    specialAttack() {
      return this.pokemon
        ? this.pokemon.stats.find((stat) => stat.stat.name === "special-attack")
            .base_stat
        : 0;
    },
    specialDefense() {
      return this.pokemon
        ? this.pokemon.stats.find(
            (stat) => stat.stat.name === "special-defense"
          ).base_stat
        : 0;
    },
    speed() {
      return this.pokemon
        ? this.pokemon.stats.find((stat) => stat.stat.name === "speed")
            .base_stat
        : 0;
    },
  },
};
</script>

<template>
  <div class="pokemon-details-container">
    <p v-if="loading">Loading...</p>
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
          <th>{{ hp }}</th>
        </tr>
        <tr>
          <td>Ataque</td>
          <th>{{ attack }}</th>
        </tr>
        <tr>
          <td>Defesa</td>
          <th>{{ defense }}</th>
        </tr>
        <tr>
          <td>Ataque Especial</td>
          <th>{{ specialAttack }}</th>
        </tr>
        <tr>
          <td>Defesa Especial</td>
          <th>{{ specialDefense }}</th>
        </tr>
        <tr>
          <td>Velocidade</td>
          <th>{{ speed }}</th>
        </tr>
      </table>
      <div class="btns-container">
        <button class="favorite-button" :class="{ 'is-favorite': isFavorite }">
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
      margin-bottom: 10px;
      text-transform: capitalize;
    }

    span {
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
