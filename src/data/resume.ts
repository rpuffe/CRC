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
    title: "Routine deploys and user setup without a DevOps ticket",
    problem: "Routine requests such as lower-environment deploys and user provisioning waited on a two-person DevOps team.",
    change:
      "I built a CLI that lets engineering managers deploy to lower environments, a tool that lets support staff provision users, and on-demand preview environments.",
  },
  {
    title: "QA reads AWS logs without a developer",
    problem: "QA had no practical way to read AWS logs or match them to the code they were testing.",
    change:
      "I built a Claude Code plugin: IAM roles, plus a setup prompt that installs a CloudWatch MCP server, clones the repos, and loads context on our environments. QA can now do this without a developer.",
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
    "DevOps Lead on a two-person team and primary owner of the AWS infrastructure: about 30 services across 8 accounts and 10 environments. I set DevOps priorities, make the architecture decisions, and coordinate releases.",
  bullets: [
    "Cut about 20 minutes from every production deploy by rebuilding the pipelines as reusable Terraform modules with separate build and deploy stages. Builds now finish before database migrations start, migrations run as their own stage, and tests moved to pull requests.",
    "Cut Aurora spend by an estimated $10K a month: a cost review led me to one query in a job running every 10 minutes, and adding the missing index dropped read I/O about 70% and ACU use about 60%.",
    "Took routine requests off the DevOps queue with self-service tooling: a CLI that lets engineering managers deploy to lower environments, a tool that lets support staff provision users, and on-demand preview environments triggered from GitHub Actions.",
    "Take security hotfixes from fix to production as a regular part of the job. In one, a Java CVE affecting every backend microservice was fixed in production within five hours of reaching me: I found a runtime flag that stops Java using the affected code, profiled it in lower environments, and coordinated QA, release, and product to ship it.",
    "Primary escalation for production incidents. A typical one: on a Sunday support call I traced an unresponsive production service to high CPU and restarted the task, then profiled it and pulled logs so developers got a ticket with the evidence for a permanent fix.",
    "Built a Claude Code plugin so QA can read AWS logs alongside the code under test without pulling in a developer: I created the IAM roles and wrote a setup prompt that installs a CloudWatch MCP server, clones the repos, and loads context on our environments and where the logs are. Also set up automated AI code review for the division's engineers.",
    "Turned the half-day, hands-on job of restoring production data into staging environments into an unattended one-hour pipeline.",
    "Own branching strategy and release management across the GitHub organization, with per-service releases across 10 environments and a deployment tracker (Lambda, CodePipeline events) that updates Jira and notifies Teams, so nobody has to chase release status.",
    "Set the approach for the planned move of production infrastructure from AWS Copilot to Terraform: migrate first, converting services module by module.",
  ],
};

export const earlierRoles = [
  {
    title: "System Administrator",
    dates: "May 2021 – Mar 2024",
    items: [
      "Brought DevOps in-house from the contracting firm that had built and run the whole platform, moving infrastructure management, pipelines, and day-to-day operations to Eldermark staff",
      "Migrated workloads to AWS using EC2, S3, Transfer Family, and Terraform",
    ],
  },
  {
    title: "IT Specialist",
    dates: "Sep 2016 – May 2021",
    items: [
      "Ran Windows Server and network infrastructure across datacenters, offices, and cloud, and maintained customer databases, including backups",
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
