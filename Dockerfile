FROM node:20-alpine AS builder

WORKDIR /app

# Required by this project's vite.config.ts
ARG PORT=4173
ARG BASE_PATH=/
ENV PORT=${PORT}
ENV BASE_PATH=${BASE_PATH}

COPY package*.json ./
COPY pnpm-lock.yaml* ./
COPY yarn.lock* ./

# Convert monorepo-only versions to standalone-friendly versions.
RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));for(const section of ['dependencies','devDependencies','peerDependencies','optionalDependencies']){if(!p[section])continue;for(const [k,v] of Object.entries(p[section])){if(typeof v!=='string')continue;if(v==='catalog:'){p[section][k]='latest';}if(v==='workspace:*'){delete p[section][k];}}}fs.writeFileSync('package.json',JSON.stringify(p,null,2));"

RUN if [ -f pnpm-lock.yaml ]; then \
      corepack enable && pnpm install --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      corepack enable && yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

COPY . .
RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('tsconfig.json','utf8'));delete p.extends;delete p.references;fs.writeFileSync('tsconfig.json',JSON.stringify(p,null,2));"
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ARG PORT=4173
ENV PORT=${PORT}
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server.mjs ./server.mjs
COPY --from=builder /app/dist/public ./dist/public

EXPOSE 4173

CMD ["node", "server.mjs"]
