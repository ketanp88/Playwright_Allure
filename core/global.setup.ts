import type { FullConfig } from '@playwright/test';
import { unlink } from 'node:fs/promises';

async function globalSetup(config: FullConfig) {
    try {
        await unlink('ExecutionLogs.log');
      } catch (error) {
      }
}

export default globalSetup;