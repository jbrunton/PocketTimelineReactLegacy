import { Timeline } from './models'

export async function getTimelines(): Promise<Array<Timeline>> {
  const response = await fetch(
    'http://10.0.2.2:3000/timelines.json'
  );
  const json = await response.json();
  return json;
}

export async function getTimeline(id: string): Promise<Timeline> {
  const response = await fetch(
    `http://10.0.2.2:3000/timelines/${id}.json`
  );
  const json = await response.json();
  return json;
}
