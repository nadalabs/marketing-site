export const post = {
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      options: {
        list: [
          { title: "Investing", value: "Investing" },
          { title: "Home Equity", value: "Home Equity" },
          { title: "Webinars", value: "Webinars" },
          { title: "Research", value: "Research" }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'coverImage',
    },
  },
};
