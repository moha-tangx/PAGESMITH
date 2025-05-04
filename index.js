import { join, parse as parsePath } from "node:path";
import { readFile, readFileSync } from "node:fs";

/**
 * @abstract
 * @param {string} content
 * @param {string} object_name
 * @returns {string}
 */
function parserEngine(content, args, object_name) {
  args; //args is used in the eval function as string
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
 * @param {string} filePath
 * @throws unsupported file extension
 */
function validateFile(filePath) {
  const ext = parsePath(filePath).ext.toLowerCase();
  const supported_exts = [".html", ".htm", ".ps"];
  if (!supported_exts.includes(ext)) throw `unsupported file extension ${ext}`;
}

/**
 * instantiates a parser object that exposes two methods `**parse**` and `**parseSync**`
 * the constructor takes only one argument *views_dir_path* that specifies the views directory where the template files are located
 */
class CreateParser {
  /**
   * Creates an instance of CreateParser.
   * @constructor
   * @param {string ?} [views_dir_path=""] path to views directory,this is relative to the project root directory (directory the script is run)
   * @memberof CreateParser
   */
  constructor(views_dir_path = "") {
    this.views_dir_path = views_dir_path;
  }
  /**
   * parses `**asynchronously**` the file whose path is passed as the filepath (first argument) and returns a promise that resolves the built html
   * @param {path} file_path path to template to be built
   * @param {object} args object whose properties are to be replaced as arguments to the parameters in template
   * @param {string ?} object_name name of the object to be used in the template file, if it is not passed "args" must be used
   * @returns {promise<string>}
   */
  parse(file_path, args, object_name = "args") {
    file_path = join(this.views_dir_path, file_path);
    validateFile(file_path);
    return new Promise((resolve, reject) => {
      readFile(file_path, (err, buffer) => {
        if (err) {
          console.error(
            "something went wrong while reading file: " + file_path
          );
          reject(err);
        }
        let content = buffer.toString("utf-8");
        if (!args) return resolve(content);
        const parsed = parserEngine(content, args, object_name);
        resolve(parsed);
      });
    });
  }
  /**
/**
 * parses `**synchronously**` the file whose path is passed as the filepath (first argument) and return the built html  
 * @param {string} file_path path to template to be built
 * @param {{}} args object whose properties are to be replaced as arguments to the parameters in template 
 * @param {string ?} object_name name of the object to be used in the template file, if it is not passed "args" must be used
 * @returns {string}
 */
  parseSync(file_path, args, object_name = "args") {
    validateFile(file_path);
    file_path = join(this.views_dir_path, file_path);
    const content = readFileSync(file_path, { encoding: "utf-8" });
    const parsed = parserEngine(content, args, object_name);
    return parsed;
  }
}

/**
 * parses `**asynchronously**` the file whose path is passed as the filepath (first argument) and returns a promise that resolves the built html
 * @param {path} file_path path to template to be built
 * @param {object} args object whose properties are to be replaced as arguments to the parameters in template
 * @param {string ?} object_name name of the object to be used in the template file, if it is not passed "args" must be used
 * @returns {promise<string>}
 */
export function parse(file_path, args, object_name = "args") {
  validateFile(file_path);
  return new Promise((resolve, reject) => {
    readFile(file_path, (err, buffer) => {
      if (err) {
        console.error("something went wrong while reading file: " + file_path);
        reject(err);
      }
      let content = buffer.toString("utf-8");
      if (!args) return resolve(content);
      const parsed = parserEngine(content, args, object_name);
      resolve(parsed);
    });
  });
}

/**
 * parses `**synchronously**` the file whose path is passed as the filepath (first argument) and return the built html
 * @param {string} file_path path to template to be built
 * @param {{}} args object whose properties are to be replaced as arguments to the parameters in template
 * @param {string ?} object_name name of the object to be used in the template file, if it is not passed "args" must be used
 * @returns {string}
 */
export function parseSync(file_path, args, object_name = "args") {
  validateFile(file_path);
  const content = readFileSync(file_path, { encoding: "utf-8" });
  const parsed = parserEngine(content, args, object_name);
  return parsed;
}

export default CreateParser;
