using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyPortfolio.Infrastructure.Persistence;
using MyPortfolio.Application.Interfaces;
using MyPortfolio.Infrastructure.Repositories;
using Hangfire;
using Hangfire.PostgreSql;
using Minio;
using Npgsql;
using System.Data;

namespace MyPortfolio.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                connectionString,
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        // Dapper Connection
        services.AddScoped<IDbConnection>(sp => new NpgsqlConnection(connectionString));

        // Dapper Connection
        services.AddScoped<IDbConnection>(sp => new NpgsqlConnection(connectionString));

        // MinIO
        services.AddMinio(configureClient => configureClient
            .WithEndpoint(configuration["Minio:Endpoint"])
            .WithCredentials(configuration["Minio:AccessKey"], configuration["Minio:SecretKey"])
            .Build());
            
        services.AddScoped<Services.BlobStorageService>();
        services.AddScoped<IProjectRepository, ProjectRepository>();

        return services;
    }
}
