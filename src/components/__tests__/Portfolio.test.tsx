import { render, screen, fireEvent } from '@testing-library/react';
import GTABackground from '../GTABackground';
import Experience from '../../sections/Experience';
import ProfileModal from '../ProfileModal';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

function TestHUDTrigger() {
  const { setProfileOpen } = useTheme();
  return <button onClick={() => setProfileOpen(true)}>Open Profile</button>;
}

describe('GTA VI Vice Ocean Portfolio', () => {
  it('renders GTABackground with default wallpaper', () => {
    render(
      <ThemeProvider>
        <GTABackground />
      </ThemeProvider>
    );
    const bgImage = screen.getByAltText(/GTA VI Vice City Skyline & Ocean/i);
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveAttribute('src', '/Grand Theft Auto 6.jpg');
  });

  it('renders Experience section with correct spelling', () => {
    render(<Experience />);
    expect(screen.getByText(/Professional/i)).toBeInTheDocument();
    expect(screen.getByText(/Bizmo Technologies/i)).toBeInTheDocument();
    expect(screen.getByText(/Assisted in the architectural development/i)).toBeInTheDocument();
  });

  it('renders ProfileModal with background overlay options and wallpapers', () => {
    render(
      <ThemeProvider>
        <TestHUDTrigger />
        <ProfileModal />
      </ThemeProvider>
    );

    // Open modal
    fireEvent.click(screen.getByText('Open Profile'));

    // Check for Blue Overlay Layer Removal controls
    expect(screen.getByText(/BACKGROUND BLUE OVERLAY LAYER/i)).toBeInTheDocument();
    expect(screen.getByText(/OFF \(Clear Image\)/i)).toBeInTheDocument();

    // Check for Wallpaper gallery
    expect(screen.getByText(/BACKGROUND WALLPAPER \(INTERNET & LOCAL\)/i)).toBeInTheDocument();
    expect(screen.getByText(/ENTER CUSTOM IMAGE URL FROM THE INTERNET/i)).toBeInTheDocument();
  });
});
