import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import URLShortener from './components/url';
import StatisticsPage from './components/statistics';
import RedirectHandler from './components/redirect';
import { AppBar, Toolbar, Typography, Button, Box, List, ListItem, Divider } from '@mui/material';
import { Log } from './LoggingMiddleware/log'; 
import {useEffect} from 'react';

function App() {
  useEffect(() => {
    Log('frontend', 'info', 'app', 'App started');
  }, []);
  const [shortened, setShortened] = useState([]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <Box p={2}>
              <URLShortener onShorten={setShortened} />
              {shortened.length > 0 && (
                <Box mt={4}>
                  <Typography variant="h6">Shortened URLs</Typography>
                  <List>
                    {shortened.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <ListItem>
                          <div>
                            <Typography><strong>Short:</strong> <a href={item.shortURL} target="_blank" rel="noreferrer">{item.shortURL}</a></Typography>
                            <Typography><strong>Long:</strong> {item.longUrl}</Typography>
                          </div>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          }
        />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:code" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
