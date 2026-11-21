import { ValidationError, type CollectionConfig } from "payload";

export const Registrations: CollectionConfig = {
    slug: 'registrations',
    labels: {
        singular: 'Påmelding',
        plural: 'Påmeldinger',
    },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'event', 'createdAt'],
    },
    access: {
        read: ({ req }) => Boolean(req.user),
        create: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    indexes: [
        {
            fields: ['email', 'event'],
            unique: true,
        },
    ],
    hooks: {
        beforeValidate: [
            async ({ data, originalDoc, req }) => {
                if (!data) return data

                const rawEmail = data.email ?? originalDoc?.email
                const event = data.event ?? originalDoc?.event

                const eventId = 
                typeof event === 'object' && event !== null ? event.id : event

                if (
                    typeof rawEmail !== 'string' || eventId === undefined || eventId === null
                ) {
                    return data
                }

                const email = rawEmail.trim().toLowerCase()
                data.email = email

                const existing = await req.payload.find({
                    collection: 'registrations',
                    req,
                    overrideAccess: true,
                    limit: 1,
                    depth: 0,
                    where: {
                        and: [
                            { email: { equals: email  } },
                            { event: { equals: eventId } },
                            ...(originalDoc?.id != null
                            ? [{ id: { not_equals: originalDoc.id } }]
                            : []),
                        ],
                    },
                })

                if (existing.docs.length > 0) {
                    throw new ValidationError({
                        errors: [
                            {
                                path: 'email',
                                message: 'Denne e-postadressen er allererde påmeldt',
                            },
                        ],
                    })
                }

                return data
            },
        ],
    },
    fields: [
        {
            name: 'name',
            label: 'Navn',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            label: 'E-post',
            type: 'email',
            required: true,
            hooks: {
                beforeValidate: [
                    ({ value }) => {
                        if (typeof value === 'string') {
                            return value.trim().toLowerCase()
                        }
                    }
                ]
            }
        },
        {
            name: 'event',
            label: 'Filmkveld',
            type: 'relationship',
            relationTo: 'events',
            required: true,
        },
    ]
}