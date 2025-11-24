import bcrypt from 'bcrypt';

const SALT = process.env.SALTRNDS || 16;

export function hashPassword(password) {
    return bcrypt.hash(password, 16);
}

export function verifyHash(password, stored) {
    return bcrypt.compare(password, stored);
}