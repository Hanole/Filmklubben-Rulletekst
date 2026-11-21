import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
    slug: 'events',
    labels: {
        singular: 'Filmkveld',
        plural: 'Filmkvelder',
    },
    admin: {
        useAsTitle: 'title'
    },
    versions: {
        drafts: true,
    },
    access: {
        read: ({ req }) => {
            if (req.user) {
                return true
            }
            return {
                _status: {
                    equals: 'published',
                },
            }
        },
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Tittel',
            required: true,
        },
        {
            name: 'startsAt',
            label: 'Dato og klokkeslett',
            type: 'date',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                    displayFormat: 'dd.MM.yyyy HH:mm',
                    timeFormat: 'HH:mm',
                },
            },
        },
        {
            name: 'location',
            label: 'Sted',
            type: 'text',
            required: true,
        },
        {
            name: 'mainImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hovedbilde',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'bruk små bokstaver og bindestrek, for eksempel: dune-part-2-er-sinnsykt-bra'
            }
        },
        {
            name: 'content',
            label: 'Om filmkvelden',
            type: 'richText',
            required: true,
        }
    ],
}