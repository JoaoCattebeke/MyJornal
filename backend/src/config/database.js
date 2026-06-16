import mongoose from 'mongoose';
export const connectDatabase = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI não definida');
    }
    mongoose.connection.on('connected', () => {
        console.log(' MongoDB conectado');
    });
    mongoose.connection.on('error', (err) => {
        console.error('Erro MongoDB:', err.message);
    });
    await mongoose.connect(uri, {
        dbName: process.env.DB_NAME || 'minha-api',
    });
};