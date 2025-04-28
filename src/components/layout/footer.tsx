export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        © {new Date().getFullYear()} Ahiyas high school. All rights reserved.
      </div>
    </footer>
  );
}
