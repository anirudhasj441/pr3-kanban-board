/**
 * @fileoverview creating bridge to connect electron main process and renderer process(react app)
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { contextBridge } from "electron";
import electronAPI from "./api";

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
