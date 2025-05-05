import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "site",
        label: "Sites",
        path: "content/sites",
        fields: [
          {
            type: "string",
            name: "site_title",
            label: "Site Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "site_subtitle",
            label: "Site Subtitle",
            isBody: true,
            required: true
          },
          {
            type: "string",
            name: "site_card_title",
            label: "Site Card Title",
            isBody: true,
            required: true
          }
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            if (document._sys.filename == "From-Buzz-to-Buy") {
              return "/"
            }
          },
        },
      },
      {
        name: "game_start",
        label: "Game Start",
        path: "content/game_start",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          }
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            if (document._sys.filename == "Storyline") {
              return "/"
            }
          },
        },
      },
      {
        name: "game_setup",
        label: "Game Setup",
        path: "content/game_setup",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
          {
            type: 'number',
            name: 'boot_price',
            label: 'Boot Price',
          }
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => {
            if (document._sys.filename == "Game-Setup") {
              return "/"
            }
          },
        },
      }
    ],
  },
});
