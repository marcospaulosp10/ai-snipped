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
describe('GET /api/snippets/:id', () => {
  it('should return a snippet by ID', async () => {
    const postResponse = await request(app)
      .post('/api/snippets')
      .send({ text: 'Test GET snippet' });

    const snippetId = postResponse.body.id;

    const getResponse = await request(app).get(`/api/snippets/${snippetId}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(snippetId);
    expect(getResponse.body.text).toBe('Test GET snippet');
    expect(getResponse.body.summary).toBe('mocked summary');
  });

  it('should return 404 if snippet does not exist', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const response = await request(app).get(`/api/snippets/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Snippet not found');
  });

  it('should return 400 if ID is invalid', async () => {
    const response = await request(app).get('/api/snippets/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid ID format');
  });
});