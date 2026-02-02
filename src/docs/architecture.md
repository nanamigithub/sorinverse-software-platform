# Sorinverse Architecture Overview

## 1. Architectural Philosophy

Sorinverse architecture is designed around separation of concerns, secrecy of mechanism, and clarity of responsibility.

The platform does not expose how intelligence works.
It exposes what intelligence does.

---

## 2. Architecture Layer

The Architecture layer contains specialized engines including but not limited to:
- Orchestrator
- Structure
- System
- Relationship
- Fate
- Perception
- Expression
- Management
- Value
- Resource
- Protection
- Evidence
- Physic
- Memory

Each engine:
- Has a single dominant responsibility
- Communicates via internal contracts
- Is not directly callable by external systems

---

## 3. Pipeline Layer

The Pipeline layer executes decisions.

Components:
- Planner: transforms intent into plans
- Executor: performs actions via connectors
- Reporter: summarizes and records outcomes

Pipelines may be linear or branching.

---

## 4. Systems Layer

Systems are consumers of internal capabilities.

They:
- Declare dependencies
- Request plans
- Receive execution results
- Expose user-facing interfaces

Systems do not implement intelligence.
They utilize intelligence.

---

## 5. Data & Registry

Registries define:
- What exists
- What can be composed
- What can be sold

They do not define how execution works.

---

## 6. Security Boundary

Any attempt to move engine logic into Systems is considered a breach.

The boundary between Architecture and Systems is absolute.

---

## 7. Evolution

The architecture is designed to scale in:
- Capability count
- Automation depth
- Execution autonomy

Without violating constitutional constraints.
