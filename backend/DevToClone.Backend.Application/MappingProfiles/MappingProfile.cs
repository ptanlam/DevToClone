using AutoMapper;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostById;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.Features.Posts.Queries.Shared;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Domain.PostAggregate;

namespace DevToClone.Backend.Application.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostListVm>().ReverseMap();
            CreateMap<Post, PostDetailsVm>().ReverseMap();

            CreateMap<UserProfileResponse, AuthorDto>().ReverseMap();
        }
    }
}