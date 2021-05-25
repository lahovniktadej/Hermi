FROM maven as build

WORKDIR /app
COPY src ./src
COPY pom.xml ./
RUN mvn clean package

FROM openjdk:11-jre

WORKDIR /app
COPY --from=build /app/target/nalogi-0.0.1-SNAPSHOT.jar ./
CMD ["java", "-jar", "nalogi-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080