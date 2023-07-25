import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "WoW Classic Character Generator" },
    { name: "description", content: "A character generate for World of Warcraft Classic to help create hardcore characters." },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>WoW Classic Character Generator</h1>
      <a
        target="_blank"
        href="https://wowclassic.blizzard.com/en-us/"
        rel="noreferrer"
      >
        World of Warcraft Classic
      </a>
    </div>
  );
}
