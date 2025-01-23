import { Dropdown, MenuButton, Menu, MenuItem } from '@mui/joy';
import { Gauge } from 'lucide-react';
import { memo } from 'react';

interface SpeedMenuProps {
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

const SPEED_OPTIONS = [0.25, 0.5, 0.75, 1] as const;

const SpeedMenu = memo(({ playbackSpeed, onSpeedChange }: SpeedMenuProps) => {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        startDecorator={<Gauge size={18} />}
        sx={{ 
          color: '#fff',
          minWidth: '100px',  // Fixed width for the button
          justifyContent: 'flex-center'
        }}
      >
        {playbackSpeed}x
      </MenuButton>
      <Menu
        placement="top-end"
        sx={{
          bgcolor: 'background.body',
          borderRadius: 'sm',
          boxShadow: 'sm',
          minWidth: 100,
        }}
      >
        {SPEED_OPTIONS.map((speed) => (
          <MenuItem
            key={speed}
            selected={playbackSpeed === speed}
            onClick={() => onSpeedChange(speed)}
          >
            {speed}x
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
});

SpeedMenu.displayName = 'SpeedMenu';
export default SpeedMenu; 