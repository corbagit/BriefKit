import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'briefkit-dev-secret';

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name, tier: user.subscription_tier }, SECRET, { expiresIn: '7d' });
}
