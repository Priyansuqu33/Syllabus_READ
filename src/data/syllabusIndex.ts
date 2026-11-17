import { flattenUnits } from '../utils/syllabusHelpers';
import { SYLLABUS_UNITS_PART_1 } from './syllabusPart1';
import { SYLLABUS_UNITS_PART_2 } from './syllabusPart2';
import type { FlatTopic, Unit } from '../types/syllabus';

export const SYLLABUS_UNITS: Unit[] = [
  ...SYLLABUS_UNITS_PART_1,
  ...SYLLABUS_UNITS_PART_2,
];

export const ALL_TOPICS_FLAT: FlatTopic[] = flattenUnits(SYLLABUS_UNITS);
