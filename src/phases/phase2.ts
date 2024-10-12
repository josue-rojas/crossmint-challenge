import { bufferTime } from "../constants/bufferTime";
import { COMETH_DIRECTIONS, ComethDirections, MegaverseService, SOLOON_COLORS, SoloonColors } from "../service/megaverseService";
import { sleep } from "../utils/sleep";

const SOLOONS = SOLOON_COLORS.map(c => c.toUpperCase() + '_SOLOON');
const COMETH = COMETH_DIRECTIONS.map(d => d.toUpperCase() + '_COMETH')
const POLYONETS = ['POLYANET'];
const SPACE = ['SPACE'];

// TODO: buffer time should probably be more random so if it's not an official api. dont want to look suspicious. 

export async function phase2(megaVerseService: MegaverseService) {
  let sleepOffset = 0;
  const mapData = await megaVerseService.getMap();
  const goal = mapData.goal;

  for (let i = 0; i < goal.length; i++) {
    const currRow = goal[i];

    for (let j = 0; j < currRow.length; j++) {
      const currentValue = currRow[j];

      // we can probably remove this if is space because we would start with an empty grid.
      if (SPACE.includes(currentValue)) {
        // i wonder if the delete looks for a specific type of thing to delete. like if i use delete cometh on a polynet would it delete? ..... 
        await sleep(sleepOffset);
        await megaVerseService.deletePolyanets(i, j);
      } else if (SOLOONS.includes(currentValue)) {
        const [color] = currentValue.toLowerCase().split('_');
        await megaVerseService.postSoloon(i, j, color as SoloonColors);
      } else if (COMETH.includes(currentValue)) {
        const [direction] = currentValue.toLowerCase().split('_');
        await megaVerseService.postCometh(i, j, direction as ComethDirections);
      } else if (POLYONETS.includes(currentValue)) {
        await megaVerseService.postPolyanets(i, j);
      }

        console.log({ currentValue, i, j, sleepOffset })
        await sleep(sleepOffset);
        sleepOffset += bufferTime;
    }
  }
}
