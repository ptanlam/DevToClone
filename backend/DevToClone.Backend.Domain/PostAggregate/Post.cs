using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using DevToClone.Backend.Domain.Common;

namespace DevToClone.Backend.Domain.PostAggregate
{
    public class Post : AuditableEntity
    {
        private List<Tag> _tags = new();

        public Post(string title, string content, bool published, string authorId)
        {
            Title = title;
            Content = content;
            Published = published;
            AuthorId = authorId;
        }

        private Post()
        {
        }

        public IEnumerable<Tag> Tags => _tags.AsReadOnly();

        public string Title { get; private set; }
        public string Content { get; private set; }
        public bool Published { get; private set; }
        public string AuthorId { get; }

        public void AddTags(IEnumerable<Tag> tags)
        {
            this._tags.AddRange(tags);
        }

        public void UpdateTitle(string newTitle)
        {
            if (string.IsNullOrEmpty(newTitle)) return;
            Title = newTitle;
        }

        public void UpdateContent(string newContent)
        {
            if (string.IsNullOrEmpty(newContent)) return;
            Content = newContent;
        }

        public void UpdatePublished(bool published)
        {
            if (Published == published) return;
            Published = published;
        }

        public void UpdateTags(IEnumerable<Tag> tags)
        {
            _tags.Clear();
            _tags.AddRange(tags);
        }

        public void Delete()
        {
            DeletedAt = DateTime.UtcNow;
        }
    }
}