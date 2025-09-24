<<<<<<< HEAD
import { parseMarkdownCollection, sortByFrontmatterOrder } from "./lib/content";
=======
import matter from "gray-matter";
>>>>>>> main

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "A lot";

type InfoFrontmatter = {
  name: string;
  title: string;
  description: string;
  order?: number;
};

type SocialFrontmatter = {
  platform: string;
  url: string;
  username?: string;
  icon?: string;
  featured?: boolean;
  order?: number;
};

type SkillFrontmatter = {
  name: string;
  level: SkillLevel;
  order?: number;
};

<<<<<<< HEAD
type HobbyFrontmatter = {
=======
export type Hobby = {
>>>>>>> main
  title: string;
  description?: string;
  order?: number;
};

<<<<<<< HEAD
=======
export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  featured?: boolean;
};

export type Achievement = {
  title: string;
  description: string;
  featured: boolean;
  image: string;
  "achievement-type": string;
  "achievement-id": string;
};

export type AchievementType = {
  id: string;
  title: string;
  order: number;
};

type ParsedEntry<T> = T & { path: string };
type SluggedEntry<T> = T & { slug: string };

function parseFrontmatter<T>(files: Record<string, string>): ParsedEntry<T>[] {
  return Object.entries(files).map(([path, raw]) => {
    const { data } = matter(raw);
    return { ...(data as T), path } as ParsedEntry<T>;
  });
}

function slugFromPath(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.[^.]+$/, "");
}

const toSluggedEntry = <T>(entry: ParsedEntry<T>): SluggedEntry<T> => ({
  ...entry,
  slug: slugFromPath(entry.path),
});

const sortBySlug = <T extends { slug: string }>(a: T, b: T) =>
  a.slug.localeCompare(b.slug);

>>>>>>> main
const infoFiles = import.meta.glob<string>("/src/pages/infos/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
const socialFiles = import.meta.glob<string>("/src/pages/social/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
const skillsFiles = import.meta.glob<string>("/src/pages/skills/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});
const hobbiesFiles = import.meta.glob<string>("/src/pages/hobbies/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

<<<<<<< HEAD
const infoEntries = sortByFrontmatterOrder(
  parseMarkdownCollection<InfoFrontmatter>(infoFiles, {
    baseDir: "/src/pages/infos",
  }),
);

const infoCards = infoEntries.map(({ data, slug, segments, relativePath }) => ({
  ...data,
  slug,
  segments,
  relativePath,
}));

const profileCard =
  infoCards.find((entry) => entry.slug === "profile") ??
  infoCards[0] ?? {
    slug: "profile",
    segments: ["profile"],
    relativePath: "profile",
=======
const infoEntries = parseFrontmatter<InfoCard>(infoFiles)
  .map(toSluggedEntry)
  .sort(sortBySlug);
const infoCards = infoEntries.map(({ path: _path, ...entry }) => entry);

const profileInfo =
  infoCards.find((entry) => entry.slug === "profile") ??
  infoCards[0] ?? {
    slug: "profile",
>>>>>>> main
    name: "",
    title: "",
    description: "",
  };

<<<<<<< HEAD
const socialEntries = sortByFrontmatterOrder(
  parseMarkdownCollection<SocialFrontmatter>(socialFiles, {
    baseDir: "/src/pages/social",
  }),
);

const socialLinks = socialEntries.map(({ data, slug }) => ({
  ...data,
  slug,
}));
=======
const socialEntries = parseFrontmatter<SocialLink>(socialFiles)
  .map(toSluggedEntry)
  .sort(sortBySlug);
const socialLinks = socialEntries.map(({ path: _path, ...entry }) => entry);
>>>>>>> main

const social = socialLinks.reduce<Record<string, string>>((acc, entry) => {
  if (entry.url) {
    acc[entry.slug] = entry.url;
  }
  return acc;
}, {});

<<<<<<< HEAD
const skillsEntries = sortByFrontmatterOrder(
  parseMarkdownCollection<SkillFrontmatter>(skillsFiles, {
    baseDir: "/src/pages/skills",
  }),
);

const skills = skillsEntries.map(({ data }) => data);

const hobbyEntries = sortByFrontmatterOrder(
  parseMarkdownCollection<HobbyFrontmatter>(hobbiesFiles, {
    baseDir: "/src/pages/hobbies",
  }),
);

const hobbyDetails = hobbyEntries.map(({ data, slug }) => ({
  ...data,
  slug,
}));

const hobbies = hobbyDetails.map((entry) => entry.title);

export const config = {
  name: profileCard.name,
  title: profileCard.title,
  description: profileCard.description,
  profile: profileCard,
=======
const skillsEntries = parseFrontmatter<Skill>(skillsFiles);
const skills = skillsEntries
  .map(({ path: _path, ...skill }) => skill)
  .sort((a, b) => a.name.localeCompare(b.name));

const hobbyEntries = parseFrontmatter<Hobby>(hobbiesFiles)
  .map(toSluggedEntry)
  .sort(sortBySlug);
const hobbyDetails = hobbyEntries.map(({ path: _path, ...entry }) => entry);
const hobbies = hobbyDetails.map((entry) => entry.title);

export const config = {
  name: profileInfo.name,
  title: profileInfo.title,
  description: profileInfo.description,
  profile: {
    name: profileInfo.name,
    title: profileInfo.title,
    description: profileInfo.description,
  },
>>>>>>> main
  infos: infoCards,
  social,
  socialLinks,
  skills,
  hobbies,
  hobbyDetails,
  projects: [
    {
      id: "orangesmp",
      title: "OrangeSMP",
      description:
        "A heavily modded minecraft server with a custom modpack, with Bedrock Edition support through GeyserMC crossplay and requiring no client-side mods to play!",
      technologies: [
        "Java",
        "Minecraft",
        "GeyserMC",
        "Linux",
        "Server/Enterprise",
        "Web",
        "Artifical Intelligence",
        "JavaScript",
        "TypeScript",
        "Astro.js",
        "Vercel",
      ],
      link: "https://orangesmp.rishimalnad.dev",
      featured: true,
    },
    {
      id: "jnvckm-site-v2",
      title: "JNVCKM Site v2",
      description:
        "The second version of the Jawahar Navodaya Vidyalaya Site using TinaCMS for the blogging system, CommentBox for comment system, Vercel for hosting, Supabase for authenthication, and Astro.js as the JS framework. Uses no databases and if done right can be totally hosted for free!",
      technologies: [
        "Web",
        "Artifical Intelligence",
        "JavaScript",
        "TypeScript",
        "Astro.js",
        "TinaCMS",
        "CommentBox",
        "Vercel",
        "Supabase",
      ],
      link: "https://jnvckm.org",
      featured: true,
    },
    {
      id: "portfolio",
      title: "Portfolio",
      description:
        "A (mostly) static portfolio site built using Astro.js and hosted on Vercel. Instead of regularly configuring it by typing out a bunch of stuff, there's a central src/config.ts file that does all that for me. All I have to do is type the configuration I want, and the changes happen appropiately. The only places where I need to do anything manually are the project/*.mdx files for projects without a different web-location.",
      technologies: [
        "Web",
        "Artifical Intelligence",
        "JavaScript",
        "TypeScript",
        "Astro.js",
        "Vercel",
      ],
      link: "/",
      featured: false,
    },
    {
      id: "phoneserver-1",
      title: "Converting old, broken phone to server",
      description:
        "I've repurposed my grandmother's old, broken phone to a webserver for use as an FTP endpoint and hosting for the JNVCKM Site v2. To learn more, go to View Project →.",
      technologies: [
        "Web",
        "Artifical Intelligence",
        "Linux",
        "Bash",
        "Python",
        "Android",
        "Server/Administration",
      ],
      link: "/projects/phoneserver-1",
      featured: false,
    },
    {
      id: "localai",
      title: "Running local AI models on my laptop",
      description:
        "I've been running artificial intelligence models locally on my laptop, and I'll show you how",
      technologies: [
        "Artificial Intelligence",
        "Server/Administration",
        "Bash",
        "Ollama",
        "Python",
      ],
      link: "/projects/localai",
    },
  ],
  achievements: [
    {
      title: "Deens Academy Model United Nations (Grade 7 - 2024/25)",
      description:
        "During the academic year of 2024/25, I entered into my first model United Nations competition, the Deens Model United Nations (DMUN) Special Political and Decolonisation Junior Committee (SPECPOL), and had we even managed to reach a resolution for the conflict within 2 days with a mostly mutual agreement. I also raised a query with the Speaker being biased towards the Representative of India. Overall, I think it broadened my scope on global politics, and helped me raise my voice against injustices.",
      featured: true,
      image:
        "/certificates/Deens Academy Model United Nations - Special Political and Decolonisation Committee - Certificate of Participation - 2024-25.webp",
      "achievement-type": "academia",
      "achievement-id": "DMUN-SPECPOL-PARTICIPATION-2024",
    },
    {
      title: "Ei Asset Certificate of Distinguished Performance (Grade 5 - 2022/23)",
      description:
        "Recognized for exceptional performance across all subjects in the 2022/23 Grade 5 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 5B - Certificate of Distinguished Performance - 2022-23.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-DISTINGUISHED-PERFORMANCE-5B-2022",
    },
    {
      title: "Ei Asset Certificate of Outstanding Performance in Science (Grade 5 - 2022/23)",
      description:
        "Awarded for remarkable achievement in Science during the 2022/23 Grade 5 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 5B - Certificate of Outstanding Performance - Science - 2022-23.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-OUTSTANDING-SCIENCE-5B-2022",
    },
    {
      title: "Ei Asset Certificate of Academic Excellence (Grade 6 - 2023/24)",
      description:
        "Honored for ranking in the 15th percentile in the 2023/24 Grade 6 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 6A - 15th Percentile - 2023-24.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-ACADEMIC-EXCELLENCE-6A-2023",
    },
    {
      title: "Ei Asset Certificate of Outstanding Performance in Mathematics (Grade 6 - 2023/24)",
      description:
        "Celebrated for exceptional skills in Mathematics in the 2023/24 Grade 6 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 6A - Certificate of Outstanding Performance - Mathemathics - 2023-24.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-OUTSTANDING-MATH-6A-2023",
    },
    {
      title: "Ei Asset Certificate of Outstanding Performance in Science (Grade 6 - 2023/24)",
      description:
        "Acknowledged for superior performance in Science during the 2023/24 Grade 6 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 6A - Certificate of Outstanding Performance - Science - 2023-24.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-OUTSTANDING-SCIENCE-6A-2023",
    },
    {
      title: "Ei Asset Certificate of Academic Excellence (Grade 7 - 2024/25)",
      description:
        "Recognized for achieving the 15th percentile in the 2024/25 Grade 7 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 7B - 15th Percentile - 2024-25.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-ACADEMIC-EXCELLENCE-7B-2024",
    },
    {
      title: "Ei Asset Bronze Scholar (Grade 7 - 2024/25)",
      description:
        "Earned the Bronze Scholar title for notable academic performance in the 2024/25 Grade 7 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 7B - Bronze Scholar - 2024-25.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-BRONZE-SCHOLAR-7B-2024",
    },
    {
      title: "Ei Asset Certificate of Credible Performance (Grade 7 - 2024/25)",
      description:
        "Commended for reliable and consistent performance in the 2024/25 Grade 7 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 7B - Certificate of Credible Performance - 2024-25.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-CREDIBLE-PERFORMANCE-7B-2024",
    },
    {
      title: "Ei Asset Certificate of Outstanding Performance (Grade 7 - 2024/25)",
      description:
        "Awarded for exceptional overall achievement in the 2024/25 Grade 7 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 7B - Certificate of Outstanding Performance - 2024-25.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-OUTSTANDING-PERFORMANCE-7B-2024",
    },
    {
      title: "Ei Asset Certificate for Commendable Performer (Grade 7 - 2024/25)",
      description:
        "Honored as a commendable performer in the 2024/25 Grade 7 Ei Asset Talent Search.",
      featured: false,
      image:
        "/certificates/Ei Asset - 7B - Commendable Performer.webp",
      "achievement-type": "ei-asset",
      "achievement-id": "EIA-COMMENDABLE-PERFORMER-7B-2024",
    },
    {
      title: "National Finance Olympiad - Intra-School Rank 1 Certificate (Grade 6 - 2023/24)",
      description:
        "Achieved first place within the school in the 2023/24 Grade 6 National Finance Olympiad.",
      featured: false,
      image:
        "/certificates/NFO - 6A - Intra School Rank 1 - 2023-24.webp",
      "achievement-type": "academia",
      "achievement-id": "NFO-INTRA-SCHOOL-RANK1-6A-2023",
    },
    {
      title: "National Finance Olympiad - All India Rank 9 Certificate (Grade 6 - 2023/24)",
      description:
        "Secured an impressive 9th rank nationwide in the 2023/24 Grade 6 National Finance Olympiad.",
      featured: true,
      image:
        "/certificates/NFO - 6A - Rank 9 AIR - 2023-24.webp",
      "achievement-type": "academia",
      "achievement-id": "NFO-ALL-INDIA-RANK9-6A-2023",
    },
    {
      title: "WhiteHat Jr. - Certified Game Developer Certificate (2020)",
      description:
        "Certified as a Game Developer by WhiteHat Jr. for completing their 2020 coding program.",
      featured: false,
      image:
        "/certificates/Whitehat Jr. - Certified Game Developer - 2020.webp",
      "achievement-type": "compsci",
      "achievement-id": "WHJ-GAME-DEVELOPER-2020",
    },
    {
      title: "WhiteHat Jr. - Silicon Valley Program - Code of Honour Certificate (2021)",
      description:
        "Received the Code of Honour for outstanding participation in WhiteHat Jr.’s 2021 Silicon Valley Program.",
      featured: false,
      image:
        "/certificates/WhiteHat Jr. - Silicon Valley Program - Code of Honour - 2021.webp",
      "achievement-type": "compsci",
      "achievement-id": "WHJ-SILICON-VALLEY-CODE-HONOUR-2021",
    },
  ],
  achievementTypes: [
    {
      id: "academia",
      title: "Academia",
      order: 1,
    },
    {
      id: "ei-asset",
      title: "Ei Asset Talent Search",
      order: 2,
    },
    {
      id: "personal",
      title: "Personal Projects",
      order: 3,
    },
    {
      id: "compsci",
      title: "Computer Science",
      order: 4,
    },
  ],
} as const;

<<<<<<< HEAD
export type InfoCard = (typeof config.infos)[number];
export type SocialLink = (typeof config.socialLinks)[number];
export type Skill = (typeof config.skills)[number];
export type Hobby = (typeof config.hobbyDetails)[number];
export type Project = (typeof config.projects)[number];
export type Achievement = (typeof config.achievements)[number];
export type AchievementType = (typeof config.achievementTypes)[number];
=======
>>>>>>> main
export type SocialLinks = typeof config.social;
