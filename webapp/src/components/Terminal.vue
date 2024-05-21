<template>
  <div id="div-client" class="client">
    <div id="div-editor" @drop="dropHandler" @dragover="dragOverHandler">
      <v-app-bar color="toolbar" id="v-toolbar" height="32px">
        <v-app-bar-nav-icon
            :dark="dark"
            @click="$emit('toggleMenu')"
            v-if="!hasEmbeddedCode()"
        ></v-app-bar-nav-icon>
        <v-tooltip bottom v-if="!hasEmbeddedCode()">
          <span>{{ $t("disconnect") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                x-small
                @click="disconnect"
                v-bind="attrs"
                v-on="on"
                :disabled="!connected"
            >
              <v-icon dense color="error">mdi-lan-disconnect</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
          <span>{{ $t("run") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                x-small
                :disabled="connected"
                @click="executeCheck()"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dense color="green">mdi-play</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom v-if="!hasEmbeddedCode()">
          <span>{{ $t("commandPalette") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                color="yellow"
                x-small
                @click="
                editor.focus(),
                  editor.trigger('F1', 'editor.action.quickCommand')
              "
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dense>mdi-flash</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom v-if="!hasEmbeddedCode()">
          <span>{{ $t("import") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text x-small @click="importFile()" v-bind="attrs" v-on="on">
              <v-icon dense>mdi-import</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom v-if="!hasEmbeddedCode()">
          <span>{{ $t("export") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text x-small @click="saveAs()" v-bind="attrs" v-on="on">
              <v-icon dense>mdi-export</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom v-if="!hasEmbeddedCode()">
          <span>{{ $t("github") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                x-small
                @click="openSite('https://github.com/ArkScript-lang/Ark')"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dense>mdi-github</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-app-bar>
      <v-slide-group
          v-model="fileTabIndex"
          id="file-tabs"
          mandatory
          show-arrows
          @change="onChangeFileTab"
          v-if="!hasEmbeddedCode() && fileTabs !== null"
      >
        <v-slide-item
            v-for="(item, index) in fileTabs"
            :key="index"
            v-slot="{ active, toggle }"
            height="24px"
        >
          <v-btn
              class="text-truncate"
              text
              tile
              small
              :input-value="active"
              active-class="indigo darken-4 white--text"
              depressed
              @click="toggle"
              @contextmenu="toggle()"
              style="text-transform: none !important"
          >
            <v-text-field
                :disabled="!active"
                :readonly="item.filename === defaultFilename"
                :value="`${item.filename}`"
                single-line
                class="text-caption"
                style="border-style: none"
                @change="renameTab"
                @blur="renaming = false"
                v-if="renaming && active && item.filename !== defaultFilename"
                autofocus
            ></v-text-field>
            <span
                class="d-inline-block text-truncate"
                style="max-width: 120px"
                v-on:dblclick="renaming = true"
                v-else
            >
              {{ `${item.filename}.${languageConf.ext}` }}
            </span>

            <v-spacer></v-spacer>
            <v-btn icon text x-small>
              <v-icon
                  color="pink lighten-4"
                  dense
                  v-text="'mdi-close'"
                  @click="closeTab"
              ></v-icon>
            </v-btn>
          </v-btn>
        </v-slide-item>
        <div>
          <v-tooltip bottom>
            <span>{{ $t("newTab") }}</span>
            <template v-slot:activator="{ on, attrs }">
              <v-btn small icon @click="newTab()" v-bind="attrs" v-on="on">
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-slide-group>
      <div v-if="isBottomTerm()">
        <div id="monaco"></div>
      </div>
      <div id="editor-terminal" v-if="!isBottomTerm()">
        <div id="monaco"></div>
        <div>
          <v-snackbar v-model="snackbar" :timeout="4000">
            {{ snackbar_message }}
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                {{ $t("close") }}
              </v-btn>
            </template>
          </v-snackbar>
          <v-toolbar fixed color="toolbar" id="v-footer" height="24px">
            <v-tabs
                show-arrows
                @change="this.fitSize"
                v-model="terminalTab"
                height="24px"
            >
              <v-tab key="0" href="#tab-0"
              >{{
                  $t("terminal")
                }}{{ connected && count ? ` - ${count}` : "" }}
              </v-tab
              >
            </v-tabs>
            <v-spacer></v-spacer>
            <v-layout justify-end="true">
              <v-tooltip bottom>
                <span>{{ $t("decreasePanel") }}</span>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      small
                      @click="resizeTermScreen(true)"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon dense>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip bottom>
                <span>{{ $t("increasePanel") }}</span>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      small
                      @click="resizeTermScreen(false)"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon dense>mdi-chevron-up</v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip bottom>
            <span>{{
                fullTerminal ? $t("restorePanel") : $t("maximizePanel")
              }}</span>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      small
                      @click="toggleTermScreen"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon dense v-if="fullTerminal">mdi-fullscreen-exit</v-icon>
                    <v-icon dense v-else>mdi-fullscreen</v-icon>
                  </v-btn
                  >
                </template>
              </v-tooltip>
            </v-layout>
          </v-toolbar>
          <v-tabs-items v-model="terminalTab" color="black" id="terminal-tab">
            <v-tab-item key="0" value="tab-0">
              <div id="con-terminal" class="con-bottom">
                <div id="terminal"></div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>
    </div>
    <div class="resizer" id="resizer" v-if="isBottomTerm()"></div>
    <div v-if="isBottomTerm()">
      <v-toolbar fixed color="toolbar" id="v-footer" height="24px">
        <v-tabs
            show-arrows
            @change="this.fitSize"
            v-model="terminalTab"
            height="24px"
        >
          <v-tab key="0" href="#tab-0"
          >{{
              $t("terminal")
            }}{{ connected && count ? ` - ${count}` : "" }}
          </v-tab
          >
        </v-tabs>
        <v-spacer></v-spacer>
        <v-layout justify-end="true">
          <v-tooltip bottom>
            <span>{{ $t("decreasePanel") }}</span>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  small
                  @click="resizeTermScreen(true)"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon dense>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip bottom>
            <span>{{ $t("increasePanel") }}</span>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  small
                  @click="resizeTermScreen(false)"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon dense>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip bottom>
            <span>{{
                fullTerminal ? $t("restorePanel") : $t("maximizePanel")
              }}</span>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon
                  small
                  @click="toggleTermScreen"
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon dense v-if="fullTerminal">mdi-fullscreen-exit</v-icon>
                <v-icon dense v-else>mdi-fullscreen</v-icon>
              </v-btn
              >
            </template>
          </v-tooltip>
        </v-layout>
      </v-toolbar>
      <v-tabs-items v-model="terminalTab" color="black">
        <v-tab-item key="0" value="tab-0">
          <div id="con-terminal" class="con-bottom">
            <div id="terminal"></div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-snackbar v-model="snackbar" :timeout="4000" v-if="isBottomTerm()">
      {{ snackbar_message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<style src='../styles/github-markdown.css'></style>
<style src='../styles/vs2015.css'></style>
<script>
import * as monaco from "monaco-editor";
import {languageConf} from './arkscript';

import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";

export default {
  name: "Terminal",
  computed: {
    languageConf() {
      return languageConf
    }
  },
  props: {
    dark: Boolean,
  },
  data: () => ({
    filename: "main",
    defaultFilename: "main",
    renaming: false,
    tabMenu: false,
    befDecorations: [],
    decorations: [],
    befFileTab: null,
    fileTabIndex: null,
    fileTabs: [],
    terminalTab: "tab-0",
    befHeight: 0,
    snackbar: false,
    snackbar_message: "",
    fullTerminal: false,
    contents: "",
    options: {tabSize: 4, dark: true},
    fitAddon: new FitAddon(),
    connected: false,
    count: null,
    ws: null,
    term: null,
    editor: null,
    code: null,
  }),
  watch: {
    dark: {
      immediate: true,
      handler(val) {
        monaco.editor.setTheme(val ? "vs-dark" : "vs");
      },
    },
  },
  methods: {
    isBottomTerm: function () {
      return this.$route.query.termRight === undefined;
    },
    hasEmbeddedCode: function () {
      return this.code !== undefined && this.code !== null;
    },
    showSnackbar: function (msg) {
      this.snackbar_message = msg;
      this.snackbar = true;
    },
    newTab: function (name) {
      let index = 999;
      for (let i = 0; i < 100; i++) {
        if (!this.fileTabs.filter((e) => e.filename === `noname${i}`)[0]) {
          index = i;
          break;
        }
      }
      this.fileTabs.push({
        filename: name ?? `noname${index}`,
        saved: true,
        value: "",
        position: null,
        scrollPosition: {scrollLeft: 0, scrollTop: 0},
      });
      this.onChangeFileTab(this.fileTabs.length - 1);
    },
    renameTab: function (e) {
      if (this.fileTabs === null)
        return;

      let filename = e.replace(
          `.${languageConf.ext}`,
          ""
      );

      if (this.fileTabs.filter((e) => e.filename === filename)[0]) {
        this.fileTabs[this.fileTabIndex].filename = this.filename;
        this.showSnackbar(this.$t("fileExists"));
        return;
      }

      if (filename.match(/.*[&$/'"?<>* ].*/) || filename.length === 0) {
        this.fileTabs[this.fileTabIndex].filename = this.filename;
        this.showSnackbar(this.$t("incorrectFilename"));
        return;
      }

      this.renaming = false;
    },
    closeTab: function () {
      if (this.fileTabs === null)
        return;

      const tab = this.fileTabIndex === this.fileTabs.length - 1 ? this.fileTabs.length - 1 : this.fileTabIndex

      this.befFileTab = null
      if (this.fileTabs.length === 1) {
        this.fileTabs[0].value = this.editor.getValue()
      }
      if (this.fileTabIndex > 0)
        this.fileTabs.splice(this.fileTabIndex, 1)

      this.onChangeFileTab(tab)
    },
    onChangeFileTab: function (tab) {
      if (this.fileTabs === null)
        return;
      this.renaming = false;

      if (!this.editor || !this.fileTabs[tab]) return;

      const tabName = this.fileTabs[tab].filename;
      const getTab = (tabName) => {
        return this.fileTabs.filter((e) => e.filename === tabName)[0];
      };
      const befTab = getTab(this.befFileTab);

      if (befTab) {
        befTab.scrollPosition.scrollLeft = this.editor.getScrollLeft();
        befTab.scrollPosition.scrollTop = this.editor.getScrollTop();
        befTab.position = this.editor.getPosition();
        befTab.value = this.editor.getValue();
      }

      this.filename = this.fileTabs[tab].filename;
      this.fileTabIndex = tab;

      this.editor.setValue(this.fileTabs[tab].value);
      this.editor.getModel().setEOL(0);
      this.fileTabs[tab].position &&
      this.editor.setPosition(this.fileTabs[tab].position);
      this.fileTabs[tab].scrollPosition &&
      this.editor.setScrollPosition(this.fileTabs[tab].scrollPosition);
      this.befFileTab = tabName;
      this.editor.focus();
    },
    setEditorValue(value) {
      this.editor.setValue(value);
      this.editor.setScrollLeft(0);
      this.editor.setScrollTop(0);
      this.editor.focus();
    },
    importFile: function () {
      const input = document.createElement("input");
      input.type = "file";
      input.setAttribute("multiple", null);
      input.onchange = () => {
        const files = Array.from(input.files);

        for (const file of files) this.getFileContents(file);
      };
      input.click();
    },
    getFileContents: function (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = (e) => {
          this.addTab(e.target.filename, e.target.result);
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.filename = file.name.replace(
            `.${languageConf.ext}`,
            ""
        );
        reader.readAsText(file);
      });
    },
    addTab: function (filename, value) {
      if (this.fileTabs === null)
        return;

      const ext = `.${languageConf.ext}`;
      if (filename.endsWith(ext)) filename = filename.replace(ext, "");

      if (this.fileTabs.filter((e) => e.filename === filename)[0]) {
        filename !== this.defaultFilename &&
        this.showSnackbar(
            `Unable to load ${filename} because it already exists`
        );
        return;
      }

      this.fileTabs.push({
        filename: filename,
        saved: true,
        value: value,
        position: null,
        scrollPosition: {scrollLeft: 0, scrollTop: 0},
      });

      this.onChangeFileTab(this.fileTabs.length - 1);
    },
    dropHandler: function (ev) {
      let i;
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();

      if (ev.dataTransfer.items) {
        for (i = 0; i < ev.dataTransfer.items.length; i++) {
          if (ev.dataTransfer.items[i].kind === "file") {
            const file = ev.dataTransfer.items[i].getAsFile();
            this.getFileContents(file);
          }
        }
      } else {
        for (i = 0; i < ev.dataTransfer.files.length; i++) {
          this.getFileContents(ev.dataTransfer.files[i]);
        }
      }
    },
    dragOverHandler: function (ev) {
      ev.preventDefault();
    },
    toggleTermScreen: function () {
      if (this.isBottomTerm())
        return;

      const monaco = document.getElementById("monaco");

      this.fullTerminal = !this.fullTerminal;
      if (!this.fullTerminal) {
        monaco.style.height = this.befHeight;
      }

      if (this.befHeight !== 0) this.befHeight = monaco.style.height;
      this.fitSize();
    },
    openSite: function (site) {
      window.open(site, "_blank");
    },
    resizeTermScreen: function (isUp) {
      if (this.isBottomTerm())
        return;

      const monaco = document.getElementById("monaco");
      if (!monaco) return;
      let dy = monaco.clientHeight;

      const px = parseInt(document.body.clientHeight * 0.1);

      dy += isUp ? px : -px;
      monaco.style.height = `${dy}px`;

      if (this.befHeight !== 0) this.befHeight = monaco.style.height;
      this.fitSize();
    },
    decoration: function (data) {
      const errorRegEx = languageConf.errorRegEx;
      if (!errorRegEx) return;

      const regexp = new RegExp(errorRegEx, "g");
      const ansi =
          "[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]";
      const ansiRegEx = new RegExp(ansi, "g");
      let match = null;

      while ((match = regexp.exec(data)) !== null) {
        if (match.length >= 2) {
          const row = parseInt(match[1]);
          const matched = match[0];
          this.decorations.push({
            range: new monaco.Range(row, 1, row, 1),
            options: {
              isWholeLine: true,
              className: this.$vuetify.theme.dark
                  ? "decorationErrorLineDark"
                  : "decorationErrorLine",
              glyphMarginClassName: "decorationError",
              hoverMessage: {
                value: "```json\n" + matched.replace(ansiRegEx, "") + "\n```",
              },
              glyphMarginHoverMessage: {
                value: "```json\n" + matched.replace(ansiRegEx, "") + "\n```",
              },
            },
          });

          this.befDecorations = this.editor.deltaDecorations(
              this.befDecorations,
              this.decorations
          );
          this.editor.revealLineInCenter(row);
          this.editor.setPosition({column: 0, lineNumber: row});
        }
      }
    },
    connect: function (callback) {
      const vm = this;

      if (vm.connected) {
        return;
      }

      this.terminalTab = "tab-0";

      const term = vm.term;
      term.clear();

      const ws = new WebSocket(process.env.VUE_APP_WEBSOCKET);

      ws.onopen = () => {
        term.writeln(this.$t("connectToServer").toString());
        term.writeln(this.$t("pleaseWait").toString());
        term.writeln("");

        vm.ws = ws;
        vm.connected = true;
        ws.send(`2 ${term.cols} ${term.rows}`);

        if (typeof callback === "function") callback();
      };

      ws.onmessage = (d) => {
        const data = d.data.substring(1);

        switch (d.data[0]) {
          case "1":
            term.write(data);
            this.decoration(data);
            break;
          case "2":
            vm.count = data;
            break;
        }
      };

      ws.onerror = function (ev) {
        console.log(ev);
        term.write(ev);
        ws.close();
      };

      ws.onclose = () => {
        term.writeln("");
        term.writeln(this.$t("disconnected").toString());
        vm.ws = null;
        vm.connected = false;
        this.count = null;
      };
    },
    disconnect: function () {
      if (this.ws) {
        this.ws.close();
      }
      this.connected = false;
    },
    executeCheck: function (command) {
      if (command) {
        this.execute(command);
      }

      if (!this.connected) {
        this.connect(() => {
          this.executeCheck();
        });
        return;
      }
      this.execute(command);
    },
    execute: function (command) {
      this.decorations = [];
      this.befDecorations = this.editor.deltaDecorations(
          this.befDecorations,
          []
      );

      if (!this.connected) {
        this.connect(() => {
          this.execute(command);
        });
        return;
      }

      this.terminalTab = "tab-0";
      if (!command) {
        command = this.editor.getValue();
      }

      if (this.connected) {
        this.term.scrollToBottom();
        this.ws.send(`1${command}\r`);
      } else this.term.write(`${this.t("connectFirst")}.\r\n`);
    },
    fitSize: function () {
      if (this.hasEmbeddedCode())
        return;

      const toolbar = document.getElementById("v-toolbar");
      const fileTabs = document.getElementById("file-tabs");
      const footer = document.getElementById("v-footer");
      const monaco = document.getElementById("monaco");
      const terminal = document.getElementById("terminal");
      const con_terminal = document.getElementById("con-terminal");
      const con_image = document.getElementById("con-html");
      const resizer = document.getElementById("resizer");
      const padding =
          con_terminal.clientHeight -
          terminal.clientHeight +
          resizer.clientHeight;
      const height =
          window.innerHeight -
          toolbar.clientHeight -
          fileTabs.clientHeight -
          footer.clientHeight;
      let monacoHeight =
          (!this.fullTerminal && monaco.style.height === "0px") ||
          monaco.style.height === ""
              ? parseInt(window.innerHeight * 0.6)
              : monaco.clientHeight;

      if (window.innerHeight * 0.7 < monacoHeight) {
        monacoHeight = parseInt(window.innerHeight * 0.7);
        this.befHeight = monaco.style.height;
      } else if (!this.fullTerminal && monacoHeight < 80) {
        monacoHeight = 80;
      }

      monaco.style.height = this.fullTerminal ? "0px" : `${monacoHeight}px`;
      terminal.style.height = this.fullTerminal
          ? `${height - padding}px`
          : `${height - monacoHeight - padding}px`;
      if (con_image)
        con_image.style.height = this.fullTerminal
            ? `${height}px`
            : `${height - monacoHeight - resizer.clientHeight}px`;
      this.editor.layout();

      try {
        this.fitAddon.fit();
      } catch (e) {
        console.log(e);
      }
    },
    saveAs: function () {
      const text = this.editor.getValue();

      const pom = document.createElement("a");
      pom.setAttribute(
          "href",
          "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      pom.setAttribute(
          "download",
          `${this.filename}.${languageConf.ext}`
      );
      pom.style.display = "none";
      document.body.appendChild(pom);

      pom.click();

      document.body.removeChild(pom);
    },
  },
  mounted: function () {
    this.$i18n.locale = "en";
    this.tabMenu = [
      {id: "close", icon: "mdi-close", title: this.$t("closeTab")},
      {id: "new", icon: "mdi-plus", title: this.$t("newTab")},
      {
        id: "rename",
        icon: "mdi-square-edit-outline",
        title: this.$t("rename"),
      },
    ];

    this.code = this.$route.query.code;
    const terminalContainer = document.getElementById("terminal");

    this.term = new Terminal({
      cursorBlink: true,
      rows: 15,
      theme: {
        background: "#1e1e1e",
      },
    });

    this.term.loadAddon(this.fitAddon);
    this.term.open(terminalContainer);

    this.term.onSelectionChange(() => {
      document.execCommand("copy");
    });

    this.term.onData((data) => {
      if (this.connected) {
        this.ws.send("3" + data);
      }
    });

    this.term.onResize((e) => {
      if (this.connected) {
        this.ws.send(`2 ${e.cols} ${e.rows}`);
      }
    });

    this.term.writeln(this.$t("banner"));

    window.addEventListener("resize", this.fitSize);
    const divMonaco = document.getElementById("monaco");
    if (this.isBottomTerm())
      divMonaco.style.height = `${parseInt(window.innerHeight * 0.6)}px`;
    else {
      document.getElementById("div-client").style.height = "100vh";
      document.getElementById("div-editor").style.height = "100vh";
      document.getElementById("con-terminal").style.height = "100vh";
    }

    this.editor = monaco.editor.create(divMonaco, {
      value: "",
      tabSize: 4,
      language: "ark",
      quickSuggestions: {
        other: false,
        comments: false,
        strings: false,
        keywords: true,
      },
      lineNumbers: "on",
      roundedSelection: false,
      scrollBeyondLastLine: true,
      readOnly: false,
      theme: "vs-dark",
      glyphMargin: true,
      minimap: {
        enabled: this.isBottomTerm(),
      },
    });

    if (this.hasEmbeddedCode()) {
      this.code = atob(this.code);
      this.setEditorValue(this.code);
    } else {
      this.newTab("main");
    }

    this.editor.addAction({
      id: "execute",
      label: this.$t("run"),
      keybindings: [monaco.KeyCode.F9],
      run: () => {
        (!this.connected) && this.executeCheck();
      },
    });
    this.editor.addAction({
      id: "connect",
      label: this.$t("connect"),
      run: () => {
        this.connect();
      },
    });
    this.editor.addAction({
      id: "disconnect",
      label: this.$t("disconnect"),
      run: () => {
        this.disconnect();
      },
    });
    this.editor.addAction({
      id: "columnMode",
      label: this.$t("columnMode"),
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyC],
      run: () => {
        const mode = this.editor.getOption(
            monaco.editor.EditorOption.columnSelection
        );
        this.editor.updateOptions({columnSelection: !mode});
        this.editor.setSelection(this.editor.getSelection());
      },
    });
    this.editor.addAction({
      id: "import",
      label: this.$t("import"),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyO],
      run: () => {
        this.importFile();
      },
    });
    this.editor.addAction({
      id: "export",
      label: this.$t("export"),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
      run: () => {
        this.saveAs();
      },
    });
    this.editor.addAction({
      id: "quickCommand",
      label: this.$t("commandPalette"),
      keybindings: [
        monaco.KeyCode.F1,
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP,
      ],
      run: () => {
        this.editor.trigger("F1", "editor.action.quickCommand");
      },
    });
    this.editor.addAction({
      id: "newTab",
      label: this.$t("newTab"),
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyN,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyT,
      ],
      run: () => {
        this.newTab();
      },
    });
    this.editor.addAction({
      id: "closeTab",
      label: this.$t("closeTab"),
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.F4,
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.F4,
      ],
      run: () => {
        this.closeTab()
      },
    });
    this.editor.addAction({
      id: "prevTab",
      label: this.$t("prevTab"),
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Tab,
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.PageUp,
      ],
      run: () => {
        this.fileTabIndex =
            this.fileTabIndex === 0
                ? this.fileTabs.length - 1
                : this.fileTabIndex - 1;
        this.onChangeFileTab(this.fileTabIndex);
      },
    });
    this.editor.addAction({
      id: "nextTab",
      label: this.$t("nextTab"),
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Tab,
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.PageDown,
      ],
      run: () => {
        this.fileTabIndex =
            this.fileTabs.length === this.fileTabIndex + 1
                ? 0
                : this.fileTabIndex + 1;
        this.onChangeFileTab(this.fileTabIndex);
      },
    });
    this.editor.addAction({
      id: "toggleTheme",
      label: this.$t("toggleTheme"),
      run: () => {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      },
    });
    this.editor.focus();

    if (this.isBottomTerm()) {
      const resizer = document.getElementById("resizer");
      const topSide = resizer.previousElementSibling;
      const bottomSide = resizer.nextElementSibling;

      const mouseUpHandler = () => {
        const resizer = document.getElementById("resizer");
        resizer.style.removeProperty("cursor");
        document.body.style.removeProperty("cursor");

        topSide.style.removeProperty("user-select");
        topSide.style.removeProperty("pointer-events");
        bottomSide.style.removeProperty("user-select");
        bottomSide.style.removeProperty("pointer-events");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        this.fitSize();
      };
      const mouseMoveHandler = (e) => {
        if (this.hasEmbeddedCode())
          return;

        const toolbar = document.getElementById("v-toolbar");
        const fileTabs = document.getElementById("file-tabs");
        const resizer = document.getElementById("resizer");
        let dy = e.clientY - toolbar.clientHeight - fileTabs.clientHeight;
        const monaco = document.getElementById("monaco");

        if (document.body.clientHeight * 0.8 < dy) {
          dy = parseInt(document.body.clientHeight * 0.8);
        }

        monaco.style.height = `${dy}px`;
        resizer.style.cursor = "row-resize";
        document.body.style.cursor = "row-resize";
        topSide.style.userSelect = "none";
        topSide.style.pointerEvents = "none";
        bottomSide.style.userSelect = "none";
        bottomSide.style.pointerEvents = "none";
        this.befHeight = monaco.style.height;
      };
      const mouseDownHandler = function () {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      };

      // Attach the handler
      resizer.addEventListener("mousedown", mouseDownHandler);
    }

    window.onbeforeunload = () => {
      return "{{$t('terminate')}}";
    };

    window.onload = () => {
      this.fitSize();
    };
  },
};
</script>

<style>
#editor-terminal {
  display: flex;
  height: calc(100vh - 32px);
}

#terminal-tab {
  height: calc(100vh - 32px - 24px);
}

#monaco {
  flex: 1 0 60%;
}

#editor-terminal > div:nth-child(2) {
  flex: 1 0 35%;
}

.client {
  width: 100%;
  top: 10px;
  bottom: 10px;
}

.con-bottom {
  width: 100%;
  top: 10px;
  bottom: 10px;
  padding: 10px;
  background-color: #1e1e1e;
  overflow: auto;
  max-height: 100%;
}

.con-html img {
  max-height: 100%;
}

.resizer {
  height: 3px;
  cursor: row-resize;
  background-color: dimgray;
}

.resizer:hover {
  background-color: #0d47a1;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-button {
  width: 8px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
  border: thin solid #303030;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}
</style>
