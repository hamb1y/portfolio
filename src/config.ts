export const config = {
  name: "Your Name Here",
  title: "Your Title Here",
  description: "Your description here.",

  social: {
    github: "https://github.com/yourusername",
    discord: "https://discord.gg/yourinvite",
    bluesky: "https://yourhandle.bsky.social",
    youtube: "https://youtube.com/@yourchannel"
  },

  skills: [
    { name: "Skill 1", level: "Beginner" },
    { name: "Skill 2", level: "Intermediate" },
    { name: "Skill 3", level: "Advanced" },
  ],

  hobbies: [
    "Hobby 1",
    "Hobby 2",
    "Hobby 3",
  ],

  projects: [
    {
      id: "project1",
      title: "Project Title",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      technologies: [
        "Tech 1",
        "Tech 2",
        "Tech 3",
      ],
      link: "/projects/portfolio",
      featured: true
    },
  ],
  achievements: [
    {
      "id": "achievement1",
      "title": "Achievement Title",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "technologies": [
        "Tech 1",
        "Tech 2",
        "Tech 3",
      ],
      "featured": true,
      "image": "/assets/background.svg",
      "achievement-type": "category1",
      "achievement-id": "ACHIEVEMENT1"
    },
  ],

  achievementTypes: [
    {
      id: "category1",
      title: "Category 1",
      order: 1
    },
    {
      id: "category2",
      title: "Category 2",
      order: "2"
    }
  ]
}

export type Skill = typeof config.skills[number];
export type Hobbies = typeof config.hobbies[number];
export type Project = typeof config.projects[number];
export type Achievement = typeof config.achievements[number];
export type SocialLinks = typeof config.social;
export type AchievementType = typeof config.achievementTypes[number];