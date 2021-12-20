using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DevToClone.Backend.Application.Contracts.Authentication;
using DevToClone.Backend.Application.Contracts.Persistence;
using DevToClone.Backend.Application.Features.Posts.Commands.CreateNewPost;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostById;
using DevToClone.Backend.Application.Features.Posts.Queries.GetPostPagedList;
using DevToClone.Backend.Application.MappingProfiles;
using DevToClone.Backend.Application.Models.Authentication;
using DevToClone.Backend.Domain.PostAggregate;
using FluentAssertions;
using Moq;
using Xunit;

namespace DevToClone.Backend.UnitTesting.Application.Features
{
    public class PostFeatureUnitTests
    {
        private readonly IMapper _mapper;
        private readonly Mock<IAuthenticationService> _mockAuthenticationService;
        private readonly Mock<IPostRepository> _mockPostRepository;

        public PostFeatureUnitTests()
        {
            _mockPostRepository = new Mock<IPostRepository>();
            _mockAuthenticationService = new Mock<IAuthenticationService>();
            _mapper = new MapperConfiguration(cfg => { cfg.AddProfile<MappingProfile>(); }).CreateMapper();

            _mockPostRepository.Setup(x =>
                    x.ListAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(new List<Post>
                {
                    new("First Title", "First content",
                        true, Guid.NewGuid().ToString()),
                    new("Second Title", "Second content",
                        true, Guid.NewGuid().ToString())
                });

            _mockPostRepository.Setup(x => x.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(
                    new Post("First Title", "First content",
                        true, Guid.NewGuid().ToString()));

            _mockPostRepository.Setup(x => x.AddAsync(It.IsAny<Post>()))
                .ReturnsAsync(
                    new Post("First Title", "First content",
                        true, Guid.NewGuid().ToString()));

            _mockAuthenticationService.Setup(x => x.GetUserProfile(It.IsAny<string>(), ""))
                .ReturnsAsync((true, new UserProfileResponse
                {
                    AvatarUrl = "image.com",
                    Email = "author@gmail.com",
                    Id = Guid.NewGuid().ToString(),
                    UserName = "author123"
                }));
        }

        [Fact]
        public async Task GetPostPagedList_ShouldReturnExpectedPosts()
        {
            var request = new GetPostPagedList
            {
                PageNumber = 1,
                PageSize = 10
            };

            var handler = new GetPostPagedListHandler(
                _mockPostRepository.Object, _mockAuthenticationService.Object, _mapper);

            var result = await handler.Handle(request, default);

            result.TotalCount.Should().Be(2);
        }

        [Fact]
        public async Task GetById_ShouldReturnExpectedPost()
        {
            var request = new GetPostById
            {
                Id = Guid.NewGuid()
            };

            var handler = new GetPostByIdHandler(
                _mockPostRepository.Object, _mapper,
                _mockAuthenticationService.Object);

            var result = await handler.Handle(request, default);

            _mockPostRepository.Verify(x => x.GetByIdAsync(request.Id));
            result.Title.Should().Be("First Title");
            result.Content.Should().Be("First content");
        }

        [Fact]
        public async Task GetById_InExistentPost_ShouldReturnNull()
        {
            Post post = null;

            _mockPostRepository.Setup(x => x.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync(post);

            var request = new GetPostById
            {
                Id = Guid.NewGuid()
            };

            var handler = new GetPostByIdHandler(
                _mockPostRepository.Object, _mapper,
                _mockAuthenticationService.Object);

            var result = await handler.Handle(request, default);

            _mockPostRepository.Verify(x => x.GetByIdAsync(request.Id));
            result.Should().Be(null);
        }

        [Fact]
        public async Task CreateNewPost_ShouldAddAndReturnAddedPost()
        {
            var command = new CreateNewPostCommand
            {
                Title = "Title",
                Content = "Content",
                Published = false
            };

            var handler = new CreateNewPostCommandHandler(_mockPostRepository.Object, _mapper,
                _mockAuthenticationService.Object);

            var result = await handler.Handle(command, default);

            _mockPostRepository.Verify(x => x.AddAsync(It.IsAny<Post>()));
            result.Title.Should().Be("First Title");
            result.Content.Should().Be("First content");
            result.CreatedAt.Should().BeBefore(DateTime.UtcNow);
        }

        [InlineData("", "content")]
        [InlineData("title", "")]
        [Theory]
        public async Task CreateNewPost_InvalidCommand_ShouldReturnNull(
            string title, string content)
        {
            var command = new CreateNewPostCommand
            {
                Title = title,
                Content = content,
                Published = false
            };

            var handler = new CreateNewPostCommandHandler(_mockPostRepository.Object, _mapper,
                _mockAuthenticationService.Object);

            var result = await handler.Handle(command, default);

            result.Should().Be(null);
            _mockPostRepository.Verify(x => x.AddAsync(It.IsAny<Post>()), Times.Never);
        }
    }
}