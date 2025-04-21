## Tools required for development

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) ^v22.11.0(LTS Jod)
  To support version lock-in between projects, it'd recommended to use Node.js version management tools such as
  [fnm](https://fnm.vercel.app/),
  [nvm](https://github.com/nvm-sh/nvm),
  [asdf](https://asdf-vm.com). Of course, you can just install it from the official website.
- [pnpm](https://pnpm.io/) >=9.15.9
- [Visual Studio Code](https://code.visualstudio.com/)

Go to the current folder and check the version of Node.js.

```sh
node -v
```

## Environment setup procedure

### Settings up pnpm

This project use Node.js as well as pnpm for dependency resolution and requires a bit of preparation to set up the first time.

If you have installed it globally via npm, please uninstall it first.

```sh
npm uninstall -g pnpm
```

We will enable automatic setup of yarn using `corepack`, a package management tool that is included as standard with Node.js.

```sh
corepack enable
corepack prepare pnpm
```

If you are using Node.js via a version control tool such as fnm , nvm or asdf , you may need to reshim or rehash, also you can enable [shell integration](https://github.com/nvm-sh/nvm?tab=readme-ov-file#deeper-shell-integration) to match extract version in `.nvmrc`

Navigate to the project root folder and check the pnpm version.

```sh
pnpm -v
```

It should show the correct version as mentioned in `package.json` field `packageManager`
`9.15.9`

### Resolve dependencies

```sh
pnpm install
```

### Build the project

```sh
pnpm build
```

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
