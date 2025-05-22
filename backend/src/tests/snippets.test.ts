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
  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.disconnect();
});


describe('POST /api/snippets', () => {
  it('should create a snippet and return id, text, and summary', async () => {
    const res = await request(app)
      .post('/api/snippets')
      .send({ text: 'Node.js is a powerful platform.' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toBe('Node.js is a powerful platform.');
    expect(res.body.summary).toBe('mocked summary');
  });

  it('should return 400 if text is missing', async () => {
    const res = await request(app).post('/api/snippets').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Text must be a non-empty string');
  });
});

describe('GET /api/snippets/:id', () => {
  it('should return a snippet by ID', async () => {
    const postRes = await request(app)
      .post('/api/snippets')
      .send({ text: 'Test GET snippet' });

    const id = postRes.body.id;
    const getRes = await request(app).get(`/api/snippets/${id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(id);
    expect(getRes.body.text).toBe('Test GET snippet');
    expect(getRes.body.summary).toBe('mocked summary');
  });

  it('should return 404 if snippet not found', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const res = await request(app).get(`/api/snippets/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Snippet not found');
  });

  it('should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/api/snippets/invalid-id');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid ID format');
  });
});

describe('GET /api/snippets', () => {
  it('should return a paginated list of snippets', async () => {
    await request(app).post('/api/snippets').send({ text: 'Snippet A' });
    await request(app).post('/api/snippets').send({ text: 'Snippet B' });

    const res = await request(app).get('/api/snippets?page=1&limit=2');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('data');
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});