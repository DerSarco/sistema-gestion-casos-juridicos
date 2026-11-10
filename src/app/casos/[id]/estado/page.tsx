import { CaseDetail } from "@/components/case-detail";
import { ChangeStatusForm } from "@/components/change-status-form";
export const instant = false;
export default async function ChangeStatusPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <CaseDetail caseCode={id} modal={<ChangeStatusForm caseCode={id} />} />; }
