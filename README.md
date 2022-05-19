# Devto clone

An application taking inspiration from [Devto](https://dev.to) for learning **`Angular`** and **`ASP.NET`** purpose.

## Prerequisites

1. Docker.

## Instructions

1. Open terminal.
2. Set AWS credentials:
   1. `export AWS_ACCESS_KEY_ID=your_access_key_id`
   2. `export AWS_SECRET_ACCESS_KEY=your_secret_access_key`
   3. `export AWS_STORAGE_BUCKET=your_s3_bucket`
3. Change directory to this repository.
4. Start database by using: `docker compose up mssql -d`
5. Change directory to backend: `cd backend`
6. Update database commands:
   1. Migrate domain models: `dotnet ef database update -s DevToClone.Backend.API/DevToClone.Backend.API.csproj --project DevToClone.Backend.Persistence/DevToClone.Backend.Persistence.csproj --context DevToCloneDbContext`
   2. Migrate identity models: `dotnet ef database update -s DevToClone.Backend.API/DevToClone.Backend.API.csproj --project DevToClone.Backend.Identity/DevToClone.Backend.Identity.csproj --context DevToCloneIdentityDbContext`
7. Change directory to root application: `cd ..`
8. Run the application: `docker compose up -d`
9. Navigate to <http://localhost:4200> and start blogging 🎉.
