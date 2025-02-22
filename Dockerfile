FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia e ripristina le dipendenze di entrambi i progetti
COPY ["Commons/Commons.csproj", "Commons/"]
COPY ["OrderManager/OrderManager.csproj", "OrderManager/"]
RUN dotnet restore "OrderManager/OrderManager.csproj"

# Copia tutto il codice
COPY . .

# Compila entrambi i progetti
WORKDIR "/src/Commons"
RUN dotnet build -c Release -o /app/build

WORKDIR "/src/OrderManager"
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "OrderManager.dll"]
