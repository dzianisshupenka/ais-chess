<template>
  <nav>
    <v-app-bar class="container" app>
      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
      <div class="logo">
        <v-img src="@/assets/new-logo.png"></v-img>
      </div>
      <v-tooltip v-for="link in menuLinks" :key="link.text" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :to="link.route" v-bind="attrs" v-on="on" text class="ml-1">
            <v-icon left>{{ link.icon }}</v-icon>
            <span class="hidden-sm-and-down">
              {{ link.text }}
            </span>
          </v-btn>
        </template>
        <span>{{ link.text }}</span>
      </v-tooltip>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn v-if="$store.state.loginUser" text to="/account">
        <span> {{ $store.state.loginUser }} </span>
      </v-btn>
      <Login v-if="!$store.state.loginUser" />
      <v-btn
        v-if="$store.state.loginUser"
        text
        @click.prevent="logoutFromAccountTest"
      >
        <span class="hidden-sm-and-down">
          logout
        </span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="link in drawerLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon> {{ link.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense subheader>
        <v-subheader>User Controls</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="link in drawerLinks"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon> {{ link.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ link.text }} </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
/* eslint-disable */
import Login from "./Login";
import router from "../router/index";

export default {
  components: {
    Login
  },
  methods: {
    logoutFromAccountTest () {
      axios.defaults.headers.common["Authorization"] = "Token asd";
      window.localStorage.removeItem("userLog");
      window.localStorage.removeItem("userName");
      window.localStorage.removeItem("userID");
      this.$store.commit("removeLoginUser");
      this.$store.commit("removeLoginUserID");
      router.push("/", () => {})
    }
  },
  data: () => ({
    menuLinks: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-store", text: "Lobby", route: "/lobby" },
      { icon: "mdi-desktop-mac", text: "Play AI", route: "/playai" },
      { icon: "mdi-account-multiple", text: "My game", route: "/game" }
    ],
    drawer: false,
    drawerLinks: [
      { icon: "mdi-home", text: "Home", route: "/" },
      { icon: "mdi-newspaper", text: "News", route: "/news" },
      { icon: "mdi-account", text: "Account", route: "/account" },
      { icon: "mdi-email", text: "About Us", route: "/about_us" }
    ]
  })
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  background-color: #000000 !important;
  position: relative;

  .logo {
    width: 60px;
    margin-right: 20px;

    @media (max-width: 575.98px) {
      display: none;
    }
  }
}
// .v-toolbar__content {
//   height: auto !important;
// }
</style>