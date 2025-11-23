using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using MyPortfolio.Application.DTOs;
using MyPortfolio.Domain.Entities;

namespace MyPortfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        
        config.NewConfig<Project, ProjectDto>();

        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();

        return services;
    }
}
