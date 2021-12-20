FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["DevToClone.Backend.API/DevToClone.Backend.API.csproj", "src/DevToClone.Backend.API/"]
COPY ["DevToClone.Backend.Application/DevToClone.Backend.Application.csproj", "src/DevToClone.Backend.Application/"]
COPY ["DevToClone.Backend.Domain/DevToClone.Backend.Domain.csproj", "src/DevToClone.Backend.Domain/"]
COPY ["DevToClone.Backend.Identity/DevToClone.Backend.Identity.csproj", "src/DevToClone.Backend.Identity/"]
COPY ["DevToClone.Backend.Persistence/DevToClone.Backend.Persistence.csproj", "src/DevToClone.Backend.Persistence/"]

RUN dotnet restore "src/DevToClone.Backend.API/DevToClone.Backend.API.csproj"
COPY . .
WORKDIR "/src/DevToClone.Backend.API"
RUN dotnet build "DevToClone.Backend.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DevToClone.Backend.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DevToClone.Backend.API.dll"]
