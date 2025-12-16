/**
 * EXAMPLE: Note types - DELETE when building your own features
 */

import type { listNotes } from './list.ts';

export type Note = Awaited<ReturnType<typeof listNotes>>[number];
