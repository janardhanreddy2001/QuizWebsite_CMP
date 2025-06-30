#!/bin/bash

# Debug: print the value of RENDER_JAVA_HOME
echo "RENDER_JAVA_HOME is: $RENDER_JAVA_HOME"

# Check if 'java' command is available in PATH
which java || echo "java command not found"

# If RENDER_JAVA_HOME is set, list its contents
if [ -n "$RENDER_JAVA_HOME" ]; then
    echo "Contents of RENDER_JAVA_HOME directory:"
    ls -l "$RENDER_JAVA_HOME"
fi

# Optional: Install Java if not available (assuming 'sudo' is permitted)
# Uncomment the following lines if needed
# sudo apt-get update
# sudo apt-get install -y openjdk-17-jdk

# Set JAVA_HOME if Java is installed and RENDER_JAVA_HOME is not set
# Example for Ubuntu-based environments:
# export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
# export PATH="$JAVA_HOME/bin:$PATH"

# Confirm Java version
echo "Java version:"
java -version

# Proceed with your build
chmod +x mvnw
./mvnw clean package -DskipTests
