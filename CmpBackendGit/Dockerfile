# Base image with Node.js (matching your environment)
FROM node:22.16.0-slim

# Install dependencies for Java and Bun
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    unzip \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install Bun (latest version or specify a version)
RUN curl -fsSL https://bun.sh | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Verify installations
RUN java -version
RUN node -v
RUN bun -v

# Set working directory
WORKDIR /app

# Copy your project files
COPY . .

# Make your build script executable
RUN chmod +x build.sh

# Run your build script
CMD ["./build.sh"]
