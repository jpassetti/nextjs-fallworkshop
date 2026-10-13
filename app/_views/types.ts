export type NavItem = {
  id: string;
  label?: string;
};

export type YearPageViewProps = {
  activeYear: string;
  people: unknown[];
  sponsors: unknown[];
  stories: unknown[];
  schedule: unknown;
  navItems: NavItem[];
  yearContent: {
    workshopDates: string | null;
    aboutVideoUrl: string | null;
    aboutContentHtml: string | null;
  };
};

export type StoriesPageViewProps = {
  stories: unknown[];
  activeYear: string;
  searchQuery?: string;
  navItems?: NavItem[];
  workshopDates?: string | null;
};

export type StoryImageNode = {
  sourceUrl: string;
  altText?: string;
  mediaDetails: {
    width: number;
    height: number;
  };
};

export type StoryData = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: {
    node: StoryImageNode;
  };
  storyInformation?: {
    storyType?: "still" | "video" | "photo_gallery" | string;
    stillImages?: Array<{
      stillImage: StoryImageNode & { caption?: string };
    }>;
    photoGalleries?: unknown[];
    videos?: Array<{ vimeoUrl: string }>;
    students?: unknown[];
    coaches?: unknown[];
  };
};

export type StoryPageViewProps = {
  storyData: StoryData;
  activeYear: string;
  navItems?: NavItem[];
  workshopDates?: string | null;
};
