#!/bin/bash

# ✅ 1. Set Java environment (required by Maven)
export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

# ✅ 2. Confirm Java is available
echo "🟢 Java version:"
"$JAVA_HOME/bin/java" -version

# ✅ 3. Navigate into your Spring Boot project directory
cd CmpBackendGit || {
  echo "❌ Directory 'CmpBackendGit' not found. Please check your repo structure.";
  exit 1;
}

# ✅ 4. Make Maven wrapper executable
chmod +x mvnw

# ✅ 5. Build your Spring Boot application (skip tests to save time)
./mvnw clean package -DskipTests
