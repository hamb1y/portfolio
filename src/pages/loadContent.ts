// src/lib/loadContent.ts
import matter from "gray-matter";

// infos (nested)
const infoFiles = import.meta.glob("/src/pages/infos/**/*.md", { as: "raw", eager: true });
// social / skills / hobbies (flat)
const socialFiles = import.meta.glob("/src/pages/social/*.md", { as: "raw", eager: true });
const skillsFiles = import.meta.glob("/src/pages/skills/*.md", { as: "raw", eager: true });
const hobbiesFiles = import.meta.glob("/src/pages/hobbies/*.md", { as: "raw", eager: true });

function parseFrontmatterMap<T>(files: Record<string, string>) {
  return Object.entries(files).map(([path, raw]) => {
    const { data } = matter(raw);
    return { path, ...(data as T) };
  });
}

export const loadInfos   = () => parseFrontmatterMap<import("../config").InfoCard>(infoFiles);
export const loadSocial  = () => parseFrontmatterMap<import("../config").SocialLink>(socialFiles);
export const loadSkills  = () => parseFrontmatterMap<import("../config").Skill>(skillsFiles);
export const loadHobbies = () => parseFrontmatterMap<import("../config").Hobby>(hobbiesFiles);
