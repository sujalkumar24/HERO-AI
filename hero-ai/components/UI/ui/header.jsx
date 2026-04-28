'use client';

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/UI/dropdown-menu";
import { AuthButtons, SignedInLink } from "@/components/UI/auth-buttons";

const Header = () =>  {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-30
     supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/HEROAI.jpg"
            alt="HEROAI Logo"
            width={150}
            height={50}
            className="h-12 py-1 w-auto object-contain" />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedInLink
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:block">Industry Insights</span>
          </SignedInLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              <Star className="h-4 w-4" />
              <span className="hidden md:block">Growth Tools</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/resume-builder" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Resume builder</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/cover-letter" className="flex items-center gap-2">
                  <PenBox className="h-4 w-4" />
                  <span>Cover letter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/interview-preparation" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Interview Preparation</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/subscription" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Subscription</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AuthButtons />
        </div>
    </nav>
      
  </header>
);
}

export default Header;

