export class Message {
  message: string[] = [];
  sectionIntro: string[] = [];
  sectionDownstream: string[] = [];

  constructor() {
    this.sectionIntro.push('## Stable Backport Notice\n');
    this.sectionIntro.push(`
> [!NOTE]
> Some commits from this PR were backported to the downstream stable repository.\n`);
  }
}
