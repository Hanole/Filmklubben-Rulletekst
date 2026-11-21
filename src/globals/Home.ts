import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
    slug: 'home',
    label: 'Forside',
    access: {
        read: () => true,
        update: ({ req }) => Boolean(req.user),
    },
    fields: [
        {
            name: 'featuredEvent',
            label: 'Fremhevet filmkveld',
            type: 'relationship',
            relationTo: 'events',
            admin: {
                description: 'Velg filmkvelden som skal fremheves øverst på forsiden',
            },
        },
        {
            name: 'layout',
            label: 'Innholdsblokker',
            type: 'blocks',
            blocks: [
                {
                    slug: 'selectedReviews',
                    labels: {
                        singular: 'Anmeldelsesblokk',
                        plural: 'Anmeldelsesblokker',
                    },
                    fields: [
                        {
                            name: 'heading',
                            label: 'Overskrift',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'reviews',
                            label: 'Velg anmeldelser',
                            type: 'relationship',
                            relationTo: 'reviews',
                            hasMany: true,
                            required: true,
                        },
                    ],
                },
                {
                    slug: 'selectedArticles',
                    labels: {
                        singular: 'Artikkelblokk',
                        plural: 'Artikkelblokker',
                    },
                    fields: [
                        {
                            name: 'heading',
                            label: 'Overskrift',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'articles',
                            label: 'Velg artikler',
                            type: 'relationship',
                            relationTo: 'articles',
                            hasMany: true,
                            required: true,
                        },
                    ]
                }
            ]
        }
    ]
}