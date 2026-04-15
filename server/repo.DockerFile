FROM node:20-alpine

WORKDIR /app

# install required tools
RUN apk add --no-cache git openssh-client
RUN npm install -g pnpm 

  CMD sh -c 'mkdir -p /output && \
  if [ -z "$GITHUB_TOKEN" ]; then \
    git clone $REPO_URL repo; \
  else \
    AUTH_URL=$(echo $REPO_URL | sed "s|https://|https://$GITHUB_TOKEN@|"); \
    git clone $AUTH_URL repo; \
  fi && \
  cd repo && \
  pnpm install && \
  pnpm build && \
  cp -r dist /output'