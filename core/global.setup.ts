import type { FullConfig } from '@playwright/test';
import { unlink } from 'node:fs/promises';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
    try {
        await deleteFolderRecursive('./Logs');
        await deleteFolderRecursive('./allure-results');
        await deleteFolderRecursive('./allure-report');
      } catch (error) {
      }
}


async function deleteFolderRecursive(path: string) {
  if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach((file) => {
          const curPath = `${path}/${file}`;
          if (fs.lstatSync(curPath).isDirectory()) {
              // Recursively delete subfolders
              deleteFolderRecursive(curPath);
          } else {
              // Delete files
              fs.unlinkSync(curPath);
          }
      });
      // Delete the empty folder once all files and subfolders are deleted
      fs.rmdirSync(path);
  }
}

export default globalSetup;