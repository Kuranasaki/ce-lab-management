import { t, Static } from 'elysia';
import { PricingSchema, TagsSchema } from './pricing';

export const ExperimentItemSchema = t.Object({
  id: t.String(),
  name: t.String(),
  tags: TagsSchema,
  pricing: t.Array(PricingSchema),
  description: t.String(),
});

export type TExperimentItem = Static<typeof ExperimentItemSchema>;

export enum ExperimentStatus {
  PENDING = 'AWAITING',
  ASSIGNED = 'PROF_ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAIT_FOR_RESULT_APPROVAL = 'WAIT_FOR_RESULT_APPROVAL',
  DONE = 'DONE',
}

export const ExperimentStatusSchema = t.Enum(ExperimentStatus);

export const ExperimentOrderSchema = t.Object({
  id: t.String(), // Experiment ID
  reservationID: t.String(), // Reservation ID
  testItemID: t.String(), // Pointer to testItem in reservation
  testName: t.String(), // Test Name e.g. Tensile test of prestressed wire and presstressed strand: wire ø 7 mm
  testAmount: t.Number(), // Test Amount
  testDetails: t.Nullable(t.String()), // Test Details Added by customer
  testNote: t.Nullable(t.String()), // Test Note Added by customer
  assignedProfessorID: t.Nullable(t.String()),
  assignedProfessorName: t.Nullable(t.String()),
  assignedAt: t.Date(),
  testFormURL: t.Nullable(t.String()),
  markedAsDone: t.Boolean(),
  markedAsDoneAt: t.Nullable(t.Date()),
  certificateURL: t.Nullable(t.String()),
  certificateUploadedAt: t.Nullable(t.Date()),
  status: ExperimentStatusSchema
});

export type TExperimentOrder = Static<typeof ExperimentOrderSchema>;