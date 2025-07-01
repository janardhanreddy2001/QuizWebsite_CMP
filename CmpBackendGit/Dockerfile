# Use Node.js image with slim Debian base
FROM node:22.16.0-slim

# Install Java 17 and basic tools
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    maven \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy all project files into the container
COPY . .

# Make build.sh executable if you're using one
RUN chmod +x build.sh

# Optional: If build.sh exists and runs Maven build
RUN ./build.sh || mvn clean package -DskipTests

# Run the Spring Boot jar
CMD ["java", "-jar", "target/cmp-2-0.0.1-SNAPSHOT.jar"]
