// Como leer un json en ESModules recomendado sin el with
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
export const readJSON = (path) => require(path);