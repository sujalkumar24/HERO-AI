'use client';

import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";

export const AuthButtons = () => {
  return (
    <>
      <SignedOut>
        <SignInButton
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              card: "bg-gray-800 border-gray-700",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
            }
          }}
        >
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10",
              userButtonPopoverCard: "shadow-xl bg-gray-800 border-gray-700",
              userPreviewMainIdentifier: "font-semibold text-white",
              userPreviewSecondaryIdentifier: "text-gray-300",
            }
          }}
          afterSignOutUrl="/"
        />
      </SignedIn>
    </>
  );
};

export const SignedInLink = ({ href, children, className }) => {
  return (
    <SignedIn>
      <a href={href} className={className}>
        {children}
      </a>
    </SignedIn>
  );
};
