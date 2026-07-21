export function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.40682 9.43039C6.20741 9.70956 5.7925 9.70956 5.59309 9.43038L1.56472 3.79062C1.32834 3.45968 1.5649 3 1.97159 3L10.0284 3C10.4351 3 10.6716 3.45969 10.4353 3.79062L6.40682 9.43039Z" fill="#4E2FD2" />
    </svg>

  );
}

export function ChevronUp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z" fill="#4E2FD2" />
    </svg>
  );
}
