using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace DevToClone.Backend.Application.External
{
    public interface IStorageService
    {
        Task<UploadedFileResponse> Upload(IFormFile file);
    }
}
