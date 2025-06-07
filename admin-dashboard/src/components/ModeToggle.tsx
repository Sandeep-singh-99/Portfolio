import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  
  const themeLabel = theme
    ? theme.charAt(0).toUpperCase() + theme.slice(1)
    : "System";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 h-9 px-3 rounded-md hover:bg-accent/50 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          aria-label={`Current theme: ${themeLabel}. Toggle theme`}
        >
          <div className="relative h-5 w-5">
            <Sun
              className={`h-5 w-5 text-foreground/80 transition-transform duration-300 ease-in-out ${
                theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
              }`}
            />
            <Moon
              className={`absolute top-0 h-5 w-5 text-foreground/80 transition-transform duration-300 ease-in-out ${
                theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
              }`}
            />
          </div>
          <span className="text-sm font-medium">{themeLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="p-2 rounded-lg shadow-lg border border-border bg-background/95 backdrop-blur-sm"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md cursor-pointer transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2H5z"
            />
          </svg>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}