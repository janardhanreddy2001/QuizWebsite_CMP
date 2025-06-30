#!/bin/bash

# Set JAVA_HOME for Render (REQUIRED before using Maven)
export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

# Optional: Print Java version for confirmation
java -version

# Navigate into your backend project folder (update this if needed)
cd CmpBackendGit

# Make sure Maven wrapper is executable
chmod +x mvnw

# Build the Spring Boot app
./mvnw clean package -DskipTests
