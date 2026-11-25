export function useSearchState() {
  const open = useState('search-open', () => false)
  // Set after mount so the server and first client render agree.
  const shortcut = useState('search-shortcut', () => 'Ctrl K')
  return { open, shortcut }
}
