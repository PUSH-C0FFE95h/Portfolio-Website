using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;
using MyPortfolio.Application.DTOs;
using MyPortfolio.Domain.Entities;
using FluentValidation;
using MediatR;
using MyPortfolio.Application.Common.Behaviors;

namespace MyPortfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings;
        
        config.NewConfig<Project, ProjectDto>();

        services.AddSingleton(config);
        services.AddScoped<IMapper, ServiceMapper>();

        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        services.AddMediatR(cfg => {
            cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly);
            cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
        });

        return services;
    }
}
