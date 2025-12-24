using Minio;
using Minio.DataModel.Args;
using Microsoft.Extensions.Configuration;
using MyPortfolio.Application.Interfaces;

namespace MyPortfolio.Infrastructure.Services;

public class BlobStorageService
{
    private readonly IMinioClient _minioClient;
    private readonly string _bucketName;

    public BlobStorageService(IMinioClient minioClient, IConfiguration configuration)
    {
        _minioClient = minioClient;
        _bucketName = configuration["Minio:BucketName"] ?? "default-bucket";
    }

    public async Task UploadFileAsync(string objectName, Stream data, string contentType)
    {
        // Ensure bucket exists
        var beArgs = new BucketExistsArgs().WithBucket(_bucketName);
        bool found = await _minioClient.BucketExistsAsync(beArgs);
        if (!found)
        {
            var mbArgs = new MakeBucketArgs().WithBucket(_bucketName);
            await _minioClient.MakeBucketAsync(mbArgs);
        }

        var putObjectArgs = new PutObjectArgs()
            .WithBucket(_bucketName)
            .WithObject(objectName)
            .WithStreamData(data)
            .WithObjectSize(data.Length)
            .WithContentType(contentType);

        await _minioClient.PutObjectAsync(putObjectArgs);
    }
}
