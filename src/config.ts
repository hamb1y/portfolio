// src/config.ts
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "A lot";

export type InfoCard = {
  name: string;
  title: string;
  description: string;
};

export type SocialLink = {
  platform: string;
  url: string;
  username?: string;
  icon?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type Hobby = {
  title: string;         // emoji allowed
  description?: string;
};
