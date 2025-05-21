import request from 'supertest';
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import app from '../app';

vi.mock('../services/aiService', () => ({
  generateSummary: vi.fn(() => Promise.resolve('mocked summary')),
}));

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/snippet-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('POST /api/snippets', () => {
  it('should create a snippet and return id, text, and summary', async () => {
    const response = await request(app)
      .post('/api/snippets')
      .send({ text: 'Node.js is a powerful platform.' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.text).toBe('Node.js is a powerful platform.');
    expect(response.body.summary).toBe('mocked summary');
  });

  it('should return 400 if text is missing', async () => {
    const response = await request(app).post('/api/snippets').send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Text is required');
  });
});