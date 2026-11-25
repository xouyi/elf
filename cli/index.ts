#!/usr/bin/env node
import { CliError, log } from './lib/log'
import { run } from './run'

run(process.argv.slice(2)).then(
  (code) => { process.exitCode = code },
  (error: unknown) => {
    log.error(error instanceof CliError ? error.message : `Unexpected error: ${(error as Error).stack ?? error}`)
    process.exitCode = 1
  },
)
