using System;
using System.Threading.Tasks;
using DevToClone.Backend.Application.Files;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevToClone.Backend.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("files")]
    public class FilesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FilesController(IMediator mediator)
        {
            _mediator = mediator ?? 
                throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<ActionResult<string>> Upload(
            [FromForm] UploadNewFileCommand uploadNewFileCommand)
        {
            var response = await _mediator.Send(uploadNewFileCommand);
            return Ok(response);
        }
    }
}
