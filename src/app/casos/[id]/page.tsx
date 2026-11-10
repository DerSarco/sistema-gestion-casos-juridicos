import { CaseDetail } from "@/components/case-detail";

export const instant = false;

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <CaseDetail caseCode={id} />; }
