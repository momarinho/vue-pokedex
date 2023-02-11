<template>
  <div class="favorites-container">
    <h2>Meus Pokémons Favoritos</h2>
    <div v-if="favorites.length === 0">
      Você ainda não adicionou nenhum Pokémon aos favoritos.
    </div>
    <div class="favorites-list" v-else>
      <div
        class="favorite-pokemon"
        v-for="pokemon in favorites"
        :key="pokemon.id"
      >
        <img :src="pokemon.sprites.front_default" alt="Pokemon image" />
        <p>{{ pokemon.name }}</p>
        <button @click="removeFromFavorites(pokemon.id)">
          Remover dos Favoritos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorites() {
      return this.$store.getters.favoritePokemons;
    },
  },
  methods: {
    removeFromFavorites(id) {
      this.$store.commit("removeFromFavorites", id);
    },
  },
};
</script>

<style lang="scss">
.favorites-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: auto;

  h2 {
    text-align: center;
    font-size: 36px;
    font-weight: bolder;
    margin-bottom: 20px;
    text-transform: capitalize;
  }

  .favorites-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .favorite-pokemon {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 10px;
    background-color: #f2f2f2;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
