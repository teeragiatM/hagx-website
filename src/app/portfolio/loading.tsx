import { SpinnerOverlay } from "@/components/ui/Spinner";

export default function PortfolioLoading() {
  return (
    <main className="flex min-h-screen flex-col">
      <SpinnerOverlay className="flex-1" />
    </main>
  );
}
