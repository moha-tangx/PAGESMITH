import { test } from "node:test";
import Parser, { parseSync, parse } from "../index.js";

const posts = [
  {
    tittle: "my first post",
    date: "11/23/2062",
  },
  {
    tittle: "my second post",
    date: "11/23/2062",
  },
  {
    tittle: "post on the temp engine",
    date: "11/23/2062",
  },
  {
    tittle: "the programming journey",
    date: "11/23/2062",
  },
];

const UserObject = {
  name: "muhammad sadiq",
  userName: "moha_tangx",
  followers: 100,
  following: 300,
  isOnline: 0,
  posts,
};

const parser = new Parser.create_Parser("./views");
const asyncParserMethod = Parser.createParser({
  root_dir_path: "./views",
  async: true,
});

const ParserMethod = Parser.createParser({
  root_dir_path: "./views",
  async: true,
});

test("async parser method from the createParser method", async (t) => {
  asyncParserMethod("index.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
});
test("synchronous parser method from the createParser method", (t) => {
  ParserMethod("index.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
});

test("the parser object of create_parser class", async (t) => {
  parser.parse("view.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
});

test("the parser object of create_parser class sync type", (t) => {
  parser.parseSync("index.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
});

test("async parse function with object_name param", async (t) => {
  await parse("views/view.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
});

test("synchronous parse function with object_name param", (t) => {
  parseSync("views/view.ps", UserObject, "user");
  t.diagnostic("passed: ✅ ✅ ✅");
  t.skip();
});

test("async parse function", async (t) => {
  await parse("views/index.ps", UserObject);
  t.diagnostic("passed: ✅ ✅ ✅");
});

test("synchronous parse function", (t) => {
  parseSync("views/index.ps", UserObject);
  t.diagnostic("passed: ✅ ✅ ✅");
});
