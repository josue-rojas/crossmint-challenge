import { MegaverseService } from "./service/megaverseService";
import { phase1 } from "./phases/phase1";
import { phase2 } from "./phases/phase2";

const megaVerseService = new MegaverseService();


async function main() {
  console.log('starting');
  // await phase1(megaVerseService, false);
  await phase2(megaVerseService);



}

main().then(() => {
  console.log('done');
}).catch(e => {
  console.error(e)
})
