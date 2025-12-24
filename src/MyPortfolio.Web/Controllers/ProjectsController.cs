using MediatR;
using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Application.Projects.Commands.CreateProject;
using MyPortfolio.Application.Projects.Queries.GetProjects;

namespace MyPortfolio.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProjectsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var result = await _mediator.Send(new GetProjectsQuery());
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectCommand command)
    {
        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetProjects), new { id = result.Id }, result);
    }
}
