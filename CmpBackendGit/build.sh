#!/bin/bash

# Set JAVA_HOME for Render
export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

# Confirm Java works
echo "🟢 Java version:"
java -version

# If backend is in folder
cd CmpBackendGit || {
  echo "❌ 'CmpBackendGit' folder not found.";
  exit 1;
}

# Build the Spring Boot app
chmod +x mvnw
./mvnw clean package -DskipTests
