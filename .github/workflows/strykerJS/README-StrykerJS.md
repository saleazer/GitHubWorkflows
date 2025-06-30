# Reusable StrykerJS Workflow for Angular Projects

This reusable GitHub Actions workflow provides mutation testing for Angular projects using StrykerJS with incremental testing capabilities.

## Features

- ✅ **Incremental Mutation Testing**: Incrementally adds tests per run to spread the load across multiple workflow executions
- ✅ **Angular Optimized**: Configured for Angular projects with Karma test runner
- ✅ **Artifact Management**: Automatically manages incremental state across workflow runs
- ✅ **Configurable**: Supports customization for different project structures

## Prerequisites

Your Angular project should have:
- `package.json` with StrykerJS dependencies
- `stryker.config.mjs` configuration file
- Unit tests following `.spec.ts` naming convention
- Tests located alongside implementation files in `src/app` (or configurable path)

## Usage

### Basic Usage

Create a workflow file in your repository (e.g., `.github/workflows/mutation-testing.yml`):

```yaml
name: Mutation Testing

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  mutation-testing:
    uses: your-org/your-shared-workflows-repo/.github/workflows/reusable-strykerjs.yml@main
    secrets: inherit
```

### Advanced Configuration

```yaml
name: Mutation Testing

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  mutation-testing:
    uses: your-org/your-shared-workflows-repo/.github/workflows/reusable-strykerjs.yml@main
    with:
      node-version: "18.17.0"          # Custom Node.js version
      source-path: "src/app"           # Path to source files (default: src/app)
      artifact-name: "my-stryker"      # Custom artifact name (default: stryker-incremental)
      stryker-config: "stryker.conf.js" # Custom config file (default: stryker.config.mjs)
    secrets: inherit
```

## Configuration Options

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `node-version` | Node.js version to use | No | `20.11.1` |
| `source-path` | Path to source files for Angular projects | No | `src/app` |
| `artifact-name` | Name for the incremental artifact | No | `stryker-incremental` |
| `stryker-config` | Path to Stryker config file | No | `stryker.config.mjs` |

## Required Files in Your Repository

### 1. Stryker Configuration (`stryker.config.mjs`)

```javascript
// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
    mutate: process.env.FILESTOSTRYKE ? process.env.FILESTOSTRYKE.split(', ') : [],
    testRunner: "karma",
    karma: {
        configFile: "karma.conf.js",
        projectType: "angular-cli",
        config: {
            browsers: ["ChromeHeadless"]
        }
    },
    reporters: ["progress", "clear-text", "html"],
    concurrency: 2,
    coverageAnalysis: "perTest",
    ignoreStatic: true
};
export default config;
```

### 2. Package.json Dependencies

Ensure your `package.json` includes StrykerJS dependencies:

```json
{
  "devDependencies": {
    "@stryker-mutator/core": "^7.x.x",
    "@stryker-mutator/karma-runner": "^7.x.x",
    "@stryker-mutator/typescript-checker": "^7.x.x"
  }
}
```

## How It Works

1. **Incremental Testing**: The workflow downloads artifacts from previous runs to determine which files have already been tested
2. **File Discovery**: Automatically finds all `.spec.ts` files and their corresponding implementation files
3. **Progressive Testing**: Tests one additional file per run to spread the load across multiple workflow executions
4. **Artifact Storage**: Stores incremental state and coverage reports as GitHub Actions artifacts

## Outputs

The workflow produces two artifacts:
- `stryker-incremental_X`: Incremental state file for the next run
- `stryker-coverage`: HTML mutation testing report

## Team Standards

This workflow follows your team's Angular standards:
- Uses `src/app` directory structure
- Expects `.spec.ts` test files alongside `.ts` implementation files
- Uses Karma test runner with Angular CLI configuration
- Uses Chrome Headless for CI environments
