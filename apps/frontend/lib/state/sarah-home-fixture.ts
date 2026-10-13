import { computeSarahRead, SARAH_EXAMPLE_INPUTS } from '../engine/sarah-read';

/** §374: one labelled fictional runtime observation, selected from the Engine's exported U3 inputs. */
export const SARAH_HOME_FIXTURE_INPUT = SARAH_EXAMPLE_INPUTS.find(example => example.name === 'U3')!.input;

/** Computed once; Home presents the Engine read verbatim. */
export const SARAH_HOME_READ = computeSarahRead(SARAH_HOME_FIXTURE_INPUT);
