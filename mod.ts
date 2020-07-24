import runGFN from "./adaptors/gfn/mod.ts";

async function main() {
  const json = await runGFN();
  return json;
}

console.log(await main());
