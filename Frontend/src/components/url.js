import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { log as logger } from '../utils/logger';

export default function URLShortener({ onShorten }) {
  const [urls, setUrls] = useState([
    { longUrl: '', validity: '', shortcode: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAdd = () => {
    setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
  };

  const handleRemove = (index) => {
    if (urls.length === 1) return;
    const updated = [...urls];
    updated.splice(index, 1);
    setUrls(updated);
  };

  const handleShorten = () => {
    const results = urls.map(({ longUrl, validity, shortcode }) => {
      if (!longUrl) return { error: 'Empty URL' };
      const hash = shortcode || Math.random().toString(36).substring(2, 8);
      const shortURL = `${window.location.origin}/${hash}`;
      const expiry = validity ? new Date().getTime() + parseInt(validity) * 60000 : null;
      const entry = { shortURL, longUrl, expiry };
      localStorage.setItem(hash, JSON.stringify(entry));
      logger(`Shortened: ${longUrl} to ${shortURL}`);
      return entry;
    });
    onShorten(results.filter(r => !r.error));
    setUrls([{ longUrl: '', validity: '', shortcode: '' }]);
  };

  return (
    <Card sx={{ p: 3, my: 4, borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🔗 URL Shortener
        </Typography>

        {urls.map((u, i) => (
          <Box key={i} display="flex" gap={2} alignItems="center" my={1}>
            <TextField
              label="Long URL"
              fullWidth
              value={u.longUrl}
              onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
            />
            <TextField
              label="Expiry (min)"
              type="number"
              value={u.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
              sx={{ width: 120 }}
            />
            <TextField
              label="Custom Code"
              value={u.shortcode}
              onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              sx={{ width: 140 }}
            />
            <IconButton onClick={() => handleRemove(i)} color="error">
              <RemoveCircle />
            </IconButton>
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleAdd} variant="outlined" startIcon={<AddCircle />}>Add</Button>
          <Button onClick={handleShorten} variant="contained" color="primary">Shorten</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
