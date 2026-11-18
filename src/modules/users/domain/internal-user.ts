export type InternalUser = {
  id: string;
  displayName: string;
  accessIdentifier: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
};

export type InternalRole = { id: string; name: string };
