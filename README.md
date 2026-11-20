# robertpuffe.com (Cloud Resume Challenge)

This project was created as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev), using AWS services to host and deploy.

Live site: [https://robertpuffe.com](https://robertpuffe.com)

## Architecture

The site is built with [Astro](https://astro.build), Tailwind CSS, and [shadcn/ui](https://ui.shadcn.com) components, and rendered to static HTML at build time. The output is stored in S3 and served through CloudFront with TLS from ACM and DNS in Route 53. 

The visitor counter is an API Gateway HTTP API in front of a small Python Lambda that increments a count in DynamoDB. 

All infrastructure is defined in the CloudFormation template `deploy/template/CRCCloudFormation.yml`. When this was created other projects used AWS Copilot, which primarily uses CloudFormation for additional resources. This helped getting experience as previous migration projects used Terraform. 

## How deploys work

When changes to the site source (`src/`, `public/`, or the build config) are pushed to `main`, a webhook triggers the CodeBuild project. It runs `buildspec.yml`: `npm ci`, `npm run build`, validate `dist/`, sync it to S3, invalidate CloudFront, and smoke-test the live site.

Infrastructure deploys through CloudFormation Git sync. After the initial creation of the stack, any changes pushed to the `deploy/` directory trigger an update to the stack.

## Repo layout

```
src/pages/index.astro          # resume homepage
src/pages/projects.astro       # Flightdeck case study (built as /projects.html)
src/data/resume.ts             # all resume copy, separate from layout
src/layouts/Base.astro         # shared head, header, footer
src/components/ui/             # shadcn/ui components
src/styles/globals.css         # Tailwind + light/dark theme tokens
public/                        # favicons, photo, resume PDF (copied as-is)
deploy/template/               # CloudFormation template (all infrastructure)
deploy/deployparams.yml        # stack parameters (CloudFormation Git sync)
buildspec.yml                  # CodeBuild: build, sync dist/ to S3, invalidate CDN
```

## Running locally

```
npm install
npm run dev
```

Requires Node 22.23.4 or newer. `npm run build` writes the deployable site to `dist/`.

Then open http://localhost:4173. The visitor counter API allows `localhost:4173` through CORS, so the counter works locally too.

## What I'd do differently today

This started as a learning project, and a few choices show their age. If I were rebuilding it now I would:

- Switch the CloudFront origin from the legacy Origin Access Identity to Origin Access Control, and make the S3 bucket fully private
- Scope the CodeBuild role down from AdministratorAccess to only what the build needs
- Redirect www to the apex domain with a CloudFront Function instead of serving the site on both
- Move the Lambda code out of the inline template into its own file with tests
- Design and write more of the HTML by hand instead of using LLM

## What it costs

About a dollar a month: $0.50 for the Route 53 hosted zone and pennies of S3, CloudFront, Lambda, and DynamoDB usage at this traffic, plus the annual domain registration.
