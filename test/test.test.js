import { it } from "node:test";
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

const user = {
  name: "muhammad sadiq",
  userName: "moha_tangx",
  followers: 100,
  following: 300,
  isOnline: 0,
  posts,
  nested: { value: ["am here"] },
};

// test the parser class
it("creates a new parser object", { concurrency: true }, (t) => {
  const parseObject = new Parser("./views");
  t.test("parse method of parser object", async () => {
    parseObject.parse("view.ps", user, "user");
  });
  t.test("parseSync method of parser object", () => {
    parseObject.parse("view.ps", user, "user");
  });
});

//test parse function
it("parses template asynchronously", async () => {
  parse("views/view.ps", user, "user");
});

//test parseSync function
it("parses template synchronously", () => {
  parseSync("views/view.ps", user, "user");
});
