// TODO: Scan for all the links in the documents.
/*
Links will be inside of the file object the first time that I read them.
 */

import {
  appendFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { resolve } from "path";

import { readFilePromise, writeFilePromise } from "./utils";

import type { file } from "./types";

const IGNORE_LIST: string[] = [
  ".git",
  ".terraform",
  "build",
  "dist",
  "node_modules",
];

const FILES: string[] = [];

const throughDir = (parentDirectory: string): void =>
  readdirSync(parentDirectory).forEach((dir) => {
    if (IGNORE_LIST.includes(dir)) return;
    const absolutePath = resolve(parentDirectory, dir);

    if (
      absolutePath.match(
        new RegExp(resolve(__dirname, "../docs").split("/").join("\\/"), "g")
      )
    )
      return;

    return lstatSync(absolutePath).isDirectory()
      ? throughDir(absolutePath)
      : FILES.push(absolutePath);
  });

throughDir(resolve(__dirname, "../../.."));

const READMEs = FILES.filter((file) => file.match(/.*README.*\.md/g));

const writeFiles = async (files: string[]) => {
  const filesData: file[] = await Promise.all(
    files.map(async (file) => {
      const content = (await readFilePromise(file)).toString();

      const links = content.match(/\[.*?\]\(.*?\)/g);

      return {
        content,
        filePath: file,
        links:
          links?.map((link) => {
            const label = link.split("](")[0].slice(1);
            const url = link
              .split("](")[1]
              .slice(0, link.split("](")[1].length - 1);
            return { label, url };
          }) || [],
        name: file.split("/").slice(4).join("."),
      };
    })
  );

  if (!existsSync(resolve(__dirname, "../docs")))
    mkdirSync(resolve(__dirname, "../docs"));

  readdirSync(resolve(__dirname, "../docs")).forEach((file) => {
    unlinkSync(resolve(__dirname, "../docs", file));
  });

  filesData.forEach(async (file) => {
    await writeFilePromise(
      resolve(__dirname, "../docs", file.name),
      file.content
    );
    // TODO: Figure out better formatting for the links.
    // TODO: Maybe also track the files that the link came from.
    file.links.length &&
      appendFileSync(
        resolve(__dirname, "../docs/links.md"),
        JSON.stringify(file.links)
      );
  });
};

writeFiles(READMEs);
