import type { ReactNode } from "react";

export function PageHeading({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <header className="page-heading"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</header>;
}
