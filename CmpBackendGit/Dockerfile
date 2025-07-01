FROM node:22.16.0-slim

# Install Java and basic tools
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Build the app (skipping tests)
RUN ./build.sh

# Run the Spring Boot app
CMD ["java", "-jar", "target/your-application.jar"]
