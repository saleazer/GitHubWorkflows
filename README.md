# GitHub Workflows Repository

A centralized collection of reusable GitHub Actions workflows designed to streamline development processes across multiple repositories.

## 🎯 Purpose

This repository serves as a resource hub for standardized, reusable GitHub workflows that can be referenced by other repositories in the organization. Instead of duplicating workflow code across projects, repositories can leverage these workflows to maintain consistency and reduce maintenance overhead.

## 📦 Available Workflows

### 🧪 StrykerJS Mutation Testing
**File**: `.github/workflows/StrykerJS.yml`

A comprehensive mutation testing workflow for Angular projects using StrykerJS with incremental testing capabilities.

**Features:**
- ✅ Incremental mutation testing to spread load across multiple runs
- ✅ Angular/Karma optimized configuration
- ✅ Automatic artifact management for incremental state
- ✅ Configurable source paths and Node.js versions
- ✅ Built-in error handling and validation

**Quick Usage:**
```yaml
name: Mutation Testing
on: [push, pull_request]

jobs:
  mutation-testing:
    uses: your-org/GitHubWorkflows/.github/workflows/StrykerJS.yml@main
    with:
      node-version: '22.17.0'
      source-path: 'src/app'
    secrets: inherit
```

[📖 Full StrykerJS Documentation](.github/workflows/strykerJS/README-StrykerJS.md)

## 🚀 Getting Started

### Using a Workflow in Your Repository

1. **Reference the workflow** in your repository's `.github/workflows/` directory:

```yaml
name: Your Workflow Name
on: [push, pull_request]

jobs:
  your-job:
    uses: your-org/GitHubWorkflows/.github/workflows/WorkflowName.yml@main
    with:
      # Your input parameters
    secrets: inherit
```

2. **Customize inputs** as needed for your project
3. **Commit and push** to trigger the workflow

## 🔧 Contributing New Workflows

Planning to add a new reusable workflow? Follow these guidelines:

### 1. Workflow Structure
- Create the main workflow file in `.github/workflows/`
- Use descriptive, PascalCase naming (e.g., `CodeQuality.yml`)
- Include comprehensive input parameters with defaults

### 2. Supporting Files
- Create a subdirectory for any supporting scripts or files
- Use the same base name as your workflow (e.g., `codeQuality/`)
- Include helper scripts, configuration templates, etc.

### 3. Documentation
- Create a detailed README in the supporting files directory
- Include usage examples, input parameters, and prerequisites
- Update this main README with a summary

### 4. Testing
- Test thoroughly in a separate repository first
- Verify all input combinations work as expected
- Ensure proper error handling and meaningful error messages

## 📋 Workflow Standards

All workflows in this repository should follow these standards:

### Input Parameters
- Provide sensible defaults for all optional inputs
- Use clear, descriptive parameter names
- Include helpful descriptions for each input

### Error Handling
- Validate prerequisites before running main logic
- Provide clear error messages
- Fail fast when requirements aren't met

### Documentation
- Comprehensive README for each workflow
- Usage examples with common configurations
- Clear prerequisite documentation

## 🎨 Future Workflows

This repository is designed to grow with the organization's needs. Potential future additions:

- **Code Quality**: ESLint, Prettier
- **Security Scanning**: Dependency vulnerability checks
- **Deployment**: Standardized deployment workflows
- **Documentation**: Auto-generation of API docs, changelogs

## 📞 Support

- **Documentation**: Check individual workflow READMEs for detailed guidance

---

**Happy automating!** 🚀

> This repository helps maintain consistency across projects while reducing workflow duplication and maintenance overhead.