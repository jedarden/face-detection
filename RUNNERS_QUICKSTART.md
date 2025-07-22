# Quick Start: ApexAlgo IAD Runners

## 🚀 5-Minute Setup

### 1. Update All Workflows

```bash
# Run this command in your repository root
find .github/workflows -name "*.yml" -exec sed -i 's/runs-on: ubuntu-latest/runs-on: apexalgo-iad-runners/g' {} \;
```

### 2. Commit and Push

```bash
git add .github/workflows/
git commit -m "Use ApexAlgo IAD self-hosted runners"
git push
```

### 3. Verify

Check your latest workflow run:
- ✅ Should start immediately (runners are pre-warmed)
- ✅ Should run faster (cached Docker layers)
- ✅ Should show "self-hosted" in the job details

## 📋 What Gets Updated

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

## 🎯 Benefits

| Feature | GitHub Hosted | ApexAlgo IAD |
|---------|--------------|--------------|
| Startup Time | 1-2 minutes | < 10 seconds |
| Docker Layers | Cold | Pre-cached |
| Concurrent Jobs | Limited | Up to 12 |
| Cost | Per minute | Free |
| Network | Public | Private |

## 🔍 Troubleshooting

### Runner Not Found?
```bash
# Check if your repo can see the runners
gh api /repos/${{ github.repository }}/actions/runners
```

### Need to Rollback?
```bash
# Revert to GitHub-hosted runners
find .github/workflows -name "*.yml" -exec sed -i 's/runs-on: apexalgo-iad-runners/runs-on: ubuntu-latest/g' {} \;
```

## 📊 Example Results

```
GitHub Hosted Runner:
- Build time: 25+ minutes ❌
- Queue time: 1-2 minutes
- Docker pull: 2-3 minutes

ApexAlgo IAD Runner:
- Build time: 5-8 minutes ✅
- Queue time: < 10 seconds
- Docker pull: < 30 seconds (cached)
```

## 🔗 Resources

- Full setup guide: [APEXALGO_RUNNERS_SETUP.md](./APEXALGO_RUNNERS_SETUP.md)
- Runner status: Check with your infrastructure team
- Support: File issues in your infrastructure repository

---

**Ready to speed up your builds? Just run the sed command above and push! 🚀**