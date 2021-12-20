using System;
using System.Threading;
using System.Threading.Tasks;
using DevToClone.Backend.Application.External;
using MediatR;

namespace DevToClone.Backend.Application.Files
{
    public class UploadNewFileCommandHandler:
        IRequestHandler<UploadNewFileCommand, UploadedFileResponse>
    {
        private readonly IStorageService _storageService;

        public UploadNewFileCommandHandler(IStorageService storageService)
        {
            _storageService = storageService ??
                throw new ArgumentNullException(nameof(storageService));
        }

        public async Task<UploadedFileResponse> Handle(UploadNewFileCommand request,
            CancellationToken cancellationToken)
        {
            return await _storageService.Upload(request.File);
        }
    }
}
