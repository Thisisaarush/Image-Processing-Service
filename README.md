# Image Processing Service

## Deployment using Kubernetes

### Pre-requisites

- Use the following command to generate the base64 encoded secret and update the `secret.yaml` file with the generated secret.

```bash
  echo -n "your-secret" | base64
```

- Once the secrets are defined, apply them to your Kubernetes cluster:

```bash
  kubectl apply -f secrets.yaml
```
