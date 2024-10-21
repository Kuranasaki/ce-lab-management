import { t } from 'elysia'

export const OrgDataSchema = t.Object({
  orgName: t.String(),
  orgProjectName: t.String(),
  orgAddress: t.String(),
  orgPhone: t.String(),
  orgEmail: t.String(),
  orgFax: t.String(),
})

export const TestItemSchema = t.Object({
  testID: t.String(),
  testAmount: t.Number(),
  testDetails: t.String(),
  testNote: t.String(),
})

export const TestListSchema = t.Object({
  testType: t.String(),
  testItems: t.Array(TestItemSchema),
})

export const RequestReservationSchema = t.Object({
  orgData: OrgDataSchema,
  testList: TestListSchema,
})

// src/models/RequestReservation.ts
import { Schema, model } from 'mongoose'

const MongoOrgDataSchema = new Schema({
  orgName: String,
  orgProjectName: String,
  orgAddress: String,
  orgPhone: String,
  orgEmail: String,
  orgFax: String,
})

const MongoTestItemSchema = new Schema({
  testID: String,
  testAmount: Number,
  testDetails: String,
  testNote: String,
})

const MongoTestListSchema = new Schema({
  testType: String,
  testItems: [MongoTestItemSchema],
})

const ReservationSchema = new Schema({
  orgData: MongoOrgDataSchema,
  testList: MongoTestListSchema,
})

export const RequestReservationModel = model('RequestReservation', MongoRequestReservationSchema)
