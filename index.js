import { join } from "node:path";
import { readFile, readFileSync } from "node:fs";

/**
 * @abstract
 * @param {string} content
 * @param {string} object_name
 * @returns {string}
 */
function parserEngine(content, args, object_name) {
  args;
  const pattern = /\$\{.*?\}\$/gis;
  const vars = content.match(pattern);
  const keys = vars.map((v) => v.replace(/\$\{/, "").replace(/\}\$/, ""));

  for (const key of keys) {
    let value = key.trim().replace(/\s+/g, " ");
    if (object_name) {
      value = value.replace(`${object_name}.`, "args.");
    }
    let evaluated = eval(value);
    if (Array.isArray(evaluated)) {
      evaluated = evaluated.join("");
    }
    content = content.replace(`\${${key}}$`, evaluated);
  }

  return content;
}

/**
 * the parser function returns
 * @param {{ root_dir_path: string , async: boolean}}
 */

function createParser(options = { root_dir_path: "", async: true }) {
  const { async, root_dir_path } = options;
  /**
   *
   * @param {string} file_path
   * @param {object} args
   * @param {string} object_name
   * @returns
   */
  function parse(file_path, args, object_name = "args") {
    file_path = join(root_dir_path, file_path);
    return new Promise((resolve, reject) => {
      readFile(file_path, (err, buffer) => {
        if (err) {
          console.error("something goes wrong while reading file " + file_path);
          reject(err);
        }
        let content = buffer.toString("ascii");
        if (!args) return resolve(content);
        const parsed = parserEngine(content, args, object_name);
        resolve(parsed);
      });
    });
  }

  /**
   *
   * @param {string} file_path
   * @param {object} args
   * @param {string} object_name
   * @returns
   */
  function parseSync(file_path, args, object_name = "args") {
    file_path = join(root_dir_path, file_path);
    const content = readFileSync(file_path, { encoding: "utf-8" });
    const parsed = parserEngine(content, args, object_name);
    return parsed;
  }
  return async ? parse : parseSync;
}

class create_Parser {
  constructor(root_dir_path = "") {
    this.root_dir_path = root_dir_path;
  }
  parse(file_path, args, object_name = "args") {
    file_path = join(this.root_dir_path, file_path);
    return new Promise((resolve, reject) => {
      readFile(file_path, (err, buffer) => {
        if (err) {
          console.error("something goes wrong while reading file " + file_path);
          reject(err);
        }
        let content = buffer.toString("ascii");
        if (!args) return resolve(content);
        const parsed = parserEngine(content, args, object_name);
        resolve(parsed);
      });
    });
  }
  parseSync(file_path, args, object_name = "args") {
    file_path = join(this.root_dir_path, file_path);
    const content = readFileSync(file_path, { encoding: "utf-8" });
    const parsed = parserEngine(content, args, object_name);
    return parsed;
  }
}

/**
 *
 * @param {path} file_path
 * @param {object} args
 * @param {string} object_name
 * @returns {promise<string>}
 */
export function parse(file_path, args, object_name = "args") {
  return new Promise((resolve, reject) => {
    readFile(file_path, (err, buffer) => {
      if (err) {
        console.error("something goes wrong while reading file " + file_path);
        reject(err);
      }
      let content = buffer.toString("ascii");
      if (!args) return resolve(content);
      const parsed = parserEngine(content, args, object_name);
      resolve(parsed);
    });
  });
}

export function parseSync(file_path, args, object_name = "args") {
  const content = readFileSync(file_path, { encoding: "utf-8" });
  const parsed = parserEngine(content, args, object_name);
  return parsed;
}

export default {
  createParser,
  create_Parser,
};
