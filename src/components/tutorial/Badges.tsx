import React from "react";
import { Badge } from "@chakra-ui/react";

/**
 * Generates a list of badges to display
 * @param props
 * @returns
 */
const Badges: React.FC<{
  badges?: Array<string>;
  badgeColors: { [key: string]: string };
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "subtle" | "outline";
}> = ({ badges, badgeColors = {}, size = "md", variant = "solid" }) =>
  badges && badges.length > 0 ? (
    <div className="flex flex-row gap-1 margin-block-0 font-[family-name:var(--fontFamily-sans)]">
      {badges.map((badge) => (
        <Badge
          key={badge}
          size={size}
          variant={variant}
          colorPalette={badgeColors[badge] || "gray"}
        >
          {badge}
        </Badge>
      ))}
    </div>
  ) : null;

export default Badges;
