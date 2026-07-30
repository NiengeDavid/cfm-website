import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const daysOfGloryType = defineType({
  name: 'daysOfGlory',
  title: 'Days of Glory',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'e.g. Day 1, Day 2, Day 3',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'day',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf,application/pdf',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      day: 'day',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, day, media } = selection
      return {
        title: title || 'Days of Glory',
        subtitle: day ? `${day}` : 'Days of Glory PDF',
        media,
      }
    },
  },
})
