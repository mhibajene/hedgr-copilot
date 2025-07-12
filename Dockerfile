# Stage 1: Install dependencies & build frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install PNPM
RUN npm install -g pnpm

# Copy monorepo config, install all JS deps
COPY package.json pnpm-workspace.yaml turbo.json ./
RUN pnpm install --frozen-lockfile

# Copy everything and build (frontend + any other TS/JS targets)
COPY . .
RUN pnpm build

# Stage 2: Run your production server (here: serve Next.js frontend)
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built assets and necessary files
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/package.json ./package.json

# Expose your frontend port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]