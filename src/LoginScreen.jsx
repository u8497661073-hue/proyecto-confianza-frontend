import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

const API_URL = 'https://proyecto-confianza-api.onrender.com/api';

function LoginScreen( ) {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequestCode = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/request-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            });
            if (!response.ok) throw new Error('No se pudo enviar el código. ¿Estás seguro de que tu número es correcto?');
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/verify-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, verificationCode }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Código incorrecto.');
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            {step === 1 ? (
                <Box component="form" onSubmit={handleRequestCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" align="center">Iniciar Sesión</Typography>
                    <TextField label="Número de Teléfono" variant="outlined" fullWidth required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={loading} />
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Enviar Código'}
                    </Button>
                </Box>
            ) : (
                <Box component="form" onSubmit={handleVerifyCode} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" align="center">Verificar Código</Typography>
                    <TextField label="Código de Verificación" variant="outlined" fullWidth required value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} disabled={loading} />
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Verificar y Entrar'}
                    </Button>
                </Box>
            )}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
    );
}

export default LoginScreen;
