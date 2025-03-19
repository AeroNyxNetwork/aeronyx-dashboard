export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-center text-foreground-muted text-sm mt-12 py-5 border-t border-border">
      <p>© {currentYear} AeroNyx. All rights reserved.</p>
    </footer>
  );
}
