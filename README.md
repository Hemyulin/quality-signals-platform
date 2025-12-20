# Quality Signals Platform

The Quality Signals Platform ingests automated test run data from CI pipelines and derives actionable quality signals (e.g. confidence score, flakiness, trends) to support release decisions.

The goal of the project is to demonstrate production-oriented backend architecture, test strategy, and CI/CD practices rather than UI polish.

---

## Scope

### In scope
- Ingesting test run results from CI pipelines
- Persisting test execution data
- Computing quality-related signals (confidence, flakiness, trends)
- Exposing read-only APIs for quality insights
- Lightweight web UI for visualization

### Explicitly out of scope
- Test execution itself
- Authentication / authorization
- Release orchestration
- Mobile applications
- Microservices or distributed system complexity

---

## Tech Stack

- Backend: NestJS (Node.js)
- Database: PostgreSQL
- Frontend: Next.js
- Testing: Vitest, Playwright
- CI/CD: GitHub Actions
- Infrastructure: Docker, Docker Compose

---

## Repository Structure

apps/
  api/        # Backend application (NestJS)
  web/        # Frontend application (Next.js)
infra/
  docker/     # Local and CI infrastructure (Docker)
docs/         # Architecture notes and documentation

---

## Project Status

🚧 Bootstrapping / foundation phase
Structure, CI skeleton, and architectural decisions are established before feature development.
