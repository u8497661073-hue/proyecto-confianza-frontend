import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';

const API_URL = 'https://proyecto-confianza-api.onrender.com/api';

function RegisterScreen( ) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invitationCode, setInvitationCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`${API_URL}/users/register-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, invitationCode }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Algo salió mal.');
            setSuccess(data.message);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>Unirse a la Comunidad</Typography>
            <TextField label="Número de Teléfono" variant="outlined" fullWidth required margin="normal" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={loading || !!success} />
            <TextField label="Código de Invitación" variant="outlined" fullWidth required margin="normal" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} disabled={loading || !!success} />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} disabled={loading || !!success}>
                {loading ? <CircularProgress size={24} /> : 'Solicitar Unirse'}
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
        </Box>
    );
}

export default RegisterScreen;
