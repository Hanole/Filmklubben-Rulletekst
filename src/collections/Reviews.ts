import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  labels: {
    singular: "Anmeldelse",
    plural: "Anmeldelser",
  },
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) {
        return true;
      }
      return {
        _status: {
          equals: "published",
        },
      };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: "title",
      type: "text",
      label: "Tittel",
      required: true,
    },
    {
      name: "filmTitle",
      type: "text",
      label: "Filmtittel",
      required: true,
    },
    {
      name: "rating",
      label: "Terningkast",
      type: "select",
      required: true,
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
      ],
    },
    {
      name: "mainImage",
      type: "upload",
      relationTo: "media",
      label: "Hovedbilde",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Forfatter",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "bruk små bokstaver og bindestrek, for eksempel: dune-part-2-er-sinnsykt-bra",
      },
    },
    {
      name: "content",
      label: "Anmeldelsesinnhold",
      type: "richText",
      required: true,
    },
  ],
};
