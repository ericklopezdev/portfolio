---
title: CrowShare
description: A secure, temporary file-sharing application built on AWS with serverless architecture.
date: 2025-01-15
tags: ['AWS', 'Terraform', 'React', 'Python', 'Lambda', 'Cognito', 'CloudFront']
image: /images/projects/crowshare.png
gitlab: https://gitlab.com/ericklopezdev/crowshare
---

# CrowShare

A secure, temporary file-sharing application built on AWS. Users can upload files and generate short-lived download links that expire after 24 hours.

## Features

- Temporary file sharing with 24-hour expiration links
- Authentication via Cognito with Google OAuth support
- Serverless architecture using AWS Lambda
- React frontend hosted on CloudFront
- Infrastructure as Code with Terraform

## Architecture

- **Frontend**: React application hosted on CloudFront
- **Backend**: Python serverless functions on AWS Lambda
- **Authentication**: AWS Cognito with Google OAuth integration
- **Infrastructure**: Fully managed with Terraform

## Tech Stack

- **Frontend**: React, Node.js 16+
- **Backend**: Python 3.9+, AWS Lambda
- **Infrastructure**: Terraform 1.0+, AWS CLI
- **Cloud Services**: AWS Cognito, CloudFront, API Gateway, S3

## Quick Start

1. **Backend & Infrastructure (Terraform)**
   ```bash
   cd infra
   terraform init
   terraform apply
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Connect Frontend to Backend**
   Update `frontend/src/App.jsx` with the API Gateway endpoint from Terraform output.

4. **Run Locally**
   ```bash
   npm run dev
   ```
