import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false); // Track if the sidebar is open or closed
  const navigate = useNavigate();

  const items = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Students', path: '/students' },
    { label: 'Drives', path: '/drives' },
    { label: 'Reports', path: '/reports' },
  ];

  const toggleSidebar = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle the open state
  };

  return (
    <div>
      {/* Button to toggle sidebar (open/close) */}
      <button onClick={toggleSidebar} style={{ margin: '10px', padding: '10px' }}>
        ☰ {/* Simple hamburger icon */}
      </button>

      {/* The Drawer that is controlled by the 'open' state */}
      <Drawer variant="temporary" anchor="left" open={open} onClose={toggleSidebar}>
        <List>
          {items.map((item) => (
            <ListItem button key={item.path} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
