<template>
  <div class="lobby">
    <h1 class="text-center">Game lobby</h1>
    <h2 class="text-center">Choose an open call or create your own game</h2>
    <Creategame class="my-6" />
    <v-row class="lobby-container">
      <v-simple-table class="col-sm-12 col-md-8 transparent">
        <template v-slot:default>
          <thead class="table-head">
            <tr>
              <th class="text-left">
                <h2>Player</h2>
              </th>
              <th class="text-left">
                <h2>Time</h2>
              </th>
              <th class="text-left">
                <h2>Color</h2>
              </th>
              <th class="text-left">
                <h2>Game ID</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="game in getGames"
              :key="game.id"
              @click="selectGame(game)"
            >
              <td>{{ game.players.player1Name }}</td>
              <td>{{ game.timeToGo }}</td>
              <td>{{ game.players.player1Color }}</td>
              <td>{{ game.id }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-col class="col-sm-12 col-md-4 pa-0">
        <Chat :game="{ global: true }" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Creategame from "@/components/dialogs/Creategame";
import { mapGetters } from "vuex";
import Chat from "@/components/chat/Chat";

export default {
  components: { Creategame, Chat },
  sockets: {
    connect() {
      console.log("connected to server");
    },
    newGameInfo(games) {
      this.$store.dispatch("updateGamesList", games);
      this.$store.getters.getGames.forEach(game => {
        if (game.players.player1Name == this.$store.state.loginUser) {
          this.$socket.client.emit("joinRoom", game.id);
        }
      });
    }
  },
  methods: {
    selectGame(game) {
      if (
        game.players.player1Name !== this.$store.state.loginUser &&
        this.$store.state.loginUser !== null
      ) {
        this.$socket.client.emit("connectToGame", {
          gameId: game.id,
          player2Name: this.$store.state.loginUser,
          player2ID: this.$store.state.idUser,
          player2Rating: window.localStorage.getItem("userRating")
        });
      }
    }
  },
  computed: mapGetters(["getGames"]),
  mounted() {
    this.$socket.client.emit("loadGames");
  }
};
</script>

<style lang="scss" scoped>
.lobby-container {
  border: 3px solid #272727;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.9);
  .v-data-table {
    padding: 0 !important;
    border-right: 3px solid #272727 !important;
    border-radius: 0;

    @media (max-width: 959.99px) {
      border-right: none !important;
      border-bottom: 3px solid #272727 !important;
    }
  }
}
</style>
