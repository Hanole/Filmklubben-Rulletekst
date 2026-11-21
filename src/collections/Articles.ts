import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
    slug: 'articles',
    labels: {
        singular: 'Artikkel',
        plural: 'Artikler',
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
            name: 'subtitle',
            type: 'text',
            label: 'Undertittel',
        },
        {
            name: 'mainImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hovedbilde',
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            label: 'Forfatter',
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
            label: 'Artikkelinnhold',
            type: 'richText',
            required: true,
        }
    ],
}