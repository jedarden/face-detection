# Setting Up ApexAlgo IAD Runners for Face Detection Repository

This guide provides detailed instructions for configuring the face-detection repository to use the ApexAlgo IAD self-hosted GitHub Actions runners for faster and more reliable builds.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Benefits](#benefits)
- [Step 1: Update GitHub Actions Workflows](#step-1-update-github-actions-workflows)
- [Step 2: Configure Repository Settings](#step-2-configure-repository-settings)
- [Step 3: Verify Runner Access](#step-3-verify-runner-access)
- [Step 4: Test the Configuration](#step-4-test-the-configuration)
- [Step 5: Monitor and Troubleshoot](#step-5-monitor-and-troubleshoot)
- [Advanced Configuration](#advanced-configuration)
- [Rollback Instructions](#rollback-instructions)

## Prerequisites

Before setting up the ApexAlgo IAD runners, ensure:

1. **Repository Access**: You have admin access to the face-detection repository
2. **Organization Membership**: The repository is part of the same organization that hosts the ApexAlgo IAD runners
3. **Runner Availability**: The ApexAlgo IAD runner scale set is deployed and operational
4. **Network Access**: The runners can access GitHub and any external resources your workflows require

## Benefits

Using ApexAlgo IAD self-hosted runners provides:

- **⚡ Faster Builds**: Pre-warmed runners with cached Docker layers
- **📈 Scalability**: Auto-scales from 2 to 12 runners based on demand
- **🔧 Better Resources**: Dedicated compute with more CPU/memory
- **🐳 Docker-in-Docker**: Native Docker support for container builds
- **💰 Cost Efficiency**: No GitHub Actions minutes consumed
- **🔒 Security**: Runs in your controlled infrastructure

## Step 1: Update GitHub Actions Workflows

### 1.1 Identify Workflow Files

First, locate all GitHub Actions workflow files:

```bash
cd face-detection
find .github/workflows -name "*.yml" -o -name "*.yaml"
```

Common workflow files:
- `.github/workflows/docker-publish.yml`
- `.github/workflows/docker-dev.yml`
- `.github/workflows/security-scan.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/test.yml`

### 1.2 Update Runner Configuration

For each workflow file, replace the `runs-on` directive:

**Before:**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

**After:**
```yaml
jobs:
  build:
    runs-on: apexalgo-iad-runners
```

### 1.3 Update All Jobs

Some workflows may have multiple jobs. Update each one:

```yaml
jobs:
  test:
    runs-on: apexalgo-iad-runners
    steps:
      # ... test steps ...

  build:
    runs-on: apexalgo-iad-runners
    needs: test
    steps:
      # ... build steps ...

  deploy:
    runs-on: apexalgo-iad-runners
    needs: build
    steps:
      # ... deploy steps ...
```

### 1.4 Handle Matrix Builds

For matrix builds, update the strategy:

**Before:**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
runs-on: ${{ matrix.os }}
```

**After (if only using self-hosted):**
```yaml
runs-on: apexalgo-iad-runners
```

**Or keep hybrid approach:**
```yaml
strategy:
  matrix:
    runner: [apexalgo-iad-runners, ubuntu-latest]
runs-on: ${{ matrix.runner }}
```

## Step 2: Configure Repository Settings

### 2.1 Repository Settings

1. Go to **Settings** → **Actions** → **Runners**
2. Verify that self-hosted runners are allowed
3. Check that the repository can see the `apexalgo-iad-runners` scale set

### 2.2 Secrets and Variables

Ensure any required secrets are accessible:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Verify all required secrets are present:
   - `GITHUB_TOKEN` (automatically provided)
   - Any registry credentials
   - API keys or tokens

### 2.3 Permissions

The runners need appropriate permissions:

```yaml
jobs:
  build:
    runs-on: apexalgo-iad-runners
    permissions:
      contents: read
      packages: write
      id-token: write  # For OIDC if needed
```

## Step 3: Verify Runner Access

### 3.1 Check Runner Availability

Before pushing changes, verify runners are available:

```bash
# Check organization runners (requires appropriate permissions)
gh api /orgs/YOUR_ORG/actions/runners
```

### 3.2 Test Connection

Create a simple test workflow:

```yaml
# .github/workflows/test-runners.yml
name: Test ApexAlgo Runners

on:
  workflow_dispatch:

jobs:
  test:
    runs-on: apexalgo-iad-runners
    steps:
      - name: Check Runner
        run: |
          echo "Running on: ${{ runner.name }}"
          echo "Runner OS: ${{ runner.os }}"
          echo "Runner Arch: ${{ runner.arch }}"
          
      - name: Check Docker
        run: |
          docker --version
          docker info
          
      - name: Check Resources
        run: |
          nproc
          free -h
          df -h
```

## Step 4: Test the Configuration

### 4.1 Push Changes

```bash
# Create a feature branch
git checkout -b feature/add-apexalgo-runners

# Add and commit changes
git add .github/workflows/
git commit -m "chore: Switch to ApexAlgo IAD self-hosted runners

- Update all workflows to use apexalgo-iad-runners
- Improve build performance and reliability
- Reduce GitHub Actions usage costs"

# Push the branch
git push origin feature/add-apexalgo-runners
```

### 4.2 Create Pull Request

Create a PR to test the runners:

```bash
gh pr create --title "Use ApexAlgo IAD runners for CI/CD" \
  --body "This PR updates all GitHub Actions workflows to use our self-hosted ApexAlgo IAD runners for improved performance and cost efficiency."
```

### 4.3 Monitor the Build

Watch the PR checks to ensure runners pick up the jobs:

```bash
# Watch the workflow run
gh run watch

# Check specific workflow
gh workflow view "🐳 Build and Publish Docker Image"
```

## Step 5: Monitor and Troubleshoot

### 5.1 Common Issues and Solutions

#### Runner Not Found
```
Error: No runner matching the specified labels was found: apexalgo-iad-runners
```

**Solution:**
- Verify runner scale set name is correct
- Check organization/repository settings
- Ensure runners are online

#### Docker Permission Issues
```
Error: Got permission denied while trying to connect to the Docker daemon socket
```

**Solution:**
- Runners should be configured with Docker-in-Docker
- Check runner deployment configuration

#### Resource Constraints
```
Error: Container killed due to memory limit
```

**Solution:**
- Adjust resource requests in workflow:
```yaml
jobs:
  build:
    runs-on: apexalgo-iad-runners
    container:
      options: --memory 4g --cpus 2
```

### 5.2 Debugging Steps

1. **Check Runner Logs**:
   ```bash
   kubectl logs -n cluster-runner -l app.kubernetes.io/name=gha-runner-scale-set
   ```

2. **Verify Runner Registration**:
   ```bash
   kubectl get pods -n cluster-runner
   ```

3. **Test Docker Access**:
   ```yaml
   - name: Debug Docker
     run: |
       docker ps
       docker images
       docker system df
   ```

## Advanced Configuration

### Using Specific Runner Labels

If you have multiple runner groups:

```yaml
runs-on: [self-hosted, linux, x64, apexalgo-iad]
```

### Container Jobs

For jobs running in containers:

```yaml
jobs:
  build:
    runs-on: apexalgo-iad-runners
    container:
      image: node:18
      options: --user root
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

### Caching

Leverage runner-local caching:

```yaml
- name: Cache Docker layers
  uses: actions/cache@v3
  with:
    path: /tmp/.buildx-cache
    key: ${{ runner.os }}-buildx-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-buildx-
```

### Parallel Jobs

Maximize parallelization:

```yaml
strategy:
  matrix:
    component: [frontend, backend, api]
jobs:
  build:
    runs-on: apexalgo-iad-runners
    strategy:
      matrix: ${{ matrix }}
    steps:
      - name: Build ${{ matrix.component }}
        run: ./build.sh ${{ matrix.component }}
```

## Rollback Instructions

If you need to revert to GitHub-hosted runners:

### Option 1: Quick Revert

```bash
# Revert all changes
git revert <commit-hash>
git push
```

### Option 2: Manual Update

```bash
# Find and replace
find .github/workflows -name "*.yml" -exec sed -i 's/apexalgo-iad-runners/ubuntu-latest/g' {} \;

# Commit changes
git add .github/workflows/
git commit -m "revert: Switch back to GitHub-hosted runners"
git push
```

### Option 3: Gradual Migration

Use both runners during transition:

```yaml
strategy:
  matrix:
    runner: [ubuntu-latest, apexalgo-iad-runners]
  fail-fast: false
runs-on: ${{ matrix.runner }}
```

## Best Practices

1. **Start with Non-Critical Workflows**: Test on development/PR workflows first
2. **Monitor Performance**: Compare build times before and after
3. **Use Workflow Conditionals**: Run certain jobs only on specific runners
4. **Implement Timeouts**: Prevent stuck jobs:
   ```yaml
   jobs:
     build:
       runs-on: apexalgo-iad-runners
       timeout-minutes: 30
   ```
5. **Regular Maintenance**: Keep runner infrastructure updated

## Security Considerations

1. **Secrets Management**: 
   - Self-hosted runners have access to all repository secrets
   - Use environment-specific secrets when possible

2. **Network Isolation**:
   - Runners should be in a secure network segment
   - Implement egress controls for external access

3. **Container Security**:
   - Scan images used in workflows
   - Use specific image tags, not `latest`

4. **Code Review**:
   - Review PR workflows carefully
   - Consider using `pull_request_target` with caution

## Conclusion

By following these instructions, your face-detection repository will leverage the ApexAlgo IAD self-hosted runners for improved build performance and reliability. Monitor the initial builds closely and adjust configurations as needed for optimal performance.

For support or issues, contact your infrastructure team or check the runner deployment logs in the ApexAlgo IAD cluster.