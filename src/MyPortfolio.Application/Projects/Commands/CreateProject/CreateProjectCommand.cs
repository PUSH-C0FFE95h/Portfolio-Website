using FluentValidation;
using MediatR;
using MyPortfolio.Application.DTOs;
using MyPortfolio.Application.Interfaces;
using MyPortfolio.Domain.Entities;

namespace MyPortfolio.Application.Projects.Commands.CreateProject;

public record CreateProjectCommand(string Title, string Description, string ProjectUrl) : IRequest<ProjectDto>;

public class CreateProjectCommandValidator : AbstractValidator<CreateProjectCommand>
{
    public CreateProjectCommandValidator()
    {
        RuleFor(v => v.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

        RuleFor(v => v.Description)
            .NotEmpty().WithMessage("Description is required.");
        
        RuleFor(v => v.ProjectUrl)
             .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
             .When(x => !string.IsNullOrEmpty(x.ProjectUrl))
             .WithMessage("ProjectUrl must be a valid URL.");
    }
}

public class CreateProjectCommandHandler : IRequestHandler<CreateProjectCommand, ProjectDto>
{
    private readonly IProjectRepository _context;

    public CreateProjectCommandHandler(IProjectRepository context)
    {
        _context = context;
    }

    public async Task<ProjectDto> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var entity = new Project
        {
            Title = request.Title,
            Description = request.Description,
            ProjectUrl = request.ProjectUrl,
            CreatedAt = DateTime.UtcNow
        };

        await _context.AddAsync(entity);
        
        // Manual mapping for now, or inject mapper
        return new ProjectDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Description = entity.Description,
            ProjectUrl = entity.ProjectUrl
        };
    }
}
