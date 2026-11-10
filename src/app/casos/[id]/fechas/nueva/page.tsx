import { CaseDetail } from "@/components/case-detail";
import { RelevantDateForm } from "@/components/relevant-date-form";
export const instant = false;
export default async function NewDatePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <CaseDetail caseCode={id} modal={<RelevantDateForm caseCode={id} />} />; }
