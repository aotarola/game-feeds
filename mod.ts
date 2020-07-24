import runGFN from "./adaptors/gfn/mod.ts";

async function main() {
  const json = await runGFN("23rd July 2020");
  return json;
}

console.log(await main());
