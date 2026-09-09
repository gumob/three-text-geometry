#!/usr/bin/env node
/**
 * Guards the dependency pair that broke the 4.1.2 release.
 *
 * @semantic-release/release-notes-generator does not declare
 * conventional-changelog-conventionalcommits. It resolves the preset by name at
 * run time, so whatever is visible from its own directory is what renders the
 * notes - in a pnpm tree that is the fallback hoist directory, which any other
 * dependency can change. The writer it renders with, by contrast, is a declared
 * dependency. When a preset major outruns that writer the run dies in
 * generateNotes, and that only happens on main, after the merge, where a
 * failure is most expensive to unwind.
 *
 * semantic-release --dry-run does not cover this: on a non-release branch it
 * stops at the branch check, before generateNotes ever runs.
 *
 * Usage: node scripts/verify-release-notes.mjs [presetDir]
 *
 *   presetDir  Optional. Render against this preset copy instead of the
 *              resolved one, to confirm this check still detects a broken pair.
 */

import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

/**
 * Finds a package directory the way Node resolution does, by walking up from a
 * starting directory through each node_modules along the way.
 *
 * @param {string} fromDir - Directory to start the walk from.
 * @param {string} name - Package name to look for.
 * @returns {string} Real path of the package directory.
 */
const resolvePackageDir = (fromDir, name) => {
  let dir = fromDir
  for (;;) {
    const candidate = path.join(dir, 'node_modules', name)
    if (fs.existsSync(path.join(candidate, 'package.json'))) return fs.realpathSync(candidate)
    const parent = path.dirname(dir)
    if (parent === dir) throw new Error(`cannot resolve ${name} from ${fromDir}`)
    dir = parent
  }
}

/**
 * Reads a package's ESM entry point from its manifest.
 *
 * @param {string} dir - Package directory.
 * @returns {{ version: string, entry: string }} Version and absolute entry path.
 */
const readEntry = (dir) => {
  const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const exp = pkg.exports
  const dot = typeof exp === 'object' && exp !== null ? (exp['.'] ?? exp) : exp
  const rel = typeof dot === 'string' ? dot : (dot?.import?.default ?? dot?.import ?? dot?.default ?? pkg.main)
  if (!rel) throw new Error(`cannot determine entry point for ${dir}`)
  return { version: pkg.version, entry: path.join(dir, rel) }
}

const require = createRequire(import.meta.url)
const generatorDir = path.dirname(fs.realpathSync(require.resolve('@semantic-release/release-notes-generator')))

const presetDir = process.argv[2]
  ? fs.realpathSync(process.argv[2])
  : resolvePackageDir(generatorDir, 'conventional-changelog-conventionalcommits')
const writerDir = resolvePackageDir(generatorDir, 'conventional-changelog-writer')

const preset = readEntry(presetDir)
const writer = readEntry(writerDir)

console.log(`preset : conventional-changelog-conventionalcommits@${preset.version}`)
console.log(`writer : conventional-changelog-writer@${writer.version}`)

const { default: createPreset } = await import(pathToFileURL(preset.entry).href)
const { writeChangelogString } = await import(pathToFileURL(writer.entry).href)

/**
 * Two commits covering the sections a release of this package actually
 * produces: a scoped fix, and a breaking change with a footer note.
 */
const commits = [
  {
    type: 'fix',
    scope: 'deps',
    subject: 'bump a dependency',
    header: 'fix(deps): bump a dependency',
    hash: '0000000000000000000000000000000000000000',
    body: null,
    footer: null,
    merge: null,
    revert: null,
    notes: [],
    references: [],
  },
  {
    type: 'feat',
    scope: null,
    subject: 'raise the three.js floor',
    header: 'feat!: raise the three.js floor',
    hash: '1111111111111111111111111111111111111111',
    body: null,
    footer: 'BREAKING CHANGE: peerDependencies.three no longer accepts 0.172.',
    merge: null,
    revert: null,
    notes: [{ title: 'BREAKING CHANGE', text: 'peerDependencies.three no longer accepts 0.172.' }],
    references: [],
  },
]

const notes = await writeChangelogString(commits, { version: '0.0.0', host: 'https://github.com', owner: 'futamura', repository: 'three-text-geometry', linkCompare: false }, (await createPreset({})).writer)

for (const expected of ['Bug Fixes', 'bump a dependency', 'BREAKING CHANGES', 'raise the three.js floor']) {
  if (!notes.includes(expected)) {
    console.error(`\nRendered notes are missing ${JSON.stringify(expected)}:\n${notes}`)
    process.exit(1)
  }
}

console.log('\n--- rendered notes ---')
console.log(notes.trim())
console.log('\nok: the preset semantic-release will load renders with the writer it depends on')
