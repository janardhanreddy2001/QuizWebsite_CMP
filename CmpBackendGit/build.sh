#!/bin/bash

# Set JAVA_HOME for Render
export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

# Confirm Java is available
echo "🟢 Java version:"
"$JAVA_HOME/bin/java" -version

# Ensure Maven wrapper is executable
chmod +x mvnw

# Build the Spring Boot app
./mvnw clean package -DskipTests
