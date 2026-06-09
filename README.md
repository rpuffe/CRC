# robertpuffe.com (Cloud Resume Challenge)

This project was created as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev), using AWS services to host and deploy.

Live site: [https://robertpuffe.com](https://robertpuffe.com)

## Architecture

The site is static HTML and CSS in S3, served through CloudFront with TLS from ACM and DNS in Route 53. 

The visitor counter is an API Gateway HTTP API in front of a small Python Lambda that increments a count in DynamoDB. 

All infrastructure is defined in the CloudFormation template `deploy/template/CRCCloudFormation.yml`. When this was created other projects used AWS Copilot, which primarily uses CloudFormation for additional resources. This helped getting experience as previous migration projects used Terraform. 

## How deploys work

When changes to `site/` are pushed to `main`, a webhook triggers the CodeBuild project, which runs `buildspec.yml` to copy the files to S3 and trigger a CloudFront invalidation.

Infrastructure deploys through CloudFormation Git sync. After the initial creation of the stack, any changes pushed to the `deploy/` directory trigger an update to the stack.

## Repo layout

```
site/                          # the static site (HTML/CSS, favicons)
deploy/template/               # CloudFormation template (all infrastructure)
deploy/deployparams.yml        # stack parameters (CloudFormation Git sync)
buildspec.yml                  # CodeBuild: sync site/ to S3 + invalidate CDN
```

## Running locally

```
python3 -m http.server 4173 --directory site
```

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
