import { Router } from 'express';
const router = Router();

// GET    api/posts
// Test   route
// access Public
router.get('/', (req, res) => res.send('Post route'));
export default router;