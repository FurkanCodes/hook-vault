import { Code2, Copy } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <section className="container">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={Code2}
          title="Interactive Examples"
          description="Live code examples with Monaco Editor and Sandpack integration"
        />
        <FeatureCard
          icon={Copy}
          title="Copy-Paste"
          description="Easily integrate hooks into your projects with simple copy and paste functionality"
        />
        <FeatureCard
          icon={Code2}
          title="Well-Documented"
          description="Each hook comes with clear documentation and usage examples."
        />
      </div>
    </section>
  );
}