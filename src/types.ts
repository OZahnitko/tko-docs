type link = {
  label: string;
  url: string;
};

export type file = {
  content: string;
  filePath: string;
  links: link[];
  name: string;
};
