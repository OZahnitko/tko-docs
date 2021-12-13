import { existsSync, lstatSync, mkdirSync, readdirSync, unlinkSync } from "fs";
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
    files.map(async (file) => ({
      content: (await readFilePromise(file)).toString(),
      filePath: file,
      name: file.split("/").slice(4).join("."),
    }))
  );

  if (!existsSync(resolve(__dirname, "../docs")))
    mkdirSync(resolve(__dirname, "../docs"));

  readdirSync(resolve(__dirname, "../docs")).forEach((file) => {
    unlinkSync(resolve(__dirname, "../docs", file));
  });

  filesData.forEach(
    async (file) =>
      await writeFilePromise(
        resolve(__dirname, "../docs", file.name),
        file.content
      )
  );
};

writeFiles(READMEs);
