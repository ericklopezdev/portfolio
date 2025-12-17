---
title: "K3s RBAC mistakes"
date: 2025-03-01
tags: [kubernetes, security]
---

## Context
I deployed k3s on low-memory hardware and underestimated RBAC complexity.

## What went wrong
- Used default service accounts
- Over-permissive roles
- No namespace isolation

## Fix
I introduced least-privilege roles and explicit bindings.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: read-only
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]

