export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface GravityItem {
  text: string;
  color: string;
  textColor: string;
  width?: number;
}