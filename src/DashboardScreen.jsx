import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Card, CardContent } from '@mui/material';

const API_URL = 'https://proyecto-confianza-api.onrender.com/api';

function DashboardScreen( ) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }
                const userResponse = await fetch(`${API_URL}/users/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!userResponse.ok) throw new Error('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                const userData = await userResponse.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Bienvenido, miembro de {user?.generation}ª generación</Typography>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6">Tu Estado</Typography>
                    <Typography>Nivel de Confianza: {user?.trust_level}</Typography>
                    <Typography>Estado: {user?.status}</Typography>
                </CardContent>
            </Card>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" size="large">Publicar un Objeto</Button>
                <Button variant="outlined" size="large" disabled={user?.trust_level !== 'MIEMBRO_VALIDADO'}>
                    Buscar y Pedir un Objeto
                </Button>
            </Box>
        </Box>
    );
}

export default DashboardScreen;
