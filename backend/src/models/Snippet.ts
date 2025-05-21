import { Schema, model, Document } from 'mongoose';

export interface ISnippet extends Document {
  text: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

const snippetSchema = new Schema<ISnippet>(
  {
    text: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

export const Snippet = model<ISnippet>('Snippet', snippetSchema);