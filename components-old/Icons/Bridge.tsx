export default function Bridge() {
  return (
    <svg
      aria-labelledby="conf-city-title"
      fill="none"
      role="img"
      viewBox="0 0 620 704"
      width="620"
      height="704"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="conf-city-title">Line drawing of the Golden Gate Bridge in San Francisco.</title>
      <defs>
        <pattern id="Pattern" x="0" y="0" width=".05" height="1">
          <rect x="0" y="0" width="1" height="704" fill="gray" />
        </pattern>
      </defs>

      <rect fill="url(#Pattern)" width="620" height="704" />
    </svg>
  );
}
