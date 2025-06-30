FROM node:22.16.0-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# ❌ Removed Bun install step

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Run build during image build
RUN ./build.sh

# Run the Java application
CMD ["java", "-jar", "target/your-application.jar"]
