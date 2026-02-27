import { Card } from "@/components/Card";

type MetricCardProps = {
  value: string;
  label: string;
  context: string;
};

export function MetricCard({ value, label, context }: MetricCardProps) {
  return (
    <Card hoverLift className="space-y-3">
      <p className="font-mono text-3xl font-semibold text-zinc-100">{value}</p>
      <h3 className="font-heading text-sm uppercase tracking-[0.14em] text-cyan-200">{label}</h3>
      <p className="text-sm leading-6 text-zinc-300">{context}</p>
    </Card>
  );
}
