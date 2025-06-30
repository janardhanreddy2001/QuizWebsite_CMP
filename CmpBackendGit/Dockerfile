# Use an official OpenJDK 17 slim image as the base
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy your project files into the container
COPY . .

# Make sure your build script is executable
RUN chmod +x build.sh

# Install Maven (if needed)
# You can skip this if you're using the Maven wrapper (`mvnw`)
RUN apt-get update && \
    apt-get install -y wget unzip && \
    wget https://downloads.apache.org/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.zip && \
    unzip apache-maven-3.8.6-bin.zip -d /opt && \
    ln -s /opt/apache-maven-3.8.6/bin/mvn /usr/bin/mvn

# Verify Maven installation
RUN mvn -version

# Default command to build your project
CMD ["./build.sh"]
