"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { 
  Search, 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Copy,
  ExternalLink,
  FileText,
  Shield
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  keywords?: string[];
  group: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast here
      setOpen(false);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const commands = useMemo<CommandItem[]>(() => [
    // Navigation
    {
      id: "home",
      label: "Go to Home",
      description: "Navigate to homepage",
      icon: Home,
      action: () => {
        router.push("/");
        setOpen(false);
      },
      keywords: ["home", "index", "landing"],
      group: "Navigation"
    },
    {
      id: "about",
      label: "Go to About",
      description: "Learn more about me",
      icon: User,
      action: () => {
        router.push("/about");
        setOpen(false);
      },
      keywords: ["about", "bio", "profile"],
      group: "Navigation"
    },
    {
      id: "works",
      label: "Go to Works",
      description: "View my projects",
      icon: Briefcase,
      action: () => {
        router.push("/works");
        setOpen(false);
      },
      keywords: ["works", "projects", "portfolio"],
      group: "Navigation"
    },
    {
      id: "contact",
      label: "Go to Contact",
      description: "Get in touch",
      icon: Mail,
      action: () => {
        router.push("/contact");
        setOpen(false);
      },
      keywords: ["contact", "email", "reach"],
      group: "Navigation"
    },
    
    // Quick Actions
    {
      id: "copy-email",
      label: "Copy Email",
      description: "mzh@example.com",
      icon: Copy,
      action: () => copyToClipboard("mzh@example.com", "Email"),
      keywords: ["email", "copy", "contact"],
      group: "Quick Actions"
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "Visit my LinkedIn profile",
      icon: ExternalLink,
      action: () => {
        window.open("https://linkedin.com/in/mzh", "_blank");
        setOpen(false);
      },
      keywords: ["linkedin", "social", "profile"],
      group: "Quick Actions"
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "Check out my repositories",
      icon: ExternalLink,
      action: () => {
        window.open("https://github.com/mzh", "_blank");
        setOpen(false);
      },
      keywords: ["github", "code", "repos"],
      group: "Quick Actions"
    },
    
    // Legal Pages
    {
      id: "privacy",
      label: "Privacy Policy",
      description: "View privacy policy",
      icon: Shield,
      action: () => {
        router.push("/privacy");
        setOpen(false);
      },
      keywords: ["privacy", "policy", "legal"],
      group: "Legal"
    },
    {
      id: "terms",
      label: "Terms of Service", 
      description: "View terms of service",
      icon: FileText,
      action: () => {
        router.push("/terms");
        setOpen(false);
      },
      keywords: ["terms", "service", "legal"],
      group: "Legal"
    },
  ], [router]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        className="border-border"
      />
      <CommandList className="max-h-[300px]">
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* Group commands by category */}
        {["Navigation", "Quick Actions", "Legal"].map((group) => {
          const groupCommands = commands.filter((cmd) => cmd.group === group);
          if (groupCommands.length === 0) return null;
          
          return (
            <CommandGroup key={group} heading={group}>
              {groupCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={command.action}
                  className="cursor-pointer"
                >
                  <command.icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{command.label}</span>
                    {command.description && (
                      <span className="text-xs text-text/60">
                        {command.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
}
