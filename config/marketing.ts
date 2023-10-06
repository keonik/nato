import { MarketingConfig } from "@/types";

export const marketingConfig: MarketingConfig = {
    mainNav: [
      {
title: 'Features',
href: '#features'
      },
        {
          title: "Next.js",
          href: "#nextjs",
        },
        {
          title: "shadcn/ui",
          href: "#shadcn-ui",
        },
        {
          title: "Other Tools",
          nested: [
            {
              title: "Lucide Icons",
              href: "https://lucide.dev/",
            },
            {
              title: "Tailwind CSS",
              href: "https://tailwindcss.com/",
            },
            {
              title: "TypeScript",
              href: "https://www.typescriptlang.org/",
            },
            {
              title: "ESLint",
              href: "https://eslint.org/",
            },
            {
              title: "Prettier",
              href: "https://prettier.io/",
            },
          ],
        }
      ],
}