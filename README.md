# Devto clone

## Prerequisites

- Docker.

## Instructions

1. Start database by using: `docker compose up mssql -d`
2. Change directory to backend: `cd backend`
3. Update database commands:
   1. Migrate domain models: `dotnet ef database update -s DevToClone.Backend.API/DevToClone.Backend.API.csproj --project DevToClone.Backend.Persistence/DevToClone.Backend.Persistence.csproj --context DevToCloneDbContext`
   2. Migrate identity models: `dotnet ef database update -s DevToClone.Backend.API/DevToClone.Backend.API.csproj --project DevToClone.Backend.Identity/DevToClone.Backend.Identity.csproj --context DevToCloneIdentityDbContext`
4. Change directory to root application: `cd ..`
5. Run the application: `docker compose up -d`
6. Navigate to <http://localhost:4200> and start blogging 🎉.
