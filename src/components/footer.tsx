export default function Footer() {
  return (
    <footer class="flex items-center justify-between py-4">
      <div class="flex items-center gap-8">
        <p translate="no" class="text-sm">
          &copy; {new Date().getFullYear()} htsx.
        </p>
        <a href="/llms.txt" class="text-sm">
          llms.txt
        </a>
      </div>
    </footer>
  );
}
