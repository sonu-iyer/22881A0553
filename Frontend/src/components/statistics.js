import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

const StatisticsPage = () => {
  const allData = Object.keys(localStorage)
    .filter((key) => !key.startsWith('log-'))
    .map((key) => JSON.parse(localStorage.getItem(key)));

  return (
    <Box p={2}>
      <Typography variant="h5">URL Statistics</Typography>
      <List>
        {allData.map((item, idx) => (
          <React.Fragment key={idx}>
            <ListItem>
              <div>
                <Typography variant="body1"><strong>Short:</strong> {item.shortURL}</Typography>
                <Typography variant="body2"><strong>Long:</strong> {item.longUrl}</Typography>
                <Typography variant="body2">Created: {item.createdAt}</Typography>
                <Typography variant="body2">Expires: {item.expiryDate}</Typography>
                <Typography variant="body2">Clicks: {item.clicks.length}</Typography>
                {item.clicks.map((click, i) => (
                  <Typography key={i} variant="caption">Click {i + 1}: {click.time}, {click.referrer || 'N/A'}, {click.location || 'Unknown'}</Typography>
                ))}
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default StatisticsPage;