# Use Node.js 22.16.0 slim as the base image
FROM node:22.16.0-slim

# Install Java 17, curl, wget, unzip
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Verify installations
RUN java -version
RUN node -v
RUN bun -v

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make build.sh executable
RUN chmod +x build.sh

# Run your build script when container starts
CMD ["./build.sh"]
