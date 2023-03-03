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

interface PreparedSysField {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
}

interface EntryBasicFields {
  description: string;
  experts: string;
  github: string;
  label: string;
  projects: string;
  specification: string;
  moved?: number;
}

export interface EntryFieldsData extends EntryBasicFields {
  alternatives: AlternativesTableType[];
  icon?: IconType;
  id?: string;
  quadrant: string;
  ring: string;
  team: string;
}

export interface PreparedEntry extends EntryBasicFields {
  alternatives: PreparedSysField[];
  icon?: PreparedSysField;
  quadrant: PreparedSysField;
  ring: PreparedSysField;
  team: PreparedSysField;
}
