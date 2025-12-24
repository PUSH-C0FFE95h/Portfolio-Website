using MediatR;
using MyPortfolio.Application.DTOs;
using MyPortfolio.Application.Interfaces;
using MyPortfolio.Domain.Entities;
using Mapster;

namespace MyPortfolio.Application.Projects.Queries.GetProjects;

public record GetProjectsQuery : IRequest<List<ProjectDto>>;

public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, List<ProjectDto>>
{
    private readonly IProjectRepository _context;

    public GetProjectsQueryHandler(IProjectRepository context)
    {
        _context = context;
    }

    public async Task<List<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        var projects = await _context.GetAllAsync();
        
        // Map to DTO
        return projects.Select(p => new ProjectDto
        {
            Id = p.Id,
            Title = p.Title,
            Description = p.Description,
            ProjectUrl = p.ProjectUrl
        }).ToList();
    }
}
