# Production image release and rollback

The production Deployment is managed by the `face-detection` ArgoCD Application
on `ardenone-cluster`. Its source is
`k8s/ardenone-cluster/face-detection/face-detection-deployment.yml` in the
Forgejo `jedarden/declarative-config` repository. The current image reference
is `ghcr.io/jedarden/face-detection:2.0.5` (checked 2026-11-08). Use a full
semantic version release tag, such as `2.0.5`, or a `sha256` digest. Branch,
major/minor alias, and default registry tags may move and are unsuitable for
production.

## Release

1. Complete this repository's definition of done and publish the release image
   through the configured CI release process. The migration to Argo Workflows
   is tracked separately; a source commit or version file alone does not prove
   that an image exists. Record the release tag, source commit, image digest,
   and the currently deployed image reference before changing desired state.
2. Confirm the published image exists and resolves to the expected digest, for
   example with `docker buildx imagetools inspect` on the chosen full version
   reference. Do not use a moving alias as the deployment reference.
3. In `declarative-config`, change the Deployment `image:` to that release tag
   or digest. Set `APP_VERSION` to the same release version when present. Run
   this repository's validator against the edited manifest:

   ```bash
   bash scripts/verify-deployment-image.sh /home/coding/declarative-config/k8s/ardenone-cluster/face-detection/face-detection-deployment.yml
   ```

4. Validate the manifest with the `declarative-config` checks, commit to its
   `main` branch, and push to Forgejo. ArgoCD reconciles the change. Inspect
   the `face-detection` Application until it is Synced and Healthy; confirm the
   pod image and `/health` response at `https://face.jedarden.com/health`.
   Record the deployment commit and observed image digest with the owning
   application bead.

## Rollback

If the new release fails, restore the recorded prior pinned `image:` reference
and matching `APP_VERSION` in the same GitOps manifest. Run the validator and
manifest checks again, then commit and push the rollback to Forgejo. Confirm
ArgoCD is Synced and Healthy, the pod runs the prior image, and `/health` works.
Record the rollback commit and reason on the owning bead. Rollback changes
GitOps desired state; it does not mutate the managed Deployment directly.
