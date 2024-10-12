import { MegaverseService } from "../service/megaverseService";
import { sleep } from "../utils/sleep";
import { bufferTime } from "../constants/bufferTime";

// function to solve phase 1. also has the option to clear the board. 
// TODO; should probaly use the map to not do calculations of where the x is at
export async function phase1(megaVerseService: MegaverseService, clear?: boolean) {
  const columns = 11;
  const rows = 11;
  const padding = clear ? 0 : 2;
  const fetches = [];

  let sleepOffset = 0;

  for (let c = 0 + padding; c < columns-padding; c++) {
    for (let r = 0 + padding; r < rows - padding; r++) {

      if (clear) {
        fetches.push((async () => {
          console.log('----', sleepOffset);
          await sleep(sleepOffset);
          console.log('running', c, r);
          await megaVerseService.deletePolyanets(c, r);
        })());
        sleepOffset += bufferTime;
      } else if (c === r || r === columns - 1 - c || c === rows - 1 - r) {
        fetches.push((async () => {
          console.log('----', sleepOffset)
          await sleep(sleepOffset);
          console.log('running', c, r)
          await megaVerseService.postPolyanets(c, r);
        })());
        sleepOffset += bufferTime;
      }
    }
  }

  await Promise.all(fetches);
}
