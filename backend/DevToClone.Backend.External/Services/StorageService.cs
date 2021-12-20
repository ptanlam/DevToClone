using System;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using DevToClone.Backend.Application.External;
using DevToClone.Backend.Application.Models.External;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace DevToClone.Backend.External.Services
{
    public class StorageService : IStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly StorageSettings _settings;

        public StorageService(IAmazonS3 s3Client, IOptions<StorageSettings> settings)
        {
            _settings = settings.Value;
            _s3Client = s3Client ??
                throw new ArgumentNullException(nameof(s3Client));
        }

        public async Task<UploadedFileResponse> Upload(IFormFile file)
        {
            try
            {
                var objectKey = Guid.NewGuid().ToString();
                using var inputStream = file.OpenReadStream();
                var putObjectRequest = new PutObjectRequest()
                {
                    InputStream = inputStream,
                    Key = objectKey,
                    BucketName = _settings.BucketName,
                    ContentType = file.ContentType,
                };

                var response = await _s3Client.PutObjectAsync(putObjectRequest);
                return new UploadedFileResponse()
                {
                    Url = GenereatePreSignedUrl(objectKey)
                };
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        private string GenereatePreSignedUrl(string objectKey)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _settings.BucketName,
                Key = objectKey,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddHours(24)
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
