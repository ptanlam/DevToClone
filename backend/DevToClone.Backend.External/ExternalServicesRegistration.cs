using DevToClone.Backend.Application.External;
using DevToClone.Backend.External.Services;
using Microsoft.Extensions.DependencyInjection;
using DevToClone.Backend.Application.Models.External;
using Microsoft.Extensions.Configuration;
using Amazon.S3;

namespace DevToClone.Backend.External
{
    public static class ExternalServicesRegistration
    {
        public static void AddExternalServices(
            this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDefaultAWSOptions(configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();

            services.Configure<StorageSettings>(configuration
                .GetSection(nameof(StorageSettings)));

            services.AddSingleton<IStorageService, StorageService>();
        }
    }
}
