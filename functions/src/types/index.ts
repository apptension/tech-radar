export interface EnvironmentConfig {
  space: string;
  environment: string;
}

export interface IconType {
  id: string;
  description: string;
  name: string;
  url: string;
}

export interface AlternativesTableType {
  id: string;
  description: string;
  icon: IconType;
  label: string;
}
