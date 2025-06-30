#!/bin/bash

# Set JAVA_HOME for Render (Render provides JDK here)
export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

# Confirm Java is available
echo "🟢 Java version:"
"$JAVA_HOME/bin/java" -version

# Make sure Maven wrapper is executable
chmod +x mvnw

# Run Maven to build the Spring Boot app
./mvnw clean package -DskipTests
