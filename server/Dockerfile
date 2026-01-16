# --- Stage 1: Build ---
    FROM node:20.9.0-alpine AS build
    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy the rest of your source files
    COPY . .
    
    # Compile TypeScript -> JavaScript
    RUN npm run build
    
    # --- Stage 2: Run ---
    FROM node:20.9.0-alpine
    WORKDIR /app
    
    # Copy only the build output and production dependencies
    COPY --from=build /app/dist ./dist
    # Copy tsconfig for any tooling that references it (optional)
    COPY --from=build /app/tsconfig.json ./tsconfig.json
    COPY package*.json ./
    
    # Install only production dependencies
    RUN npm install --omit=dev
    
    ENV PORT=8000
    EXPOSE 8000
    
    # Start compiled JS (paths already rewritten by tsc-alias)
    CMD ["node", "dist/app.js"]
    
