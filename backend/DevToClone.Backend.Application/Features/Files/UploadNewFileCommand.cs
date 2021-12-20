using DevToClone.Backend.Application.External;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace DevToClone.Backend.Application.Files
{
    public class UploadNewFileCommand : IRequest<UploadedFileResponse>
    {
        public IFormFile File { get; set; }
    }
}
