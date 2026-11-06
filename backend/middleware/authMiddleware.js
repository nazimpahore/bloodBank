import jwt from 'jsonwebtoken';

/**
 * Authentication and Role-Based Access Control Middleware
 * @param {string[]} roles Allowed roles, e.g. ['hospital'] or ['receiver'] or empty for any authenticated user
 */
export const verifyToken = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No authentication token provided.' });
      }

      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('FATAL: JWT_SECRET environment variable is missing.');
        return res.status(500).json({ error: 'Server authentication configuration error.' });
      }

      const decoded = jwt.verify(token, secret);
      req.user = decoded; // { id, role, email }

      // Check role permissions if specified
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource.' });
      }

      next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired. Please log in again.' });
      }
      return res.status(401).json({ error: 'Invalid authentication token.' });
    }
  };
};

