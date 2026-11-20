// All résumé copy lives here so wording changes never touch layout code.

export const profile = {
  name: "Robert Puffe",
  title: "DevOps Lead",
  focus: ["AWS", "Terraform", "CI/CD"],
  location: "Remote (US) · Jamestown, ND",
  email: "robertpuffe@gmail.com",
  linkedin: "https://linkedin.com/in/robert-puffe-aa092a6a/",
  github: "https://github.com/rpuffe",
  resumePdf: "/Robert-Puffe-Resume.pdf",
  // One plain sentence first, for readers who don't know the tooling.
  plain:
    "I keep the cloud systems and release process running behind two HIPAA-regulated healthcare platforms, so new versions ship safely and developers aren't waiting on me.",
  detail:
    "DevOps Lead at Eldermark, on a two-person team supporting 40+ engineers and about 30 services across 8 AWS accounts. I started there in IT support ten years ago and have done DevOps work since 2021. My focus is platform engineering: tooling that lets engineers deploy and provision without filing a ticket.",
};

// Four pieces of work, each as the problem and what I did about it. Shown on the homepage.
export const selectedWork = [
  {
    title: "About 20 minutes cut from every production deploy",
    problem:
      "Each service ran test, build, and deploy in sequence, so about 20 minutes of image builds sat inside the deploy window after database migrations had started.",
    change:
      "I rebuilt the pipelines as reusable Terraform modules with separate build and deploy stages, and moved tests to pull requests.",
  },
  {
    title: "An estimated $10K a month off the Aurora bill",
    problem: "A cost review showed Aurora I/O climbing as production data grew.",
    change:
      "I traced it to one query in a job that runs every 10 minutes and added the missing index. Read I/O fell about 70% and capacity use about 60%.",
  },
  {
    title: "Self-service instead of tickets",
    problem: "Routine requests such as lower-environment deploys and user provisioning waited on a two-person DevOps team.",
    change:
      "I built a CLI that lets engineering managers deploy to lower environments, a tool that lets support staff provision users, and on-demand preview environments.",
  },
  {
    title: "QA reads AWS logs without a developer",
    problem: "Non-technical QA staff had no practical way to read AWS logs or match them to the code they were testing.",
    change:
      "I built a Claude Code plugin with scoped IAM roles, a CloudWatch MCP server, and a guided setup that clones the repos and loads context on our environments. QA now identifies defects on their own.",
  },
];

export const flightdeck = {
  name: "Flightdeck",
  plain: "A pipeline that takes a small containerized app from a repository to a live HTTPS URL on AWS.",
  lead: "An app repo supplies a Dockerfile and a short YAML manifest. Reusable workflows handle Terraform, security scanning, HTTPS routing, and promotion to production.",
  facts:
    "Best measured run from app spec to verified URL: 6m 38s. The image tested in dev is the one promoted to production, and GitHub deploys through short-lived OIDC roles with no stored AWS keys.",
  credit: "I wrote the specs and made the architecture decisions; the implementation was done with AI coding tools.",
  tags: ["AWS", "Terraform", "ECS Fargate", "GitHub Actions", "OIDC"],
  repo: "https://github.com/rpuffe/flightdeck",
};

export const currentRole = {
  company: "Eldermark",
  companyMeta: "A LivTech company · Healthcare SaaS · Remote",
  companyDates: "Sep 2016 – Present",
  title: "DevOps Engineer, promoted to DevOps Lead (Apr 2026)",
  dates: "Mar 2024 – Present",
  scope:
    "Lead of a two-person team and primary owner of the AWS infrastructure behind two HIPAA-regulated production platforms: about 30 services across 8 accounts and 10 environments. I set DevOps priorities, make the architecture decisions, coordinate releases, and am the primary production escalation.",
  bullets: [
    "Cut about 20 minutes from every production deploy by rebuilding the pipelines as reusable Terraform modules with separate build and deploy stages. Builds now finish before database migrations start, migrations run as their own stage, and tests moved to pull requests.",
    "Cut Aurora spend by an estimated $10K a month: a cost review led me to one query in a job running every 10 minutes, and adding the missing index dropped read I/O about 70% and ACU use about 60%.",
    "Took routine requests off the DevOps queue with self-service tooling: a CLI that lets engineering managers deploy to lower environments, a tool that lets support staff provision users, and on-demand preview environments triggered from GitHub Actions.",
    "Built a Claude Code plugin that lets non-technical QA staff read AWS logs against the code under test and identify defects on their own: scoped IAM roles, a CloudWatch MCP server, and a guided setup that clones the repos and loads context on our environments.",
    "Turned the half-day, hands-on job of restoring production data into staging environments into an unattended one-hour pipeline.",
    "Remediate vulnerabilities end to end: find the fix, prove it in lower environments, and coordinate QA, release, and product to ship it as a hotfix. A recent Java CVE affecting every backend microservice was fixed in production within five hours of reaching me.",
    "Handle production incidents as primary escalation, including weekends: restore service first, then profile and pull logs so developers get a ticket with the evidence for a permanent fix, as with a recent service made unresponsive by CPU saturation.",
    "Own branching strategy and release management across the GitHub organization, with per-service releases across 10 environments and a deployment tracker (Lambda, CodePipeline events) that updates Jira and notifies Teams.",
    "Planned the migration of production infrastructure from AWS Copilot to Terraform, choosing a migrate-first approach that converts services module by module.",
    "Set up automated AI code review for the division's engineers.",
  ],
};

export const earlierRoles = [
  {
    title: "System Administrator",
    dates: "May 2021 – Mar 2024",
    items: [
      "Brought DevOps in-house from the contracting firm that had built and run the whole platform, moving infrastructure management, pipelines, and day-to-day operations to Eldermark staff",
      "Migrated workloads to AWS using EC2, S3, Transfer Family, and Terraform",
      "Consolidated multiple Office 365 and Google Workspace environments into a single Office 365 tenant",
    ],
  },
  {
    title: "IT Specialist",
    dates: "Sep 2016 – May 2021",
    items: [
      "Led the technical side of moving staff to remote work during the pandemic, and wrote the documentation for it",
      "Joined sales and customer calls to answer technical questions, demonstrate the product, and support customer migration projects",
    ],
  },
];

export const earlierExperience = {
  dates: "2012 – 2016",
  items: [
    { employer: "Central Business Systems", title: "Document Management Specialist, Computer Repair Technician" },
    { employer: "RadioShack", title: "Store Manager" },
  ],
};

export const skills = [
  {
    group: "Cloud (AWS)",
    items: ["ECS", "Fargate", "Lambda", "RDS Aurora", "EC2", "S3", "ECR", "IAM", "VPC", "Route 53", "CloudFront", "API Gateway", "DynamoDB", "Transfer Family", "CloudWatch"],
  },
  {
    group: "Infrastructure as code and CI/CD",
    items: ["Terraform", "Terraform Cloud", "CloudFormation", "AWS Copilot", "GitHub Actions", "GitHub OIDC", "CodePipeline", "CodeBuild", "Docker", "Git"],
  },
  {
    group: "Languages, data, and tooling",
    items: ["Python (Boto3)", "Bash", "PowerShell", "SQL", "PostgreSQL", "Liquibase (database migrations)", "Linux", "LaunchDarkly (feature flags)", "Elastic APM", "ELK", "Trivy", "Checkov"],
  },
  {
    group: "Secondary",
    items: ["Kubernetes on EKS"],
  },
];
