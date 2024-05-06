/**
 * @fileoverview create and attach router to app
 *
 * @author Anirudha Jadhav <anirudhasj441@gmail.com>
 */

import { createHashRouter } from "react-router-dom";
import routes from "./routes";

const router = createHashRouter(routes);

export default router;
