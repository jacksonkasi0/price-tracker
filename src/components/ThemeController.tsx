"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@iconicicons/react";
import { Button, Tooltip } from "@lemonsqueezy/wedges";
import { useTheme } from "next-themes";

export function ThemeController() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="m-auto flex w-fit flex-col items-center gap-8 text-left">
      <Tooltip
        sideOffset={8}
        content={`Click to switch to the ${
          theme === "light" ? "dark" : "light"
        } theme`}
      >
        <Button
          variant="transparent"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          isIconOnly
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </Tooltip>
    </div>
  );
}
