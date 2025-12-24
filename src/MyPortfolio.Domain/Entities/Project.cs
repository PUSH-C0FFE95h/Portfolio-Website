namespace MyPortfolio.Domain.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string ProjectUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
