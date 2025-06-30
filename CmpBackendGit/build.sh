#!/bin/bash

# ✅ Use Render's Java environment variable
export JAVA_HOME="$RENDER_JAVA_HOME"
export PATH="$JAVA_HOME/bin:$PATH"

# Confirm Java works
echo "🟢 Java version:"
java -version

# Make sure Maven wrapper is executable
chmod +x mvnw

# Build your Spring Boot backend
./mvnw clean package -DskipTests
