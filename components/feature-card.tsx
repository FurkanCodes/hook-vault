import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string; // Optional tag prop
  href?: string; // Optional href for clickable cards
}

export function FeatureCard({ icon: Icon, title, description, tag, href }: FeatureCardProps) {
  // If there's a tag, it's a hook and should be clickable
  const isClickable = !!tag;

  // Wrapper component to conditionally add Link
  const Wrapper = isClickable ? Link : "div";

  return (
    <Wrapper href={href || "#"} className={isClickable ? "block" : "block cursor-default"}>
      <Card className="h-full hover:shadow-lg transition-shadow flex flex-col group hover-scale dark:bg-gray-900 dark:border-gray-800">
        <CardContent className="pt-6 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-6 w-6 text-primary " /> {/* Icon */}
              <h3 className="font-semibold text-lg  transition-colors">
                {title}
              </h3> {/* Title */}
            </div>
            {tag && <Badge variant="secondary">{tag}</Badge>} {/* Optional tag */}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed group-hover:text-foreground dark:group-hover:text-gray-100 transition-colors">
            {description}
          </p>
        </CardContent>
      </Card>
    </Wrapper>
  );
}