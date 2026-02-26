export const socials = {
  LinkedIn: "https://www.linkedin.com/in/reddy4725/",
  GitHub: "https://github.com/saikrishnareddy595",
  Email: "mailto:reddamgufus21188@gmail.com"
} as const;

export const socialLabels = Object.keys(socials) as Array<keyof typeof socials>;
