<template>
  <div id="div-client" class="client">
    <div id="div-editor" @drop="dropHandler" @dragover="dragOverHandler">
      <v-app-bar color="toolbar" id="v-toolbar" height="32px">
        <v-app-bar-nav-icon
          :dark="dark"
          @click="$emit('toggleMenu')"
        ></v-app-bar-nav-icon>
        <v-tooltip bottom>
          <span>{{ $t("connect") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              x-small
              @click="connect"
              v-bind="attrs"
              v-on="on"
              :disabled="connected"
            >
              <v-icon dense color="green">mdi-lan-connect</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
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
          <span>{{ $t("repl") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              x-small
              :disabled="
                !(
                  termStr &&
                  termStr.match(/.*([$#]) $/i)
                )
              "
              @click="editor.focus(), editor.trigger('', 'repl')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dense color="green">mdi-code-greater-than</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
          <span>{{ $t("run") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              x-small
              :disabled="
                !(!connected || (termStr && termStr.match(/.*([$#]) $/i)))
              "
              @click="executeCheck()"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dense color="green">mdi-play</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
          <span>{{ $t("sendToTerminal") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              color="green"
              x-small
              @click="execute()"
              v-bind="attrs"
              v-on="on"
              :disabled="!connected"
            >
              <v-icon dense>mdi-playlist-play</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
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
        <v-tooltip bottom>
          <span>{{ $t("import") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text x-small @click="importFile()" v-bind="attrs" v-on="on">
              <v-icon dense>mdi-import</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
          <span>{{ $t("export") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text x-small @click="saveAs()" v-bind="attrs" v-on="on">
              <v-icon dense>mdi-export</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
          <span>{{ $t("options") }}</span>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              x-small
              @click="showSettingsDialog"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dense>mdi-tools</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip bottom>
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
            @contextmenu="toggle(), tabContaxMenu($event)"
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

            <v-spacer> </v-spacer>
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
      <div id="monaco"></div>
    </div>
    <div class="resizer" id="resizer"></div>
    <div>
      <v-toolbar fixed color="toolbar" id="v-footer" height="24px">
        <v-tabs
          show-arrows
          @change="this.fitSize"
          v-model="terminalTab"
          height="24px"
        >
          <v-tab key="0" href="#tab-0"
            >{{ $t("terminal")
            }}{{ connected && count ? ` - ${count}` : "" }}</v-tab
          >
        </v-tabs>
        <v-spacer></v-spacer>
        <v-layout justify-end="true">
          <v-tooltip bottom>
            <span>{{ $t("decreasePannel") }}</span>
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
            <span>{{ $t("increasePannel") }}</span>
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
              fullTerminal ? $t("restorePannel") : $t("maximizePannel")
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
                <v-icon dense v-else>mdi-fullscreen</v-icon></v-btn
              >
            </template>
          </v-tooltip>
        </v-layout>
      </v-toolbar>
      <v-tabs-items v-model="terminalTab" color="black">
        <v-tab-item key="0" value="tab-0">
          <div id="con-terminal" class="con-bottom">
            <div id="terminal" @drop="onDrop" @dragover="onDragOver"></div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-menu v-model="tabMenu" :position-x="x" :position-y="y" absolute offset-y>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in tabMenus"
          :key="index"
          link
          @click="contextMenuClick(item.id)"
        >
          <v-list-item-title class="caption"
            ><v-icon>{{ item.icon }}</v-icon
            >{{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-snackbar v-model="snackbar" :timeout="4000">
      {{ snackbar_message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          {{ $t("close") }}
        </v-btn>
      </template>
    </v-snackbar>
    <Settings ref="settingsDialog" @saveOptions="saveOptions"> </Settings>
  </div>
</template>

<style src='../styles/github-markdown.css'></style>
<style src='../styles/vs2015.css'></style>
<script>
import * as monaco from "monaco-editor";
import { languageConf } from './arkscript';

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

import axios from "axios";
import Settings from "./Settings";

export default {
  name: "Terminal",
  computed: {
    languageConf() {
      return languageConf
    }
  },

  components: {
    Settings,
  },
  props: {
    dark: Boolean,
  },
  data: () => ({
    filename: "main",
    defaultFilename: "main",
    renaming: false,
    tabMenu: false,
    x: 0,
    y: 0,
    tabMenus: null,  // todo: needed?
    befDecorations: [],
    decorations: [],
    befFileTab: null,
    fileTabIndex: null,
    fileTabs: [],
    terminalTab: "tab-0",
    befHeight: 0,
    snackbar: false,
    snackbar_message: "",
    termStr: "",  // todo remove
    fullTerminal: false,
    contents: "",
    options: { tabSize: 4, dark: true },
    fitAddon: new FitAddon(),
    connected: false,
    count: null,
    ws: null,
    term: null,
    editor: null,
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
    showSettingsDialog: function () {
      const options = {
        dark: this.$vuetify.theme.dark,
        tabSize: this.editor.getModel().getOptions()["tabSize"],
        fontSize: this.editor.getOption(monaco.editor.EditorOption.fontSize),
        args: this.options[
          `${languageConf.template}.args`
        ]
          ? this.options[
              `${languageConf.template}.args`
            ]
          : languageConf.args,
      };

      this.$refs["settingsDialog"].show(options);
    },
    saveOptions: function (options) {
      if (options) {
        this.$vuetify.theme.dark = options.dark;
        this.editor.updateOptions({ fontSize: options.fontSize });
        this.editor.getModel().updateOptions({ tabSize: options.tabSize });
        this.options[`${languageConf.template}.args`] =
          options.args;
      }
      this.showSnackbar(this.$t("savedOptions"));
    },
    showSnackbar: function (msg) {
      this.snackbar_message = msg;
      this.snackbar = true;
    },
    tabContaxMenu: function (e) {
      e.preventDefault();
      this.tabMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.tabMenu = true;
      });
    },
    contextMenuClick: function (e) {
      switch (e) {
        case "close":
          this.closeTab();
          break;
        case "new":
          this.newTab();
          break;
        case "rename":
          this.renaming = true;
          break;
      }
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
        scrollPosition: { scrollLeft: 0, scrollTop: 0 },
      });
      this.onChangeFileTab(this.fileTabs.length - 1);
    },
    renameTab: function (e) {
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
      const tab = this.fileTabIndex === this.fileTabs.length-1 ? this.fileTabs.length-1 : this.fileTabIndex

      this.befFileTab = null
      if (this.fileTabs.length === 1) {
        this.fileTabs[0].value = this.editor.getValue()
      }
      if (this.fileTabIndex > 0)
        this.fileTabs.splice(this.fileTabIndex, 1)

      this.onChangeFileTab(tab)
    },
    onChangeFileTab: function (tab) {
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
    copyToClipboard: function (txt) {
      const dummy = document.createElement("input");
      const text = txt;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    setEditorValue(value) {
      this.editor.setValue(value);
      this.editor.setScrollLeft(0);
      this.editor.setScrollTop(0);
      this.editor.focus();
    },
    sendFile: function (file) {
      if (file.size > 1024 * 1024 * 10) {
        this.showSnackbar(
          `ℹ️  최대 10M까지 가능합니다(${file.name}, ${file.size}바이트)`
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (this.connected) {
          this.ws.send(
            `1\n# ℹ️  ${file.name} 파일을 전송합니다(${file.size}bytes). 완료될 때까지 기다려 주세요...\n` +
              `cat << 'ARKSCRIPT_EOF' | sed s/.*,// | base64 -d > '${file.name}'\n` +
              event.target.result +
              `\nARKSCRIPT_EOF\r\n# ℹ️  ${file.name} 전송완료\n`
          );
        }
      };
      reader.readAsDataURL(file);
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
        scrollPosition: { scrollLeft: 0, scrollTop: 0 },
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
    onDrop: function (e) {
      if (!this.connected) {
        this.showSnackbar("");
        return;
      }

      if (!(this.termStr && this.termStr.match(/.*([$#]) $/i))) {
        this.showSnackbar("Can not upload file: currently not in shell");
        return;
      }
      e.preventDefault();

      if (e.dataTransfer.items) {
        for (let index = 0; index < e.dataTransfer.items.length; index++) {
          if (e.dataTransfer.items[index].kind === "file") {
            this.sendFile(e.dataTransfer.items[index].getAsFile());
          }
        }
      } else {
        for (let index = 0; index < e.dataTransfer.files.length; index++) {
          this.sendFile(e.dataTransfer.files[index]);
        }
      }
    },
    onDragOver: (e) => {
      e.preventDefault();
    },
    getContents: function (path) {
      axios
        .get(path, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((res) => {
          this.contents = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.contents = err;
        });
    },
    toggleTermScreen: function () {
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
              minimap: { position: 1 },
            },
          });

          this.befDecorations = this.editor.deltaDecorations(
            this.befDecorations,
            this.decorations
          );
          this.editor.revealLineInCenter(row);
          this.editor.setPosition({ column: 0, lineNumber: row });
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
      term.write(this.$t("connectToServer").toString());

      const ws = new WebSocket(`ws://localhost:8081/terminal`);

      ws.onopen = () => {
        term.write(this.$t("connected").toString());
        term.write(this.$t("pleaseWait").toString());
        vm.ws = ws;
        vm.connected = true;
        ws.send(`2 ${term.cols} ${term.rows}`);

        if (typeof callback === "function") callback();
      };

      ws.onmessage = (d) => {
        const data = d.data.substring(1);

        switch (d.data[0]) {
          case "1":
            vm.termStr = data.substr(-10);
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
      };

      ws.onclose = () => {
        vm.term.write(`\r\n${this.$t("disconnected")}\r\n\r\n`);
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
        this.execute(this, command);
      }

      if (!languageConf.command) {
        this.execute(this);
        return;
      }
      if (!this.connected) {
        this.connect(() => {
          this.executeCheck();
        });
        return;
      }
      this.execute(this, command);
    },
    execute: function (isAll, command) {
      this.decorations = [];
      this.befDecorations = this.editor.deltaDecorations(
        this.befDecorations,
        []
      );

      if (!this.connected) {
        this.connect(() => {
          this.execute(isAll, command);
        });
        return;
      }
      const selected = this.editor.getSelection();
      const selectedText = command
        ? command
        : this.editor.getModel().getValueInRange(selected);

      this.terminalTab = "tab-0";
      if (!command) {
        if (isAll) {
          const ext = languageConf.ext;
          let args =
            this.options[
              `${languageConf.template}.args`
            ];

          if (!args)
            args = languageConf.args;

          command = (
            "cat << 'ARKSCRIPT_EOF' > {FILENAME}.{EXT}\n{SOURCE}\nARKSCRIPT_EOF\n" +
            languageConf.command
          )
            .replace(/{ARGS}/g, args)
            .replace(/{FILENAME}/g, this.filename.replace(`.${ext}`, ""))
            .replace(/{EXT}/g, ext)
            .replace("{SOURCE}", this.editor.getValue())
            .replace(/\t/g, "    ");
        } else if (selectedText) {
          command = selectedText;
        } else {
          if (selected["startLineNumber"]) {
            command = this.editor
              .getModel()
              .getLineContent(selected["startLineNumber"]);
            this.editor.setPosition({
              column: 0,
              lineNumber: selected["startLineNumber"] + 1,
            });
          }
        }
      }

      if (this.connected) {
        this.term.scrollToBottom();
        this.ws.send(`1${command}\r`);
      } else this.term.write(`${this.t("connectFirst")}.\r\n`);
    },
    fitSize: function () {
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
      { id: "close", icon: "mdi-close", title: this.$t("closeTab") },
      { id: "new", icon: "mdi-plus", title: this.$t("newTab") },
      {
        id: "rename",
        icon: "mdi-square-edit-outline",
        title: this.$t("rename"),
      },
    ];

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
        this.ws.send("1" + data);
      }
    });

    this.term.onResize((e) => {
      if (this.connected) {
        this.ws.send(`2 ${e.cols} ${e.rows}`);
      }
    });

    const banner = this.$t("banner").replaceAll("ANSI", "\x1b[");
    this.term.write(banner);

    window.addEventListener("resize", this.fitSize);
    const divMonaco = document.getElementById("monaco");
    divMonaco.style.height = `${parseInt(window.innerHeight * 0.6)}px`;

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
      automaticLayout: true,
      roundedSelection: false,
      scrollBeyondLastLine: true,
      readOnly: false,
      theme: "vs-dark",
      glyphMargin: true,
    });

    this.newTab("main");

    this.editor.addAction({
      id: "sendToTerminal",
      label: this.$t("sendToTerminal"),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        this.execute();
      },
    });

    this.editor.addAction({
      id: "execute",
      label: this.$t("run"),
      keybindings: [monaco.KeyCode.F9],
      run: () => {
        (!this.connected ||
          (this.termStr && this.termStr.match(/.*([$#]) $/i))) &&
          this.executeCheck();
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
      id: "repl",
      label: this.$t("repl"),
      run: () => {
        let args =
          this.options[
            `${languageConf.template}.args`
          ];

        if (!args)
          args = languageConf.args;

        this.termStr &&
          this.termStr.match(/.*([$#]) $/i) &&
          this.execute(
            false,
              languageConf.cli.replace(/{ARGS}/g, args)
          );
      },
    });

    this.editor.addAction({
      id: "columnMode",
      label: this.$t("columnMode"),
      keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KEY_C],
      run: () => {
        const mode = this.editor.getOption(
          monaco.editor.EditorOption.columnSelection
        );
        this.editor.updateOptions({ columnSelection: !mode });
        this.editor.setSelection(this.editor.getSelection());
      },
    });

    this.editor.addAction({
      id: "import",
      label: this.$t("import"),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_O],
      run: () => {
        this.importFile();
      },
    });

    this.editor.addAction({
      id: "export",
      label: this.$t("export"),
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_E],
      run: () => {
        this.saveAs();
      },
    });

    this.editor.addAction({
      id: "quickCommand",
      label: this.$t("commandPalette"),
      keybindings: [
        monaco.KeyCode.F1,
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_P,
      ],
      run: () => {
        this.editor.trigger("F1", "editor.action.quickCommand");
      },
    });

    this.editor.addAction({
      id: "saveOptions",
      label: this.$t("saveOptions"),
      run: () => {
        this.saveOptions();
      },
    });

    this.editor.addAction({
      id: "newTab",
      label: this.$t("newTab"),
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_N,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_T,
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
      run: () => { this.closeTab() },
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

    this.editor.addAction({
      id: "options",
      label: this.$t("options"),
      run: () => {
        this.showSettingsDialog();
      },
    });

    this.editor.focus();

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
.client {
  width: 100%;
  top: 10px;
  bottom: 10px;
}
.parent {
  width: 42px;
  height: 42px;
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
.con-html {
  width: 100%;
  top: 10px;
  bottom: 10px;
  padding: 10px;
  background-color: grey;
  overflow: auto;
  max-height: 100%;
}
.con-html img {
  max-height: 100%;
}
.label {
  display: inline-block;
  width: 100px;
  margin-right: 20px;
  user-select: none;
  text-align: left;
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
