<template>
  <v-app>
    <v-main>
      <left-menu :menu="menu" ref="leftMenu" v-if="!hasEmbeddedCode()" @click="showContents"></left-menu>
      <terminal
          :editorValue="editorValue"
          ref="terminal"
          @navigate="navigate"
          @toggleMenu="toggleMenu"
          @onTerminalCount="onTerminalCount"
          :dark="$vuetify.theme.dark"
      >
      </terminal>
    </v-main>
  </v-app>
</template>

<style src='./styles/github-markdown.css'></style>
<style src='./styles/xterm.css'></style>
<style src='./styles/vs2015.css'></style>

<script>
import LeftMenu from "./components/LeftMenu";
import Terminal from "./components/Terminal";
import axios from "axios";

export default {
  name: "App",
  components: {
    LeftMenu,
    Terminal,
  },
  data: () => ({
    contents: "",
    editorValue: "",
    tab: "tab-0",
    menu: {},
    termCount: null,
  }),
  methods: {
    hasEmbeddedCode: function() {
      return this.$route.query.code !== undefined;
    },
    toggleMenu: function () {
      if (this.$refs.leftMenu !== undefined)
        this.$refs.leftMenu.visible = !this.$refs.leftMenu.visible;
    },
    showContents: function (path) {
      axios
          .get(path, {
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          })
          .then((res) => {
            if (this.$refs.leftMenu !== undefined)
              this.$refs.leftMenu.selected = path;
            if (path.endsWith(".template")) {
              this.$refs.terminal.setEditorValue(res.data);
            } else {
              this.contents = res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    onTerminalCount: function (count) {
      this.termCount = count;
    },
    navigate: function (template) {
      const html = document.getElementsByTagName("html")[0];
      const event = new CustomEvent("scroll", {});
      html.pageYOffset = 0;
      setTimeout(() => {
        html.scrollTop = 0;
      });
      html.dispatchEvent(event);
      html.style.overflowY = "hidden";

      if (
          !window.location.href.endsWith(".template") &&
          !window.location.href.split("/").pop().startsWith("source:")
      ) {
        template = "hello_world.template";
      }
      this.showContents(`/contents/ide/ark/${template}`);
    },
  },
  mounted() {
    this.$i18n.locale = "en";
    const path = this.$route.params.app_path;
    if (this.hasEmbeddedCode()) {
      if (this.$refs.leftMenu !== undefined)
        this.$refs.leftMenu.visible = false;
    } else {
      this.menu = require('./ark_ide.json');

      if (path && path.endsWith(".template")) {
        this.navigate(path.replace("ide/ark/", ""));
      } else {
        this.navigate("hello_world.template");
      }
    }
  },
};
</script>
