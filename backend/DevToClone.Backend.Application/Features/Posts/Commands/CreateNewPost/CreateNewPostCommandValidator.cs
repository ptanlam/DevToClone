using FluentValidation;

namespace DevToClone.Backend.Application.Features.Posts.Commands.CreateNewPost
{
    public class CreateNewPostCommandValidator :
        AbstractValidator<CreateNewPostCommand>
    {
        public CreateNewPostCommandValidator()
        {
            RuleFor(p => p.Title).NotEmpty()
                .MaximumLength(250);

            RuleFor(p => p.Content).NotEmpty();
        }
    }
}