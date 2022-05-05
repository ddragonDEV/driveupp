import "./bootstrap/aliases";
import { Server } from "./bootstrap/index";

(() => {
    new Server().initialize();
})();